/** 题目与难度档位的公共类型。 */

import type { Lang } from '../i18n.svelte.ts';

export type TierId = 'ez' | 'hd' | 'in';

/** `none` 表示纯文本题;`svg` 时 chartData 是完整 <svg> 源码;`ascii` 时是等宽字符画。 */
export type ChartKind = 'none' | 'svg' | 'ascii';

/** 需要翻译的那部分文本(题面 / 选项 / 讲解)。 */
export interface QuestionText {
  prompt: string;
  options: string[];
  explain: string;
  /** 内线情报里展示的出处,可选。 */
  source?: string;
}

/** 题目的结构信息(code / 图表 / 答案下标)与语言无关,只有文本按语言各存一份。 */
export interface LocalizedQuestion {
  id: string;
  /** Stable section/question reference in the supplied source bank. */
  sourceRef?: string;
  tier: TierId;
  tags: string[];
  code?: string;
  lang?: string;
  chartKind?: ChartKind;
  chartData?: string;
  /** 正确选项在 options 中的下标,两种语言必须一致。 */
  answer: number;
  zh: QuestionText;
  en: QuestionText;
}

/** 抽题后交给渲染层的题目:文本已经按当前语言摊平。 */
export interface Question extends QuestionText {
  id: string;
  tier: TierId;
  tags: string[];
  /** 支持 **粗体**、`行内代码`、\n 换行。 */
  prompt: string;
  code?: string;
  lang?: string;
  chartKind?: ChartKind;
  chartData?: string;
  options: string[];
  /** 正确选项在 options 中的下标。 */
  answer: number;
  /** 60~160 字,讲清原理与最诱人的干扰项错在哪。 */
  explain: string;
  source?: string;
}

/** 题库格式说明:每题必须同时提供 zh 与 en,选项数量相同、answer 下标共享。 */
export type LangPack = Record<Lang, QuestionText>;

/** 把双语题目按当前语言摊平成渲染用的 `Question`。 */
export function localizeQuestion(q: LocalizedQuestion, lang: Lang): Question {
  const text = q[lang];
  return {
    id: q.id,
    tier: q.tier,
    tags: q.tags,
    prompt: text.prompt,
    options: text.options,
    explain: text.explain,
    answer: q.answer,
    ...(q.code !== undefined ? { code: q.code } : {}),
    ...(q.lang !== undefined ? { lang: q.lang } : {}),
    ...(q.chartKind !== undefined ? { chartKind: q.chartKind } : {}),
    ...(q.chartData !== undefined ? { chartData: q.chartData } : {}),
    ...(text.source !== undefined ? { source: text.source } : {}),
  };
}

export interface TierMeta {
  id: TierId;
  /** 档位序号,0 起。 */
  index: number;
  /** 档位代号本身(EZ / HD / …),中英文界面通用 —— 不翻译。 */
  name: string;
  /** 主题色(HSL 色相统一由 CSS 变量接管,这里只给色相值)。 */
  hue: number;
  accent: string;
  icon: string;
  /** 不灭次数(该档位可承受的答错次数)。 */
  allowMiss: number;
  /** 每题限时(秒)。 */
  timeLimit: number;
  /** 基础分。 */
  baseScore: number;
}

/** 每个档位需答对的题数,答满即晋级。 */
export const ROUNDS_PER_TIER = 6;
