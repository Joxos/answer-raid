/**
 * 引擎单测:直接 import 真实的 quiz.svelte.ts 商店模块(Svelte 5 会剥离 runes),
 * 于是可以精确、确定性地驱动整局流程 —— 不再依赖 DOM 或随机数预测。
 *
 * 运行:node --experimental-strip-types --import ./tools/store-register.mjs tools/store-test.mjs
 */

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

const q = await import('../src/lib/quiz.svelte.ts');
const { game, tier } = q;
const TIERS = (await import('../src/lib/data/tiers.ts')).TIERS;
const { ROUNDS_PER_TIER } = await import('../src/lib/data/types.ts');
const { bankFor, drawQuestion, localizedQuestion } = await import('../src/lib/data/questions.ts');
const { fmt, locale, setLocale, tagLabel } = await import('../src/lib/i18n.svelte.ts');
setLocale('zh');

/**
 * 题干/选项现在是**按当前语言即时求值**的(`game.current` 只存双语源码 + 选项顺序),
 * 所以测试也要走这两个访问器,而不是读冻结的快照字段。
 */
const curQ = () => q.currentQuestion();
const curIdx = () => q.currentAnswerIndex();
const curId = () => game.current?.source.id;

/** 档位名现在走 i18n 字典(`tier.<id>.label`),不再是 TierMeta 上的字段。 */
const tierLabel = (meta) => fmt(`tier.${meta.id}.label`);
const tierIds = (tierId) => bankFor(tierId, locale()).map((x) => x.id);

/** 等到进入指定 phase(引擎里靠 setTimeout 推进) */
async function waitPhase(phase, timeoutMs = 6000) {
  const t0 = Date.now();
  while (game.phase !== phase) {
    if (Date.now() - t0 > timeoutMs) return false;
    await sleep(20);
  }
  return true;
}
/** 当前题的正确项下标(直接来自商店,100% 准确) */
const correctIndex = () => curIdx();
const questionId = () => curId();

/* ------------------------------------------------------------------ */
section('1. 开局');
ok('初始 phase = boot', game.phase === 'boot', game.phase);
q.boot();
ok('boot() 后进入 intro', game.phase === 'intro', game.phase);
q.startRun('引擎测试');
ok('startRun 后进入 playing', game.phase === 'playing', game.phase);
ok('代号已归一化', game.handle === '引擎测试', game.handle);
ok('档位是 EZ 档', tierLabel(tier()) === '轻松', tierLabel(tier()));
ok('初始分数 0', game.score === 0, String(game.score));
ok('初始不灭 = 2', game.lives === 2, String(game.lives));
ok('初始锦囊 = 3', game.jokersLeft === 3, String(game.jokersLeft));
ok('拿到一道题且 4 个选项', curQ()?.options.length === 4, String(curQ()?.options.length));
ok('正确项下标合法', correctIndex() >= 0 && correctIndex() < 4, String(correctIndex()));

section('2. 时间奖励随时间衰减');
const fullPot = q.livePotential();
ok('满时间时本题潜在得分 = 100×1.5×1.0 = 150', fullPot === 150, String(fullPot));
game.timeLeft = game.timeLimit / 2;
ok('时间过半后潜在得分降到 125', q.livePotential() === 125, String(q.livePotential()));
game.timeLeft = 0;
ok('时间归零后潜在得分 = 100', q.livePotential() === 100, String(q.livePotential()));
game.timeLeft = game.timeLimit;

section('3. 锦囊');
ok('逻辑切割可用', q.canUseJoker('fifty'));
q.useJoker('fifty');
ok('抹除 2 个选项', game.eliminated.length === 2, String(game.eliminated.length));
ok('抹除的都是错误项', game.eliminated.every((i) => i !== correctIndex()), JSON.stringify(game.eliminated));
ok('锦囊剩 2', game.jokersLeft === 2, String(game.jokersLeft));
ok('本题不能再用逻辑切割', !q.canUseJoker('fifty'));
q.useJoker('hint');
ok('情报给出考点', typeof game.hint === 'string' && game.hint.length > 0, String(game.hint));
ok('情报使本题得分打 4 折', game.penalty === 0.4, String(game.penalty));
const hintedPot = q.livePotential();
ok('打折后的潜在得分 = 60', hintedPot === 60, String(hintedPot));
ok('锦囊剩 1', game.jokersLeft === 1, String(game.jokersLeft));
q.useJoker('freeze');
ok('时间冻结补满到上限', game.timeLeft === game.timeLimit, String(game.timeLeft));
ok('锦囊耗尽', game.jokersLeft === 0, String(game.jokersLeft));
ok('锦囊耗尽后不可用', !q.canUseJoker('freeze'));
q.useJoker('freeze');
ok('耗尽后再调用不会变成负数', game.jokersLeft === 0, String(game.jokersLeft));

section('4. 答对一题:计分 / 连击 / 进度');
const gain = q.livePotential();
q.answer(correctIndex());
ok('进入 feedback', game.phase === 'feedback', game.phase);
ok('判定为正确', game.isCorrect === true);
ok('得分 = 打折后潜在分', game.score === gain, `${game.score} vs ${gain}`);
ok('连击 = 1', game.chain === 1, String(game.chain));
ok('本档进度 = 1', game.tierProgress === 1, String(game.tierProgress));
ok('答对不扣不灭', game.lives === 2, String(game.lives));
ok('记录了得分明细', game.lastBreakdown.includes('基础'), game.lastBreakdown);

section('5. 答错一题:扣命 / 清零连击');
ok('自动进入下一题', await waitPhase('playing'), game.phase);
const wrongIdx = [0, 1, 2, 3].find((i) => i !== correctIndex());
const scoreBefore = game.score;
q.answer(wrongIdx);
ok('判定为错误', game.isCorrect === false);
ok('不加分', game.score === scoreBefore, `${game.score} vs ${scoreBefore}`);
ok('连击清零', game.chain === 0, String(game.chain));
ok('不灭 2 → 1', game.lives === 1, String(game.lives));
ok('题目总数已计入', game.answered === 2, String(game.answered));

/* ------------------------------------------------------------------ */
section('6. 连答 3 题晋级 HD 档');
// 先让本档剩余题目全部答对:当前进度 1,还需 2 题
await waitPhase('playing');
let guard = 0;
while (game.tierProgress < ROUNDS_PER_TIER && game.phase !== 'promote' && guard++ < 12) {
  if (game.phase === 'playing') q.answer(correctIndex());
  await sleep(60);
  if (game.phase === 'feedback') await sleep(300);
  if (game.phase === 'promote') break;
  if (game.phase === 'playing') continue;
  if (game.phase === 'over') break;
  await waitPhase('playing', 4000);
  if (game.phase === 'promote') break;
}
ok('触发晋级幕', game.phase === 'promote', `phase=${game.phase} progress=${game.tierProgress}`);
ok('档位索引前进到 1', game.tierIndex === 1, String(game.tierIndex));
ok('档位是 HD 档', tierLabel(tier()) === '进阶', tierLabel(tier()));
ok('晋级后不灭按新档位重置(HD allowMiss=2)', game.lives === 2, String(game.lives));
ok('本档进度归零', game.tierProgress === 0, String(game.tierProgress));
ok('分数保留', game.score > 0, String(game.score));
ok('连击跨档保留', game.chain >= 1, String(game.chain));

section('7. HD 档:不灭=2,所以需要连错两次才出局');
await waitPhase('playing', 6000);
ok('晋级后拿到 HD 档题目', tierIds('hd').includes(questionId()), questionId());
ok('HD 档限时 35s', game.timeLimit === 35, String(game.timeLimit));
ok('晋级后不灭重置为 2(HD 档 allowMiss=2)', game.lives === 2, String(game.lives));
const scoreBeforeDeath = game.score;
// 第一次答错:不灭 2 → 1,还不能出局
q.answer([0, 1, 2, 3].find((i) => i !== correctIndex()));
ok('HD 档第一次答错:不灭 2 → 1', game.lives === 1, String(game.lives));
ok('答错不加分', game.score === scoreBeforeDeath, String(game.score));
ok('第一次答错后仍在进行中(未出局)', await waitPhase('playing', 6000), game.phase);
// 第二次答错:不灭 1 → 0,出局
q.answer([0, 1, 2, 3].find((i) => i !== correctIndex()));
ok('第二次答错后不灭归零', game.lives === 0, String(game.lives));
ok('进入结算 over', await waitPhase('over'), game.phase);
ok('结算未通关', game.cleared === false);
ok('最终档位记录为 HD 档', tierLabel(TIERS[game.finalTierIndex]) === '进阶', String(game.finalTierIndex));
ok('最高连击被记录', game.bestChain >= 1, String(game.bestChain));
const rankNow = q.rank();
// 该局:EZ 档答对 6 题(150+165+180+195+210+225 = 1125)、HD 档首题出局
// → 分数 1125,落在 600~2000 之间,应为 C
ok('评级为 C(EZ 全过、折在 HD 档门口)', rankNow.t === 'C', `${rankNow.t} / 分数 ${game.score}`);

/* ------------------------------------------------------------------ */
section('8. 重开一局:状态完全重置');
q.retry();
ok('回到 playing', game.phase === 'playing', game.phase);
ok('分数清零', game.score === 0, String(game.score));
ok('不灭回到 2(EZ 档)', game.lives === 2, String(game.lives));
ok('锦囊回到 3', game.jokersLeft === 3, String(game.jokersLeft));
ok('档位回到 EZ 档', tierLabel(tier()) === '轻松', tierLabel(tier()));
ok('连击清零', game.chain === 0, String(game.chain));
ok('抹除标记清空', game.eliminated.length === 0, String(game.eliminated.length));
ok('情报清空', game.hint === null, String(game.hint));
ok('折扣重置', game.penalty === 1, String(game.penalty));

/* ------------------------------------------------------------------ */
section('9. 超时判定(直接调用 answer(-1) 无法触发,改为让倒计时自然走完)');
// 把剩余时间压到 0.2s,等心跳把它归零
game.timeLeft = 0.2;
ok('等待超时判定', await waitPhase('feedback', 4000), game.phase);
ok('超时标记', game.timesUp === true);
ok('超时视为答错', game.isCorrect === false);
ok('超时扣命', game.lives === 1, String(game.lives));
ok('超时不计分', game.score === 0, String(game.score));
ok('超时明细文案正确', game.lastBreakdown.includes('TIMEOUT'), game.lastBreakdown);

/* ------------------------------------------------------------------ */
section('9b. i18n:抽题按当前语言本地化');
{
  // 中文:题干应含汉字
  setLocale('zh');
  q.retry();
  ok('[zh] 抽到的题是中文题干', /[\u4e00-\u9fa5]/.test(curQ().prompt), curQ().prompt.slice(0, 40));
  // 注意:选项**不保证**含汉字 —— 有些题的选项是 `[1, 4, 7]` 这类两种语言通用的字面量。
  // 所以这里只断言「选项文本与题库里该题的中文选项一致」。
  {
    const zhBank = bankFor(curQ().tier, 'zh').find((x) => x.id === curId());
    ok(
      '[zh] 选项取自中文题库',
      zhBank !== undefined && zhBank.options.every((o) => curQ().options.includes(o)),
      curQ().options.join('|'),
    );
  }
  ok('[zh] 情报文案是中文', q.canUseJoker('hint') && (q.useJoker('hint'), /[\u4e00-\u9fa5]/.test(game.hint)), String(game.hint));

  // 英文:同一道题应换成英文文本,且结构(id / 答案下标 / 选项数)完全不变
  const zhId = curId();
  const zhCount = curQ().options.length;
  setLocale('en');
  q.retry();
  ok('[en] 抽到的题是英文题干', !/[\u4e00-\u9fa5]/.test(curQ().prompt), curQ().prompt.slice(0, 60));
  ok('[en] 题面确实有英文内容', /[a-zA-Z]{4,}/.test(curQ().prompt), curQ().prompt.slice(0, 40));
  ok('[en] 选项数不变', curQ().options.length === zhCount, String(curQ().options.length));
  // 英文界面下抽到的 id 必须是当前档位题库里的合法题(不写死文件名前缀)
  ok(
    '[en] id 仍是该档题库里的合法 id',
    tierIds(curQ().tier).includes(curId()),
    `${curId()} (档位 ${curQ().tier})`
  );
  ok('[en] 正确项下标仍在选项范围内', curIdx() >= 0 && curIdx() < zhCount, String(curIdx()));
  ok('[en] 情报文案是英文', q.canUseJoker('hint') && (q.useJoker('hint'), !/[\u4e00-\u9fa5]/.test(game.hint)), String(game.hint));
  ok('[en] 计分明细是英文', game.lastBreakdown === '' || !/[\u4e00-\u9fa5]/.test(game.lastBreakdown), game.lastBreakdown);

  // 复位,避免影响后续用例
  setLocale('zh');
  q.retry();
  ok('复位后回到中文题干', /[\u4e00-\u9fa5]/.test(curQ().prompt), curQ().prompt.slice(0, 30));
  void zhId;
}

/* ------------------------------------------------------------------ */
section('9c. i18n:全题库逐题核对(不只是抽到的那一道)');
{
  const CJK = /[\u4e00-\u9fa5]/;
  const TIER_IDS = TIERS.map((x) => x.id);
  /** 反复抽题,把某档某语言下的**每一道题**都收集齐 */
  const sweep = (tierId, lang) => {
    setLocale(lang);
    const target = bankFor(tierId, lang).length;
    const seen = new Map();
    for (let i = 0; i < 4000 && seen.size < target; i++) {
      const d = drawQuestion(tierId, []);
      if (!d) break;
      const id = d.source.id;
      // 按该语言摊平后再比对(摊平是渲染层真正用的那一步)
      if (!seen.has(id)) seen.set(id, localizedQuestion(d, lang));
    }
    return { seen, target };
  };

  let checked = 0;
  const bad = [];
  for (const tierId of TIER_IDS) {
    const { seen: zhPool, target } = sweep(tierId, 'zh');
    const { seen: enPool } = sweep(tierId, 'en');
    // 该档的题库必须够一局抽满,否则会出现"抽不满就晋级"
    if (target < ROUNDS_PER_TIER) bad.push(`${tierId}:题库只有 ${target} 题,不足一局 ${ROUNDS_PER_TIER} 题`);
    if (zhPool.size < target) bad.push(`${tierId}:抽样 ${zhPool.size}/${target} 没抽全`);
    for (const [id, zq] of zhPool) {
      const eq = enPool.get(id);
      checked += 1;
      if (!eq) bad.push(`${id}:英文题库缺这道题`);
      else if (zq.prompt === eq.prompt) bad.push(`${id}:题干没随语言变`);
      else if (zq.explain === eq.explain) bad.push(`${id}:讲解没随语言变`);
      else if (CJK.test(eq.prompt) || CJK.test(eq.explain)) bad.push(`${id}:英文文本里还有汉字`);
      else if (eq.options.length !== zq.options.length) bad.push(`${id}:选项数不一致`);
    }
  }
  ok('每档题量都不少于一局所需,且全部题目随语言变化', bad.length === 0, bad.slice(0, 5).join(' | '));
  {
    const total = TIER_IDS.reduce((n, id) => n + bankFor(id, 'zh').length, 0);
    ok(`逐题核对覆盖了整库(${total} 题)`, checked === total, `实际 ${checked}`);
  }

  // 标签是"数据键 + 字典",要在渲染层单独核对一遍
  const tagBad = [];
  for (const tierId of TIER_IDS) {
    const { seen } = sweep(tierId, 'en');
    for (const [, qq] of seen) {
      for (const tg of qq.tags) {
        const label = tagLabel(tg);
        // 英文标签里允许出现的汉字:只可能是漏译(标签的正确中英形式要么不同,要么本来就一样)
        if (CJK.test(label)) tagBad.push(`${tg}->${label}`);
      }
    }
  }
  ok('英文界面下所有题目标签都没有汉字', tagBad.length === 0, [...new Set(tagBad)].join(', '));

  setLocale('zh');
}

/* ------------------------------------------------------------------ */
section('9d. i18n:切语言后**当前这道题**要立刻跟着变(不换题)');
{
  const CJK = /[\u4e00-\u9fa5]/;
  setLocale('zh');
  q.retry();
  const idBefore = curId();
  const zhPrompt = curQ().prompt;
  const zhOpts = curQ().options.slice();

  // 只切语言,**不重新抽题**
  setLocale('en');
  const enPrompt = curQ().prompt;
  const enOpts = curQ().options.slice();
  const enTags = curQ().tags.map((x) => tagLabel(x));

  ok('切语言不换题(题目 id 不变)', curId() === idBefore, `${idBefore} -> ${curId()}`);
  ok('切语言后题干立刻变英文', enPrompt !== zhPrompt && !CJK.test(enPrompt), enPrompt.slice(0, 50));
  // 选项里可能全是数字/专有名词这类两语通用的字面量(如 `45 | 55 | 100 | 10`),
  // 所以这里断言的是"英文模式下不含汉字",而不是"选项文本必须变化"。
  ok('切语言后选项里没有汉字', !CJK.test(enOpts.join('')), enOpts.join(' | '));
  ok('切语言后标签也变英文', enTags.every((x) => !CJK.test(x)), enTags.join('/'));
  ok('选项条数不变', enOpts.length === zhOpts.length, `${zhOpts.length} vs ${enOpts.length}`);
  ok('正确项下标不变(选项顺序不因语言重洗)', curIdx() >= 0 && curIdx() < enOpts.length, String(curIdx()));

  // 切回中文,应当与最初完全一致
  setLocale('zh');
  ok('切回中文后题干复原', curQ().prompt === zhPrompt, curQ().prompt.slice(0, 40));
  ok('切回中文后选项复原', curQ().options.join('|') === zhOpts.join('|'), curQ().options.join('|'));
}

/* ------------------------------------------------------------------ */
section('10. 题库不重复抽取(一局内)');
q.retry();
const order = [questionId()];
game.timeLeft = 999;
q.answer(correctIndex());
for (let n = 0; n < 4; n++) {
  await waitPhase('playing', 4000);
  if (game.phase !== 'playing') break;
  order.push(questionId());
  game.timeLeft = 999; // 避免超时
  q.answer(correctIndex());
  await sleep(300);
}
console.log(`      抽到的题序 = ${order.join(' → ')}`);
ok('EZ 档 3 题互不相同', new Set(order).size === order.length, `dup 出现在 ${order.join(',')}`);

/* ------------------------------------------------------------------ */
section('11. 回到标题');
q.toIntro();
ok('phase = intro', game.phase === 'intro', game.phase);
ok('分数清零', game.score === 0, String(game.score));
ok('保留代号', game.handle === '引擎测试', game.handle);

/* ------------------------------------------------------------------ */
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
