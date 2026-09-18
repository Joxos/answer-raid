/**
 * ANSWER RAID 离线验证:题库完整性 + 抽题/选项打乱 + 完整一局的推进逻辑。
 *
 * 运行:node tools/verify.mjs
 *
 * 说明:这里按 node --experimental-strip-types 直接吃 .ts 源文件,
 * 并且**重新实现**了 quiz.svelte.ts 里的推进规则(而不是 import 它),
 * 目的是用一份独立实现去交叉验证「五档递进 + 不灭次数 + 计分」是否自洽。
 */

import { readFileSync } from 'node:fs';
import { noviceQuestions } from '../src/lib/data/questions/novice.ts';
import { systemsQuestions } from '../src/lib/data/questions/systems.ts';
import { acmQuestions } from '../src/lib/data/questions/acm.ts';
import { faqQuestions } from '../src/lib/data/questions/faq.ts';
import { documentQuestions } from '../src/lib/data/questions/document.ts';
import { localizeQuestion, ROUNDS_PER_TIER } from '../src/lib/data/types.ts';
import { TIERS as TIER_META } from '../src/lib/data/tiers.ts';

/**
 * 语言清单直接从这个脚本里给出(而不是 import i18n.ts)——
 * i18n 用了 Svelte 5 runes,而本脚本跑在裸 Node 下,没有 runes 编译器。
 * 下面的断言会校验「这里列的语言」与「题库实际提供的语言」一致。
 */
const LOCALES = ['zh', 'en'];

/** 抽题时会按语言取其中一份文本;这里把双语题摊平成原来的扁平结构(结构字段必须保留)。 */
const flatten = (q) => ({
  ...q.zh,
  id: q.id,
  tier: q.tier,
  tags: q.tags,
  answer: q.answer,
  code: q.code,
  lang: q.lang,
  chartKind: q.chartKind,
  chartData: q.chartData,
});

const ALL_RAW = [...noviceQuestions, ...systemsQuestions, ...acmQuestions, ...faqQuestions, ...documentQuestions];

/**
 * 档位配置从 tiers.ts 取(结构与数值),标签用中文名写在本脚本里。
 * 题库**按每题自己的 `tier` 字段**分档 —— 与 questions.ts 的推导方式一致。
 */
const TIER_LABEL = { ez: '轻松档 EZ', hd: '进阶档 HD', in: '深入档 IN' };
const TIERS = TIER_META.map((m) => ({
  id: m.id,
  label: TIER_LABEL[m.id] ?? m.id,
  allowMiss: m.allowMiss,
  timeLimit: m.timeLimit,
  baseScore: m.baseScore,
  pool: ALL_RAW.filter((q) => q.tier === m.id).map(flatten),
}));
const RAW_TIERS = TIER_META.map((m) => ({
  label: TIER_LABEL[m.id] ?? m.id,
  pool: ALL_RAW.filter((q) => q.tier === m.id),
}));

let pass = 0;
let fail = 0;
const failures = [];

function ok(name, cond, extra = '') {
  if (cond) {
    pass += 1;
    console.log(`  \u2713 ${name}`);
  } else {
    fail += 1;
    failures.push(name + (extra ? ` — ${extra}` : ''));
    console.log(`  \u2717 ${name}${extra ? ` — ${extra}` : ''}`);
  }
}

function section(title) {
  console.log(`\n=== ${title} ===`);
}

/* ------------------------------------------------------------------ */
section('1. 题库结构');

const ALL = ALL_RAW;

ok('总题数 = 118(39 原有 + 79 文档新增)', ALL.length === 118, `实际 ${ALL.length}`);

const sourceBank = JSON.parse(readFileSync(new URL('../docs/question-bank-source.json', import.meta.url), 'utf8'));
const expectedRefs = sourceBank.map((q) => `part${q.part}-${String(q.number).padStart(2, '0')}`);
const actualRefs = ALL.map((q) => q.sourceRef).filter(Boolean);
ok('来源文档 103 题逐题覆盖且不重复导入', expectedRefs.length === 103 && actualRefs.length === 103 &&
  new Set(actualRefs).size === 103 && expectedRefs.every((ref) => actualRefs.includes(ref)));
ok('全部英文题干、选项、讲解不含未翻译的中文', ALL.every((q) =>
  !/[\u3400-\u9fff]/.test([q.en.prompt, ...q.en.options, q.en.explain].join('\n'))));

for (const t of TIERS) {
  ok(
    `${t.label} 题量足够一局(${ROUNDS_PER_TIER} 题),当前 ${t.pool.length} 题`,
    t.pool.length >= ROUNDS_PER_TIER,
    `实际 ${t.pool.length}`,
  );
  ok(
    `${t.label} 全部 tier 字段正确`,
    t.pool.every((q) => q.tier === t.id),
  );
  ok(
    `${t.label} 每题 4 个选项`,
    t.pool.every((q) => Array.isArray(q.options) && q.options.length === 4),
    t.pool.filter((q) => q.options?.length !== 4).map((q) => `${q.id}:${q.options?.length}`).join(','),
  );
  ok(
    `${t.label} answer 下标合法`,
    t.pool.every((q) => Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length),
  );
  ok(
    `${t.label} 选项互不重复`,
    t.pool.every((q) => new Set(q.options).size === q.options.length),
  );
  ok(
    `${t.label} 题面/讲解非空且足够长`,
    t.pool.every((q) => q.prompt.trim().length >= 5 && q.explain.trim().length >= 40),
    t.pool.filter((q) => q.prompt.trim().length < 5 || q.explain.trim().length < 40).map((q) => q.id).join(', '),
  );
  ok(
    `${t.label} 每题都有 tags`,
    t.pool.every((q) => Array.isArray(q.tags) && q.tags.length >= 1),
  );
}

ok('题目 id 全局唯一', new Set(ALL.map((q) => q.id)).size === ALL.length);

// 答案下标分布:一档只有 3 题,所以要求"至少 2 种";全局仍然要覆盖 0/1/2/3
for (const t of TIERS) {
  const idx = new Set(t.pool.map((q) => q.answer));
  ok(`${t.label} answer 下标有分布(≥2 种)`, idx.size >= 2, `实际 ${[...idx].join(',')}`);
}
const globalIdx = new Set(ALL.map((q) => q.answer));
ok('全局 answer 下标覆盖 0/1/2/3', [0, 1, 2, 3].every((i) => globalIdx.has(i)), `实际 ${[...globalIdx].sort().join(',')}`);

// chartKind 用法合法,且 svg 数据存在
ok(
  'chartKind 只为 none/ascii/svg 且都带数据',
  ALL.every(
    (q) =>
      q.chartKind === undefined ||
      (['none', 'ascii', 'svg'].includes(q.chartKind) && typeof q.chartData === 'string' && q.chartData.length > 0),
  ),
);
ok('含 svg 图表的题目其 chartData 是合法 <svg>', ALL.filter((q) => q.chartKind === 'svg').every((q) => /^<svg[\s\S]*<\/svg>$/.test(q.chartData.trim())));

// 题目格式多样性:代码题 / 文本题都存在
const withCode = ALL.filter((q) => typeof q.code === 'string' && q.code.length > 0);
ok('存在代码题(≥5 道)', withCode.length >= 5, `实际 ${withCode.length}`);
ok('存在纯文本题(≥3 道)', ALL.length - withCode.length >= 3, `实际 ${ALL.length - withCode.length}`);
ok('代码题都标了 lang', withCode.every((q) => typeof q.lang === 'string' && q.lang.length > 0));
ok('代码里没有 tab 缩进', withCode.every((q) => !q.code.includes('\t')));

/* ---------------- 1b. 双语(i18n)完整性 ---------------- */

for (const t of RAW_TIERS) {
  ok(
    `${t.label} 每题都有 zh 与 en 两份文本`,
    t.pool.every((q) => q.zh && q.en && typeof q.zh.prompt === 'string' && typeof q.en.prompt === 'string'),
  );
  ok(
    `${t.label} 两种语言的选项个数一致`,
    t.pool.every((q) => q.zh.options.length === q.en.options.length),
  );
  ok(
    `${t.label} 两种语言都没有空文本`,
    t.pool.every((q) =>
      [q.zh, q.en].every(
        (x) =>
          x.prompt.trim().length > 0 &&
          x.explain.trim().length > 0 &&
          x.options.every((o) => o.trim().length > 0),
      ),
    ),
  );
  ok(
    `${t.label} 两种语言各自选项互不重复`,
    t.pool.every((q) => [q.zh, q.en].every((x) => new Set(x.options).size === x.options.length)),
  );
  ok(
    `${t.label} 英文题面与讲解足够长`,
    t.pool.every((q) => q.en.prompt.trim().length >= 10 && q.en.explain.trim().length >= 40),
  );
  ok(
    `${t.label} 题面与讲解确实翻译过(英文不与中文雷同)`,
    t.pool.every((q) => q.en.prompt !== q.zh.prompt && q.en.explain !== q.zh.explain),
  );
}

// 选项的翻译是**全局**性质:某些档(如 HD)三道题的选项恰好都是数字/二进制这类
// 两种语言通用的字面量,所以不能按档要求"每档都翻译了选项"。
ok(
  '至少有一批题目的选项被翻译过(专有名词可原样保留)',
  RAW_TIERS.some((t) => t.pool.some((q) => q.en.options.some((o, i) => o !== q.zh.options[i]))),
);

// 摊平后仍满足结构约束(与上面纯中文时期的断言等价)
for (const lang of LOCALES) {
  for (const t of RAW_TIERS) {
    const pool = t.pool.map((q) => localizeQuestion(q, lang));
    ok(
      `${t.label}[${lang}] 摊平后每题 4 选项 / answer 合法 / 选项不重复`,
      pool.every(
        (q) =>
          q.options.length === 4 &&
          Number.isInteger(q.answer) &&
          q.answer >= 0 &&
          q.answer < q.options.length &&
          new Set(q.options).size === q.options.length,
      ),
    );
  }
}

// 摊平不会丢字段:可选题材(code / lang / chart*)必须照抄
for (const lang of LOCALES) {
  const flat = ALL_RAW.map((q) =>
    localizeQuestion(q, lang),
  );
  ok(
    `[${lang}] 摊平后 code / chart 字段无丢失`,
    flat.every((q, i) => {
      const src = ALL_RAW[i];
      return q.code === src.code && q.chartKind === src.chartKind && q.chartData === src.chartData;
    }),
  );
  ok(`[${lang}] 摊平后 tier / id 无丢失`, flat.every((q) => q.tier && q.id));
}

// 中英文字典的 key 必须一一对应
{
  const src = readFileSync(new URL('../src/lib/i18n.svelte.ts', import.meta.url), 'utf8');
  const slice = (from, to) => src.slice(src.indexOf(from), to ? src.indexOf(to) : undefined);
  const keysOf = (block) => new Set([...block.matchAll(/^\s{4}'([^']+)':/gm)].map((m) => m[1]));
  /** key -> 取值(只看字符串条目;函数式文案不参与标签比对) */
  const valuesOf = (block) =>
    new Map(
      [...block.matchAll(/^\s{4}'([^']+)':\s*'((?:[^'\\]|\\.)*)',/gm)].map((m) => [m[1], m[2]]),
    );
  const zhBlock = slice('  zh: {', '  en: {');
  const enBlock = slice('  en: {', '\n};');
  const zh = keysOf(zhBlock);
  const en = keysOf(enBlock);
  const zhVals = valuesOf(zhBlock);
  const enVals = valuesOf(enBlock);
  const missingEn = [...zh].filter((k) => !en.has(k));
  const missingZh = [...en].filter((k) => !zh.has(k));
  ok('i18n 字典:每个中文 key 都有英文', missingEn.length === 0, missingEn.join(', '));
  ok('i18n 字典:每个英文 key 都有中文', missingZh.length === 0, missingZh.join(', '));
  ok('i18n 字典:key 数量足够(>60)', zh.size > 60, `实际 ${zh.size}`);

  // 每个题目标签都必须有中英两条,否则英文界面会漏出中文
  const allTags = new Set(RAW_TIERS.flatMap((t) => t.pool.flatMap((q) => q.tags)));
  const missingTagZh = [...allTags].filter((tag) => !zh.has(`tag.${tag}`));
  const missingTagEn = [...allTags].filter((tag) => !en.has(`tag.${tag}`));
  ok(`i18n 字典:全部 ${allTags.size} 个题目标签都有中文条目`, missingTagZh.length === 0, missingTagZh.join(', '));
  ok('i18n 字典:全部题目标签都有英文条目', missingTagEn.length === 0, missingTagEn.join(', '));

  /**
   * 「有没有真的翻译」不能只看值等不等于 key ——
   * `Python` / `Transformer` / `Web` / `GPT` / `NP` 这些标签的正确中英形式本来就一样。
   * 真正要抓的是"**半译**":中文值已经改成别的说法、英文却还等于中文值(典型的复制粘贴漏改)。
   */
  const halfDone = [...allTags].filter((tag) => {
    const z = zhVals.get(`tag.${tag}`);
    const e = enVals.get(`tag.${tag}`);
    return z !== undefined && e !== undefined && z !== tag && e === z;
  });
  ok('i18n 字典:没有"半译"的标签(中文改了、英文没跟上)', halfDone.length === 0, halfDone.join(', '));

  // 「进度 n/N」里的分母必须来自 ROUNDS_PER_TIER,不能写死。
  // (改档位题数时写死的 /5 不会报错,只会在界面上默默显示错的分母)
  const hardcoded = [...src.matchAll(/p\.n\}\s*\/\s*\d/g)].map((m) => m[0]);
  ok('i18n 字典:进度分母没有写死(用 p.total)', hardcoded.length === 0, hardcoded.join(', '));

  // 题库提供的语言 与 字典/渲染层支持的语言 必须一致
  const srcLangs = new Set();
  for (const t of RAW_TIERS) {
    for (const q of t.pool) {
      for (const k of Object.keys(q)) {
        if (LOCALES.includes(k)) srcLangs.add(k);
      }
    }
  }
  ok(
    '题库提供的语言与 LOCALES 一致',
    LOCALES.every((l) => srcLangs.has(l)) && srcLangs.size === LOCALES.length,
    `题库:${[...srcLangs].join(',')} / 期望:${LOCALES.join(',')}`,
  );
}

/* ------------------------------------------------------------------ */
section('2. 抽题与选项打乱');

function shuffle(input) {
  const out = input.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function draw(tier, usedIds) {
  const used = new Set(usedIds);
  let cands = tier.pool.filter((q) => !used.has(q.id));
  if (cands.length === 0) {
    const recent = usedIds[usedIds.length - 1];
    cands = tier.pool.filter((q) => q.id !== recent);
    if (cands.length === 0) cands = tier.pool.slice();
  }
  const q = cands[Math.floor(Math.random() * cands.length)];
  const correctText = q.options[q.answer];
  const options = shuffle(q.options);
  return { q, options, answerIndex: options.indexOf(correctText) };
}

let badShuffle = 0;
let answerAlwaysSame = 0;
const seenPositions = new Set();
for (let n = 0; n < 400; n++) {
  const d = draw(TIERS[0], []);
  if (d.options[d.answerIndex] !== d.q.options[d.q.answer]) badShuffle += 1;
  if (new Set(d.options).size !== 4) badShuffle += 1;
  seenPositions.add(d.answerIndex);
  if (d.answerIndex === d.q.answer) answerAlwaysSame += 1;
}
ok('打乱后 answerIndex 始终指向正确文本', badShuffle === 0, `${badShuffle} 次异常`);
ok('打乱后 4 个位置都能成为正确项', seenPositions.size === 4, `实际 ${[...seenPositions].sort().join(',')}`);
ok('打乱确实是随机的(不是恒等映射)', answerAlwaysSame < 380, `400 次里有 ${answerAlwaysSame} 次位置不变`);

// 一档 5 题不重复
let dup = 0;
for (let n = 0; n < 200; n++) {
  const used = [];
  for (let i = 0; i < ROUNDS_PER_TIER; i++) {
    const d = draw(TIERS[1], used);
    if (used.includes(d.q.id)) dup += 1;
    used.push(d.q.id);
  }
}
ok(`同一档内 ${ROUNDS_PER_TIER} 题不重复(200 次模拟)`, dup === 0, `${dup} 次重复`);

/* ------------------------------------------------------------------ */
section('3. 完整一局推进(独立复刻规则)');

function simulate({ answers }) {
  let tierIndex = 0;
  let progress = 0;
  let lives = TIERS[0].allowMiss;
  let score = 0;
  let chain = 0;
  let bestChain = 0;
  let correct = 0;
  let answered = 0;
  let cleared = false;
  let finalTier = 0;
  const usedIds = [];
  const trace = [];

  for (let step = 0; step < 200; step++) {
    const t = TIERS[tierIndex];
    const timeLeft = t.timeLimit; // 完美作答:满时间奖励
    const d = draw(t, usedIds);
    usedIds.push(d.q.id);
    const isRight = answers(step, t, d);
    answered += 1;

    if (isRight) {
      const timeFactor = 1 + 0.5 * (timeLeft / t.timeLimit); // = 1.5
      const comboFactor = Math.min(2, 1 + 0.1 * chain); // chain 为已有连击数
      const gain = Math.round(t.baseScore * timeFactor * comboFactor);
      score += gain;
      chain += 1;
      bestChain = Math.max(bestChain, chain);
      correct += 1;
      progress += 1;
      trace.push(`${t.label} Q${progress} 对 +${gain} (连击${chain})`);
    } else {
      chain = 0;
      lives -= 1;
      trace.push(`${t.label} Q${progress + 1} 错 不灭-1 -> ${lives}`);
    }
    finalTier = Math.max(finalTier, tierIndex);

    if (lives <= 0) return { end: 'dead', tierIndex, score, correct, answered, bestChain, cleared, finalTier, trace };
    if (isRight && progress >= ROUNDS_PER_TIER) {
      if (tierIndex >= TIERS.length - 1) {
        cleared = true;
        return { end: 'cleared', tierIndex, score, correct, answered, bestChain, cleared, finalTier, trace };
      }
      tierIndex += 1;
      progress = 0;
      lives = TIERS[tierIndex].allowMiss;
      trace.push(`>>> 晋级 ${TIERS[tierIndex].label} (不灭重置为 ${lives})`);
    }
  }
  return { end: 'loop', tierIndex, score, correct, answered, bestChain, cleared, finalTier, trace };
}

// 3a. 全对
const RUN_SIZE = TIERS.length * ROUNDS_PER_TIER; // 一局要答的题数(每档抽满一局)
const perfect = simulate({ answers: () => true });
ok('全对 → 通关', perfect.end === 'cleared', perfect.end);
ok(`全对 → 答对 ${RUN_SIZE} 题`, perfect.correct === RUN_SIZE, String(perfect.correct));
// 满分由 simulate 实算:每档 6 题、时间奖励满值 ×1.5、连击跨档累积到 ×2.0
ok('全对 → 满分 10185', perfect.score === 10185, String(perfect.score));
ok(`全对 → 最高连击 ${RUN_SIZE}`, perfect.bestChain === RUN_SIZE, String(perfect.bestChain));
ok('全对 → 到达 IN 档', perfect.finalTier === 2, String(perfect.finalTier));

// 3b. 第一题就错两次 → 死在 EZ 档
let n1 = 0;
const noviceDead = simulate({ answers: () => n1++ < 2 ? false : true });
// 错两次:不灭 2→1→0,第二次后出局
ok('EZ 档连错 2 题 → 出局', noviceDead.end === 'dead', noviceDead.end);
ok('出局时停在 EZ 档', noviceDead.finalTier === 0, String(noviceDead.finalTier));
ok('出局时得分为 0', noviceDead.score === 0, String(noviceDead.score));

// 3c. EZ 档全对后,HD 档错 1 题 → 出局(HD allowMiss=2,所以错满 2 次才出局)
const hdDead = simulate({
  answers: (s, t) => (t.id === 'hd' ? false : true),
});
ok('HD 档连错 2 题即出局(不灭=2)', hdDead.end === 'dead', hdDead.end);
ok('HD 档出局时最高档位 = HD', hdDead.finalTier === 1, String(hdDead.finalTier));
ok(`HD 档出局时已答对 ${ROUNDS_PER_TIER} 题(EZ 全对)`, hdDead.correct === ROUNDS_PER_TIER, String(hdDead.correct));

// 3d. 每档固定「错 1 题 + 连对 3 题」:EZ / HD 不灭=2 能扛住 1 次失误,
//     但 IN 起不灭=1,那次失误就是致命的 —— 这正是「越往上越不许犯错」的设计。
const tierCounterA = { ez: 0, hd: 0, in: 0 };
const staged = simulate({
  answers: (s, t) => {
    tierCounterA[t.id] += 1;
    return tierCounterA[t.id] !== 1; // 每档第 1 题错
  },
});
ok('EZ 档失误 1 次不致命(不灭=2),之后还能连过两档', staged.correct === 2 * ROUNDS_PER_TIER, String(staged.correct));
ok('进入 IN 档后首次失误即出局(不灭=1)', staged.end === 'dead' && staged.finalTier === 2, `${staged.end}/${staged.finalTier}`);
ok('该局作答 15 题(EZ 1错+6对,HD 1错+6对,IN 1错)', staged.answered === 15, String(staged.answered));
// EZ: 错一题把连击清零,所以后三题是 连击1/2/3: 150+165+180 = 495
// HD: 同样先错一题清零,再 连击1/2/3: 180×1.5×(1.0,1.1,1.2) = 270+297+324 = 891
ok('该局得分 3375(EZ 1125 + HD 2250)', staged.score === 3375, String(staged.score));

// 3d-2. 只有 EZ 档失误、之后全对 → 能一路通关
const tierCounterB = { ez: 0, hd: 0, in: 0 };
const forgiving = simulate({
  answers: (s, t) => {
    tierCounterB[t.id] += 1;
    return !(t.id === 'ez' && tierCounterB[t.id] === 1);
  },
});
ok('仅 EZ 档失误 1 次 → 仍能通关', forgiving.end === 'cleared', forgiving.end);
ok(`该局答对 ${RUN_SIZE} 题(失误不计分,但不影响后面全对)`, forgiving.correct === RUN_SIZE, String(forgiving.correct));
ok('该局作答 19 题(仅 EZ 多错 1 题)', forgiving.answered === 19, String(forgiving.answered));
ok(`该局最高连击 ${RUN_SIZE}(失误后连对到通关)`, forgiving.bestChain === RUN_SIZE, String(forgiving.bestChain));
// 关键结论:答错只是重置连击倍率,不会「浪费」分数 ——
// 该局与全对局的得分完全相同,差别只在多项 1 次作答。
ok('失误但不致命 → 得分与全对局完全相同', forgiving.score === perfect.score, `${forgiving.score} vs ${perfect.score}`);

// 3e. 不灭次数重置:确认晋级后 lives 回到该档 allowMiss
ok(
  '晋级后不灭次数按新档位重置',
  perfect.trace.some((l) => l.includes('不灭重置为 1')),
  perfect.trace.filter((l) => l.startsWith('>>>')).join(' | '),
);

/* ------------------------------------------------------------------ */
section('4. 评级阈值');

function rankOf({ cleared, correct, finalTier, tierIndex, score }) {
  // 与 quiz.svelte.ts 的 rank() 保持一致的阈值(EZ/HD 只是早期档,够不着 A)
  const reachedIn = finalTier >= 2 || tierIndex >= 2;
  if (cleared && correct >= TIERS.length * ROUNDS_PER_TIER) return 'SSS';
  if (cleared) return 'SS';
  if (reachedIn) return 'S';
  if (score >= 3500) return 'A';
  if (score >= 1800) return 'B';
  if (score >= 600) return 'C';
  return 'D';
}
ok('全对通关 → SSS', rankOf({ cleared: true, correct: 18, finalTier: 2, tierIndex: 2, score: 10185 }) === 'SSS');
ok('错一题通关 → SS', rankOf({ cleared: true, correct: 17, finalTier: 2, tierIndex: 2, score: 9400 }) === 'SS');
ok('死在 IN 档 → S', rankOf({ cleared: false, correct: 13, finalTier: 2, tierIndex: 2, score: 5000 }) === 'S');
ok('HD 档中段 → A', rankOf({ cleared: false, correct: 10, finalTier: 1, tierIndex: 1, score: 3600 }) === 'A');
ok('HD 档 → B', rankOf({ cleared: false, correct: 8, finalTier: 1, tierIndex: 1, score: 2000 }) === 'B');
ok('只过 EZ 未到 HD → C', rankOf({ cleared: false, correct: 6, finalTier: 0, tierIndex: 0, score: 900 }) === 'C');
ok('低分 → D', rankOf({ cleared: false, correct: 0, finalTier: 0, tierIndex: 0, score: 0 }) === 'D');

// 阈值必须与真实引擎里写的一致(防止两边漂移)
{
  const quizSrc = readFileSync(new URL('../src/lib/quiz.svelte.ts', import.meta.url), 'utf8');
  ok('引擎 rank() 的 S 档判定看 finalTierIndex >= 2', quizSrc.includes('finalTierIndex >= 2'));
  ok('引擎 rank() 的 A/B/C 阈值与本文一致', ['s >= 3500', 's >= 1800', 's >= 600'].every((x) => quizSrc.includes(x)));
}

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

// 打印一局全对的轨迹,便于人工核对
console.log('\n--- 全对一局轨迹 ---');
for (const line of perfect.trace) console.log('  ' + line);

console.log('\n--- 每档先错一题 的轨迹(验证不灭次数递减) ---');
for (const line of staged.trace) console.log('  ' + line);
console.log(`  合计: score=${staged.score} correct=${staged.correct} answered=${staged.answered} 结局=${staged.end}`);
