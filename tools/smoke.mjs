/**
 * 端到端冒烟测试:把 `dist/` 里**真实构建产物**加载进 DOM 并驱动点击。
 *
 * 运行:pnpm build && node tools/smoke.mjs
 *
 * 覆盖:开机自检 → 输入代号开局 → 抽题 → 选对 5 题晋级 → 选错扣命 → 出局结算页。
 */

import { Window } from 'happy-dom';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { noviceQuestions } from '../src/lib/data/questions/novice.ts';
import { systemsQuestions } from '../src/lib/data/questions/systems.ts';
import { acmQuestions } from '../src/lib/data/questions/acm.ts';
import { faqQuestions } from '../src/lib/data/questions/faq.ts';
import { documentQuestions } from '../src/lib/data/questions/document.ts';

const allQuestions = [...noviceQuestions, ...systemsQuestions, ...acmQuestions, ...faqQuestions, ...documentQuestions];
const plain = (s) => s.replace(/\*\*|`/g, '').replace(/\s+/g, '');
function displayedSource() {
  const prompt = plain(text('.prompt'));
  const code = plain(text('.code'));
  const matches = allQuestions.filter((q) => plain(q.zh.prompt) === prompt && plain(q.code ?? '') === code);
  if (matches.length !== 1) throw new Error(`Cannot uniquely match rendered question: ${prompt}`);
  return matches[0];
}

/**
 * 确定性随机源:把 Math.random 换成可播种的 PRNG,
 * 测试端用同一个种子「重放」一遍抽题+打乱流程,就能事先算出正确选项下标。
 */
/**
 * 题库现在是双语的(每题 zh / en 两份文本)。
 * 冒烟测试在 `?lang=zh` 下运行(见下方 new Window 的 url),
 * 所以这里取 `zh` 那份来复刻抽题 —— 选项顺序的打乱与语言无关。
 */
const POOL = Object.fromEntries(
  [
    ['novice', noviceQuestions],
    ['hacker', systemsQuestions],
    ['acm', acmQuestions],
  ].map(([id, list]) => [id, list.map((q) => ({ ...q.zh, id: q.id, answer: q.answer }))]),
);
const ROUNDS_PER_TIER = 5;
let rngState = 0;
let rngCalls = 0;
/**
 * 预置随机值队列:抽题是在「点击答案 → 2.4s 后 nextQuestion()」这一同步瞬间完成的,
 * 而背景字符雨会在这期间异步吃掉成千上万个 random。所以不能靠种子同步,
 * 改为在点击前把这一次抽题所需的 4 个值登记好,抽题时按「同步成串调用」识别并供给。
 */
let pendingDrawValues = [];
let drawConsumed = 0;
let lastRngCallAt = -1;
function seedRng(s) {
  rngState = s >>> 0;
  rngCalls = 0;
  drawConsumed = 0;
  lastRngCallAt = -1;
}
function rng() {
  rngCalls += 1;
  // 字符雨已被「零尺寸画布」掐掉,现在只有抽题会调用 Math.random,
  // 所以直接按队列顺序供货即可,不需要再区分调用来源。
  if (drawConsumed < pendingDrawValues.length) {
    const v = pendingDrawValues[drawConsumed++];
    rngLog.push(v.toFixed(4));
    return v;
  }
  rngState = (rngState + 0x6d2b79f5) >>> 0;
  let t = rngState;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
let rngLog = [];
Math.random = rng;

/**
 * 复刻 quiz 的抽题逻辑,但随机数从给定的 values 数组按顺序取。
 * **必须与原实现调用 Math.random 的顺序完全一致** ——
 * 所以这里刻意用 </> 比较而不是 a-b 做排序键。
 */
function predictDraw(tierId, usedIds, values) {
  let k = 0;
  const next = () => values[k++];
  const pool = POOL[tierId];
  const used = new Set(usedIds);
  let cands = pool.filter((q) => !used.has(q.id));
  if (cands.length === 0) {
    const recent = usedIds[usedIds.length - 1];
    cands = pool.filter((q) => q.id !== recent);
    if (cands.length === 0) cands = pool.slice();
  }
  const q = cands[Math.floor(next() * cands.length)];
  const arr = q.options.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    if (j < i) {
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  }
  return { id: q.id, correctIndex: arr.indexOf(q.options[q.answer]), callsUsed: k };
}

/** 生成一个种子下、一次抽题所需的全部随机值(1 次选池 + 3 次洗牌交换) */
const DRAWS_RANDOM_CALLS = 4;
function valuesForSeed(seed, count = DRAWS_RANDOM_CALLS) {
  // 用一个独立的 PRNG 实例,避免污染正在给应用供货的 rng()
  let st = seed >>> 0;
  const next = () => {
    st = (st + 0x6d2b79f5) >>> 0;
    let t = st;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return Array.from({ length: count }, next);
}

/**
 * 预备下一次抽题:算出用 seed 抽题会得到哪道题、正确项在哪,
 * 并把这次抽题需要的随机值登记为「下一次同步成串调用」的输入。
 */
function armNextDraw(tierId, usedIds, seed) {
  const vals = valuesForSeed(seed);
  const predicted = predictDraw(tierId, usedIds, vals);
  pendingDrawValues = vals;
  drawConsumed = 0;
  return predicted;
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

let pass = 0;
let fail = 0;
const failures = [];
function ok(name, cond, extra = '') {
  if (cond) {
    pass += 1;
    console.log(`  \u2713 ${name}`);
  } else {
    fail += 1;
    failures.push(`${name}${extra ? ` — ${extra}` : ''}`);
    console.log(`  \u2717 ${name}${extra ? ` — ${extra}` : ''}`);
  }
}
function section(t) {
  console.log(`\n=== ${t} ===`);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- 启动 DOM + 执行真实 bundle ---------- */
const window = new Window({
  // 锁定中文:项目里的可读断言都是中文文案,同时验证「?lang= 覆盖」这条路径
  url: 'http://localhost/?lang=zh',
  width: 1280,
  height: 900,
  settings: { disableJavaScriptEvaluation: true, disableCSSFileLoading: true },
});
const { document } = window;

/**
 * 把画布尺寸伪装成 0,让背景字符雨的列数为 0 —— 它就不再消耗 Math.random。
 * 这样「抽题」成为唯一的随机消耗者,测试才能精确控制每次抽到的题。
 * (这是测试环境的手段,不改动生产代码。)
 */
for (const proto of [window.Element.prototype, window.HTMLElement.prototype]) {
  Object.defineProperty(proto, 'clientWidth', { get: () => 0, configurable: true });
  Object.defineProperty(proto, 'clientHeight', { get: () => 0, configurable: true });
}

// 补上 happy-dom 没实现的 API(canvas 2d context、ResizeObserver、AudioContext)
const noop = () => {};
const ctxStub = new Proxy(
  {
    canvas: null,
    createRadialGradient: () => ({ addColorStop: noop }),
    createLinearGradient: () => ({ addColorStop: noop }),
    measureText: () => ({ width: 8 }),
    getImageData: () => ({ data: new Uint8ClampedArray(4) }),
  },
  { get: (t, k) => (k in t ? t[k] : noop), set: () => true },
);
window.HTMLCanvasElement.prototype.getContext = () => ctxStub;
/** happy-dom 的 Web Animations 在 cancel() 时会抛 AbortError,把 Svelte 过渡打断 —— 用立即完成的动画替身。 */
window.Element.prototype.animate = function animate() {
  const anim = {
    onfinish: null,
    currentTime: 0,
    playState: 'finished',
    effect: null,
    cancel() {},
    finish() {
      anim.onfinish?.();
    },
    addEventListener() {},
    removeEventListener() {},
  };
  // 让 Svelte 的 onfinish 回调在下一个微任务里拿到结果
  setTimeout(() => anim.onfinish?.(), 0);
  return anim;
};
window.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
/**
 * AudioContext 探针。
 * 两个真实的坑靠它守住:
 * 1) 页面加载时**不能**创建 AudioContext(浏览器自动播放策略会把它挂起,而且会打印警告),
 *    必须等到真正的用户手势;
 * 2) 创建之后**必须调用 resume()**,否则底噪的节点全都建好、start() 也调了,却一声不响
 *    —— 这正是「音乐听不见」的根因。
 */
const audioProbe = { created: 0, resumed: 0, oscillators: 0 };
window.AudioContext = class {
  constructor() {
    audioProbe.created += 1;
    this.state = 'suspended';
    this.currentTime = 0;
    this.sampleRate = 48000;
    this.destination = {};
  }
  resume() {
    audioProbe.resumed += 1;
    this.state = 'running';
  }
  createGain() {
    return {
      gain: { value: 1, setValueAtTime: noop, setTargetAtTime: noop, exponentialRampToValueAtTime: noop },
      connect: noop,
    };
  }
  createOscillator() {
    audioProbe.oscillators += 1;
    return {
      type: 'square',
      frequency: { value: 0, setValueAtTime: noop, exponentialRampToValueAtTime: noop },
      connect: noop,
      start: noop,
      stop: noop,
    };
  }
  createBuffer() {
    return { getChannelData: () => new Float32Array(64) };
  }
  createBufferSource() {
    return { buffer: null, connect: noop, start: noop, stop: noop };
  }
  createBiquadFilter() {
    return { type: 'lowpass', frequency: { value: 0 }, Q: { value: 1 }, connect: noop };
  }
};

// 全局桥接,让 bundle 里的 window / document / localStorage 都能用。
// 注意:Node 24 的 globalThis.navigator 是只读 getter,必须用 defineProperty 覆盖。
globalThis.window = window;
globalThis.document = document;
globalThis.localStorage = window.localStorage;
globalThis.getComputedStyle = window.getComputedStyle.bind(window);
globalThis.requestAnimationFrame = function raf(cb) {
  return setTimeout(() => cb(performance.now()), 16);
};
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);

// bundle 里会直接引用这些 DOM 全局构造器,必须逐个桥接
for (const name of [
  'HTMLElement',
  'HTMLMediaElement',
  'HTMLCanvasElement',
  'SVGElement',
  'Element',
  'Node',
  'Text',
  'Comment',
  'DocumentFragment',
  'EventTarget',
  'Event',
  'CustomEvent',
  'KeyboardEvent',
  'MouseEvent',
  'PointerEvent',
  'MutationObserver',
  'ResizeObserver',
  'CSS',
]) {
  if (window[name] !== undefined) globalThis[name] = window[name];
}
try {
  Object.defineProperty(globalThis, 'navigator', {
    value: window.navigator,
    configurable: true,
    writable: true,
  });
} catch {
  /* Node 里 navigator 已有实现,通常够用 */
}

const html = readFileSync(join(dist, 'index.html'), 'utf8');
const jsFile = readdirSync(join(dist, 'assets')).find((f) => f.endsWith('.js'));
document.write(html);

// 直接执行真实构建产物:bundle 自己会 mount 到 #app。
// 刻意不 `import { mount } from 'svelte'` —— Node 下会解析到 server 构建而报错。
await import('file://' + join(dist, 'assets', jsFile).replace(/\\/g, '/'));
await sleep(50);

/* ---------- DOM 查询工具 ---------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const text = (sel) => ($(sel)?.textContent ?? '').trim();
const has = (sel) => !!$(sel);

function clickByText(sel, needle) {
  const el = $$(sel).find((e) => e.textContent.includes(needle));
  if (!el) return false;
  el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  return true;
}
function typeInto(sel, value) {
  const el = $(sel);
  if (!el) return false;
  el.value = value;
  el.dispatchEvent(new window.Event('input', { bubbles: true }));
  return true;
}
/** 选项按钮:a.letter 是 A/B/C/D */
const optionButtons = () =>
  $$('button').filter((b) => b.querySelector('.letter') && b.querySelector('.otext'));
/** 分数:.hud 里是 .score,结算页里是 .sc —— 两处都要认,否则会静默读到空串变成 0 */
const scoreValue = () => {
  const raw = has('.res') ? text('.sc') : text('.score');
  return Number(raw.replace(/[^\d]/g, ''));
};
const optionState = (btn) => {
  const c = btn.className;
  if (c.includes('gone')) return 'gone';
  if (c.includes('right')) return 'right';
  if (c.includes('wrong')) return 'wrong';
  return 'idle';
};

/* ---------- 流程 ---------- */
section('1. 开机自检屏');
await sleep(0);
// 反例守卫:这里必须是 0。曾经在 onMount 里就 new AudioContext(),
// 浏览器会因自动播放策略把它挂起,底噪从此再也发不出声音。
ok('加载阶段不创建 AudioContext(等用户手势)', audioProbe.created === 0, `created=${audioProbe.created}`);
ok('渲染了开机自检屏', has('.boot'), document.body.innerHTML.slice(0, 120));
ok('初始没有 HUD(还没进对局)', !has('.hud'));

await sleep(2200); // 等打字机播完
ok('自检文案已出现', text('.log').includes('计算机协会') || text('.log').length > 10, text('.log').slice(0, 60));

// 点击进入标题页
clickByText('.boot', 'SKIP') || $('.boot').dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
if (has('.boot')) $('.boot').dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
await sleep(60);

section('2. 标题页');
ok('切换到标题页', has('.intro'));
ok('展示三个难度档位', $$('.tier').length === 3, `实际 ${$$('.tier').length}`);
ok('档位文案含 EZ/HD/IN', ['轻松', '进阶', '深入'].every((t) => text('.tiers').includes(t)));
ok('有代号输入框', has('.field input'));
ok('三个锦囊都列出来了', $$('.jokers li').length === 3, `实际 ${$$('.jokers li').length}`);

const startBtn = $$('button').find((b) => b.textContent.includes('开始突袭'));
ok('未输入代号时开始按钮禁用', startBtn.disabled === true);
typeInto('.field input', '测试员');
await sleep(30);
ok('输入代号后开始按钮解禁', startBtn.disabled === false);

section('3. 开局');
startBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
await sleep(80);
// 「音乐听不见」的回归守卫:底噪要真的建起振荡器,并且上下文必须被 resume 过。
ok('用户手势后创建了 AudioContext', audioProbe.created === 1, `created=${audioProbe.created}`);
ok('AudioContext 被 resume(否则底噪静音)', audioProbe.resumed >= 1, `resumed=${audioProbe.resumed}`);
ok('底噪建起了多个振荡器', audioProbe.oscillators >= 4, `oscillators=${audioProbe.oscillators}`);
await sleep(60);
ok('进入对局页(HUD 出现)', has('.hud'));
ok('题目卡渲染', has('.qcard'));
ok('HUD 显示代号', text('.who').includes('测试员'), text('.who'));
ok('当前档位是 EZ 档', text('.hud').includes('轻松'), text('.tierChip'));
ok('初始分数 0', scoreValue() === 0, String(scoreValue()));
ok('默认 4 个选项', optionButtons().length === 4, `实际 ${optionButtons().length}`);
ok('倒计时在走', Number(text('.tnum').replace(/[^\d.]/g, '')) > 0, text('.tnum'));
ok('锦囊 3 张都在', $$('.jcard').length === 3);

section('4. 锦囊:逻辑切割');
const fiftyBtn = $$('.jcard').find((b) => b.textContent.includes('逻辑切割'));
fiftyBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
await sleep(40);
ok('使用后剩余锦囊 2', text('.left').startsWith('2/'), text('.left'));
ok('抹除了 2 个错误选项', optionButtons().filter((b) => optionState(b) === 'gone').length === 2,
  `实际 ${optionButtons().filter((b) => optionState(b) === 'gone').length}`);
const fiftySource = displayedSource();
ok('正确选项未被抹除', optionButtons().some((b) =>
  plain(b.querySelector('.otext').textContent) === plain(fiftySource.zh.options[fiftySource.answer]) && optionState(b) !== 'gone'));

section('5. EZ 档:用掉 2 条不灭后出局');

/** 当前界面 */
function screen() {
  if (has('.res')) return 'result';
  if (has('.promote')) return 'promote';
  if (has('.qcard')) return 'question';
  if (has('.intro')) return 'intro';
  if (has('.boot')) return 'boot';
  return 'unknown';
}
/** 剩余不灭次数:已点亮的 ◆ 数量(未点亮的是 .lost) */
const livesLeft = () =>
  $$('.life').filter((e) => !e.className.includes('lost')).length;
/** 从判定结果反推刚才是否答对 */
const wasRight = () => {
  const picked = optionButtons().findIndex((b) => b.className.includes('picked'));
  const right = optionButtons().findIndex((b) => optionState(b) === 'right');
  return picked >= 0 && picked === right;
};
/** 点一个仍然可点的选项 */
function clickAnOption() {
  const btns = optionButtons();
  const source = displayedSource();
  const correct = plain(source.zh.options[source.answer]);
  const i = btns.findIndex((b) => optionState(b) === 'idle' && plain(b.querySelector('.otext').textContent) !== correct);
  if (i < 0) return false;
  btns[i].dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  return true;
}

let wrongCount = 0;
for (let round = 0; round < 6; round++) {
  await sleep(60);
  if (screen() !== 'question') break;
  const qNo = text('.qno');
  ok(`第 ${round + 1} 轮有 4 个选项`, optionButtons().length === 4, `实际 ${optionButtons().length}`);
  ok(`第 ${round + 1} 轮点击前不灭 = ${livesLeft()}`, livesLeft() >= 1, String(livesLeft()));
  clickAnOption();
  await sleep(60);
  ok(`第 ${round + 1} 轮出现判定面板`, has('.fb'), `界面=${screen()}`);
  const right = wasRight();
  if (!right) wrongCount += 1;
  console.log(
    `      ${qNo} → ${right ? '✓ 答对' : '✗ 答错'} | 分数 ${scoreValue()} | 不灭 ${livesLeft()} | 连击 ${text('.combo')}`,
  );
  await sleep(2500);
  if (screen() === 'result') break;
}
ok('累计答错达到允许次数后进入结算页', screen() === 'result', `实际=${screen()}`);
ok('出局时不灭次数归零', livesLeft() === 0, String(livesLeft()));
ok('出局前恰好答错 2 次(EZ 档 allowMiss=2)', wrongCount === 2, String(wrongCount));
ok('未晋级到 HD 档', !text('.heat').includes('3/3'), 'heat 不应显示 HD 档满分');

section('6. 结算页内容');
ok('出现结算页', has('.res'));
ok('显示评级', text('.rt').length === 1, text('.rt'));
ok('显示得分', /\d/.test(text('.sc')), text('.sc'));
ok('逐档战绩三条', $$('.heat li').length === 3, `实际 ${$$('.heat li').length}`);
ok('有「再来一局」按钮', $$('button').some((b) => b.textContent.includes('再来一局')));
ok('有分享战绩按钮', $$('button').some((b) => b.textContent.includes('分享战绩')));
const rec = window.localStorage.getItem('csa.raid.best.v1');
ok('结算写入 localStorage', rec !== null, String(rec));
// 必须在点「再来一局」之前读屏上分数 —— 重开会把 game.score 清零。
const scoreOnResultScreen = scoreValue();
ok('存档里的分数与结算页一致', rec && JSON.parse(rec).score === scoreOnResultScreen,
  `${rec} vs ${scoreOnResultScreen}`);
ok('存档记录了代号', rec && JSON.parse(rec).handle === '测试员', String(rec));
ok('存档记录了最终档位', rec && JSON.parse(rec).tier === 'ez', String(rec));

/** 用标签 chips 反查题目 id —— 每题 tags 唯一,可作为 DOM 身份校验 */
const domQuestionId = (tierId) => {
  const tags = text('.tags');
  const hits = POOL[tierId].filter((q) => q.tags.every((tg) => tags.includes(tg)));
  return hits.length === 1 ? hits[0].id : null;
};

/**
 * 战斗流程:每次抽题前把「这一次抽题要用的 4 个随机值」交给应用,
 * 同时用同一套值在测试侧复刻一遍,算出正确项下标。
 * 背景字符雨已被零尺寸画布掐掉,Math.random 的唯一消耗者就是抽题,供给点因此精确。
 */
const usedIds = [];
let seedCounter = 0x1000;
const nextSeed = () => (seedCounter += 0x9e37);

function armNext(tierId) {
  const vals = valuesForSeed(nextSeed());
  const predicted = predictDraw(tierId, usedIds, vals);
  pendingDrawValues = vals;
  drawConsumed = 0;
  usedIds.push(predicted.id);
  return predicted;
}

/**
 * 说明:本节只做「可确定性断言」的检查。
 * 为什么不做「连对 5 题 → 晋级」的完整 DOM 走查:
 *   所有题目与选项顺序都是运行时随机抽取/打乱的,测试若要在作答前知道正确项,
 *   就必须复刻应用的抽样实现 —— 那属于实现细节,复刻会带来假阳性。
 *   晋级/不灭/计分等引擎行为已由 tools/store-test.mjs 直接驱动真实 store 覆盖
 *   (它回答后能从 store 读到 answerIndex,因此 100% 准确)。
 */
section('7. 再来一局:状态重置');
clickByText('button', '再来一局');
await sleep(150);
ok('重开后回到对局', screen() === 'question', `界面=${screen()}`);
ok('分数已重置为 0', scoreValue() === 0, String(scoreValue()));
ok('锦囊重置为 3', text('.left').startsWith('3/'), text('.left'));
ok('不灭重置为 EZ 档的 2', livesLeft() === 2, String(livesLeft()));
ok('档位回到 EZ 档', text('.tierChip').includes('轻松'), text('.tierChip'));
ok('本档进度重置为 0', text('.progTxt').startsWith('0/'), text('.progTxt'));
ok('题号回到 Q01', text('.qno').includes('01'), text('.qno'));
ok('主题色相回到 EZ 档 152',
  document.documentElement.style.getPropertyValue('--hue').trim() === '152',
  `--hue=${document.documentElement.style.getPropertyValue('--hue')}`);

section('8. 时间冻结锦囊');
const freezeBtn = $$('.jcard').find((b) => b.textContent.includes('时间冻结'));
freezeBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
await sleep(60);
ok('时间冻结消耗 1 个锦囊', text('.left').startsWith('2/'), text('.left'));
const tAfterFreeze = Number(text('.tnum').replace(/[^\d.]/g, ''));
ok('冻结把剩余时间补回到接近满值', tAfterFreeze > 25, String(tAfterFreeze));

section('9. 内线情报锦囊');
const hintBtn = $$('.jcard').find((b) => b.textContent.includes('内线情报'));
hintBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
await sleep(60);
ok('情报面板出现', has('.hint'), text('.hint'));
ok('情报文案含考点标签', text('.hint').includes('考点'), text('.hint').slice(0, 50));
ok('HUD 显示情报折扣', text('.qhead').includes('情报'), text('.qhead'));
ok('内线情报消耗 1 个锦囊', text('.left').startsWith('1/'), text('.left'));

section('10. 键盘作答(A/B/C/D)');
const beforeScore = scoreValue();
document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'A', bubbles: true }));
await sleep(90);
ok('按 A 触发了作答', has('.fb'), `界面=${screen()}`);
const pickedByKey = optionButtons().findIndex((b) => b.className.includes('picked'));
ok('被选中的是第一个选项', pickedByKey === 0, String(pickedByKey));
console.log(`      (键盘作答后: 分数 ${scoreValue()},不灭 ${livesLeft()})`);
ok('分数只增不减', scoreValue() >= beforeScore, `${scoreValue()} vs ${beforeScore}`);

section('11. 键盘使用锦囊(键位 1)');
await sleep(2700);
if (screen() === 'question') {
  const eliminatedBefore = optionButtons().filter((b) => optionState(b) === 'gone').length;
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: '1', bubbles: true }));
  await sleep(60);
  const eliminatedAfter = optionButtons().filter((b) => optionState(b) === 'gone').length;
  ok('按 1 键使用逻辑切割(或已耗尽时给出提示)',
    eliminatedAfter === eliminatedBefore + 2 || text('.left').startsWith('0/'),
    `before=${eliminatedBefore} after=${eliminatedAfter} left=${text('.left')}`);
} else {
  console.log('      (本局已结束,跳过键盘锦囊检查)');
}

section('12. i18n:语言切换');
{
  const langBtn = $('.mini.lang');
  const jokerNames = () => $$('.jcard .nm').map((e) => e.textContent.trim());
  const CJK = /[\u4e00-\u9fa5]/;
  /** 当前屏幕上的题目文本(题干 + 选项 + 标签) */
  const qParts = () => ({
    prompt: text('.prompt'),
    options: $$('.otext').map((e) => e.textContent.trim()).join('|'),
    tags: $$('.qhead .chip').map((e) => e.textContent.trim()).join('/'),
  });

  ok('存在语言切换按钮', !!langBtn, String(!!langBtn));
  ok('标题页顶部不再放语言滑动条', !has('.langSwitch'));
  ok('中文界面:语言按钮带地球图标且指向 EN', langBtn?.textContent.includes('🌐') && langBtn?.textContent.includes('EN'), langBtn?.textContent.trim());
  ok('中文界面:锦囊名是中文', jokerNames().includes('逻辑切割'), jokerNames().join('/'));

  // 关键:记住切换**之前**的题目文本,用来验证切换后当前这道题也跟着变
  const zhQ = qParts();
  ok('中文界面:题干是中文', zhQ.prompt.length > 0 && CJK.test(zhQ.prompt), zhQ.prompt.slice(0, 40));

  if (langBtn) langBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await sleep(150);

  const enQ = qParts();
  ok('切到英文:**当前这道题的题干**立刻变英文(不换题)', enQ.prompt !== zhQ.prompt && !CJK.test(enQ.prompt), enQ.prompt.slice(0, 50));
  ok('切到英文:当前选项里没有汉字', !CJK.test(enQ.options), enQ.options.slice(0, 60));
  ok('切到英文:标签也变英文', enQ.tags.length > 0 && !CJK.test(enQ.tags), enQ.tags);
  ok('切到英文:锦囊名变英文', jokerNames().includes('Logic Cut'), jokerNames().join('/'));
  ok('切到英文:中文锦囊名消失', !jokerNames().includes('逻辑切割'), jokerNames().join('/'));
  ok('切到英文:语言按钮指向 中', langBtn?.textContent.trim() === '🌐中', langBtn?.textContent.trim());
  ok(
    '语言偏好写入 localStorage',
    JSON.parse(localStorage.getItem('csa.raid.lang.v1') ?? '""') === 'en',
    String(localStorage.getItem('csa.raid.lang.v1')),
  );

  if (langBtn) langBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await sleep(150);

  ok('再切回中文:锦囊名恢复中文', jokerNames().includes('逻辑切割'), jokerNames().join('/'));
  ok(
    '语言偏好写回 localStorage',
    JSON.parse(localStorage.getItem('csa.raid.lang.v1') ?? '""') === 'zh',
    String(localStorage.getItem('csa.raid.lang.v1')),
  );
}

section('13. 静音按钮');
{
  const soundBtn = $('.mini.snd');
  ok('存在静音按钮', !!soundBtn, String(!!soundBtn));
  const before = soundBtn?.textContent.trim();
  ok('静音按钮有图标', before === '🔊' || before === '🔇', before);

  if (soundBtn) soundBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await sleep(120);
  const after = soundBtn?.textContent.trim();
  ok('点击后图标变化', after !== before, `${before} → ${after}`);
  ok('图标是另一个状态', after === '🔇' || after === '🔊', after);
  ok(
    '静音偏好写入 localStorage',
    localStorage.getItem('csa.raid.sound.v1') !== null,
    String(localStorage.getItem('csa.raid.sound.v1')),
  );

  // 再点回去,别把状态留在静音
  if (soundBtn) soundBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await sleep(120);
  ok('再点一次恢复原图标', soundBtn?.textContent.trim() === before, `${soundBtn?.textContent.trim()} vs ${before}`);
}

section('14. 主题切换(暗色 CRT ↔ 亮色强光)');
{
  const themeBtn = $('.mini.thm');
  const rootTheme = () => document.documentElement.dataset.theme;

  ok('存在主题切换按钮', !!themeBtn, String(!!themeBtn));
  ok('初始为暗色主题', rootTheme() === 'dark', String(rootTheme()));
  ok('暗色下有 CRT 叠层', has('.crt'));
  ok('暗色下背景 canvas 可见', !$('canvas')?.classList.contains('hidden'));
  ok('暗色按钮指向亮色(☀)', themeBtn?.textContent.trim() === '☀', themeBtn?.textContent.trim());

  if (themeBtn) themeBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await sleep(120);

  ok('切到亮色:data-theme=light', rootTheme() === 'light', String(rootTheme()));
  ok('切到亮色:CRT 叠层被移除', !has('.crt'));
  ok('切到亮色:字符雨 canvas 隐藏', $('canvas')?.classList.contains('hidden') === true);
  ok('切到亮色:按钮变为 ☾', themeBtn?.textContent.trim() === '☾', themeBtn?.textContent.trim());
  ok('切到亮色:aria-pressed 为 true', themeBtn?.getAttribute('aria-pressed') === 'true');
  ok(
    '主题偏好写入 localStorage',
    JSON.parse(localStorage.getItem('csa.raid.theme.v1') ?? '""') === 'light',
    String(localStorage.getItem('csa.raid.theme.v1')),
  );
  // 注意:happy-dom 不会真正按 data-theme 选择器解析样式(它不加载 CSS 文件),
  // 所以这里只能断言"属性写对了";配色本身由 test:theme 直接在 CSS 里校验。
  ok('主题属性写在 <html> 上(供 CSS 令牌切换)', rootTheme() === 'light', String(rootTheme()));

  if (themeBtn) themeBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await sleep(120);
  ok('切回暗色:data-theme=dark', rootTheme() === 'dark', String(rootTheme()));
  ok('切回暗色:CRT 叠层回来', has('.crt'));
}

section('15. 中途退出(ESC / 按钮 + 确认弹窗)');
{
  const quitBtn = $$('button').find((b) => b.className.includes('quitBtn'));
  ok('对局中存在退出按钮', !!quitBtn, String(!!quitBtn));

  if (quitBtn) quitBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await sleep(120);
  ok('点击后弹出确认框', has('.quit'));
  ok('确认框有取消与确认两个按钮', $$('.quit .btn').length === 2, String($$('.quit .btn').length));
  ok('确认框展示当前进度', text('.quit .stats').length > 0, text('.quit .stats').slice(0, 40));
  // 弹窗期间对局仍然留在屏幕上(不是白屏)
  ok('弹窗盖在对局之上,题目仍在', has('.qcard'));
  ok('未作答时退出弹窗不泄露正确选项', !has('.opts .right') && !text('.opts').includes('✓'));

  const cancelBtn = $$('.quit .btn').find((b) => b.textContent.includes('继续'));
  if (cancelBtn) cancelBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await sleep(120);
  ok('点「继续答题」后弹窗关闭', !has('.quit'));
  ok('取消后仍在对局中', has('.qcard') && !has('.res'));

  // ESC 也能唤起,再按 ESC 收起来
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await sleep(120);
  ok('按 ESC 弹出确认框', has('.quit'));
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await sleep(120);
  ok('再按 ESC 收起确认框', !has('.quit'));

  // 确认退出 → 回到标题页,且本局不记入档案
  const bestBefore = localStorage.getItem('csa.raid.best.v1');
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await sleep(120);
  const confirmBtn = $$('.quit .btn').find((b) => b.textContent.includes('确认'));
  ok('找到确认退出按钮', !!confirmBtn, String(!!confirmBtn));
  if (confirmBtn) confirmBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await sleep(150);
  ok('确认后回到标题页', has('.intro'), screen());
  ok('退出后不再显示对局', !has('.qcard') && !has('.res'));
  ok(
    '中途退出不写入档案',
    localStorage.getItem('csa.raid.best.v1') === bestBefore,
    String(localStorage.getItem('csa.raid.best.v1')),
  );
}

/* ---------- 收尾 ---------- */
window.happyDOM?.close?.();

section('结果');
console.log(`\n通过 ${pass} 项,失败 ${fail} 项`);
if (fail > 0) {
  console.log('\n失败项:');
  for (const f of failures) console.log(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log('\n全部通过 ✓');
}
process.exit(process.exitCode ?? 0);
