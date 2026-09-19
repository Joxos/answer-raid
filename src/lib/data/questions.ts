import type { LocalizedQuestion, Question, TierId } from './types';
import { localizeQuestion } from './types';
import { locale, t, msg, fmt, tagLabel, type Lang } from '../i18n.svelte.ts';
import { noviceQuestions } from './questions/novice';
import { systemsQuestions } from './questions/systems';
import { acmQuestions } from './questions/acm';
import { faqQuestions } from './questions/faq';
import { documentQuestions } from './questions/document';

/** 全部题目(双语)。文件的划分只是"编写时的归类",难度档位由每题自己的 `tier` 决定。 */
const ALL_SOURCE: LocalizedQuestion[] = [
  ...noviceQuestions,
  ...systemsQuestions,
  ...acmQuestions,
  ...faqQuestions,
  ...documentQuestions,
];

/**
 * 按 `tier` 字段分档。
 * 刻意**从数据推导**而不是手写映射:改一道题的档位只需要动它自己的 `tier`,
 * 这里不会漏同步(手写映射曾经就把整档搞空过)。
 */
const BANK_SIZE: Record<TierId, LocalizedQuestion[]> = { ez: [], hd: [], in: [] };
for (const q of ALL_SOURCE) BANK_SIZE[q.tier].push(q);

export const BANK_SOURCE: Record<TierId, LocalizedQuestion[]> = BANK_SIZE;

/** 全部题目(供校验与统计)。 */
export const ALL_QUESTIONS_SOURCE = ALL_SOURCE;

/** 取某一档位、某一语言的题库。 */
export function bankFor(tier: TierId, lang: Lang): Question[] {
  return (BANK_SOURCE[tier] ?? []).map((q) => localizeQuestion(q, lang));
}

/**
 * 一次「抽题」的结果。
 *
 * 关键设计:`source` 与 `optionOrder` 都**不带语言**,语言相关的文本一律通过
 * `localizedQuestion()` 即时求值 —— 这样**中途切换语言时,连当前这道题也会立刻跟着变**。
 * (早期版本在抽题时就把文本摊平并冻结,导致切语言只换了界面、题目本身不变。)
 */
export interface DrawnQuestion {
  /** 双语题源,保留两份文本。 */
  source: LocalizedQuestion;
  /** 展示用的选项顺序(下标数组),与语言无关。 */
  optionOrder: number[];
  /** 抽题时的语言,仅用于调试。 */
  drawnLang: Lang;
}

/** 把一道抽好的题按**当前语言**摊平。纯函数,可随 locale 变化反复求值。 */
export function localizedQuestion(d: DrawnQuestion, lang: Lang = locale()): Question {
  const q = localizeQuestion(d.source, lang);
  return { ...q, options: d.optionOrder.map((i) => q.options[i]) };
}

/** 抽好的题里,正确项在**展示顺序**中的下标。 */
export function answerIndexOf(d: DrawnQuestion): number {
  return d.optionOrder.indexOf(d.source.answer);
}

export function shuffle<T>(input: readonly T[]): T[] {
  const out = input.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

/**
 * 抽一道该档位还没在本局出现过的题,并把选项顺序打乱。
 * 题目耗尽时从该档位重新洗牌(保持可无限重玩),但会尽量避开最近用过的。
 */
export function drawQuestion(
  tier: TierId,
  usedIds: readonly string[],
): DrawnQuestion | null {
  const pool = BANK_SOURCE[tier] ?? [];
  if (pool.length === 0) return null;

  const used = new Set(usedIds);
  let candidates = pool.filter((q) => !used.has(q.id));

  if (candidates.length === 0) {
    // 全部答过:只避开当前这一档最近用过的那一道,保证还有新鲜感。
    const recent = usedIds[usedIds.length - 1];
    candidates = pool.filter((q) => q.id !== recent);
    if (candidates.length === 0) candidates = pool.slice();
  }

  const source = candidates[Math.floor(Math.random() * candidates.length)];
  // 选项条数两语一致,所以顺序可以一次定好、两种语言共用
  const optionOrder = shuffle(source.zh.options.map((_, i) => i));

  return { source, optionOrder, drawnLang: locale() };
}

/** 提供给「内线情报」锦囊的一句话提示:优先用可公开的出处,否则用考点。 */
export function hintFor(q: Question): string {
  const tags = q.tags.map(tagLabel).join(' / ');
  if (q.source) return t(msg('hint.source'), { tags, source: q.source });
  return fmt('hint.tags', { tags });
}
