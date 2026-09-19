/**
 * 答题引擎。使用 Svelte 5 runes($state/$derived)写成 .svelte.ts 模块,
 * 所有组件共享同一个单例 store。
 *
 * 规则:三档递进(EZ → HD → IN),每档答对 ROUNDS_PER_TIER 题晋级。
 * 答错扣「不灭次数」,归零即出局;随机抽题并打乱选项。
 */

import type { TierId } from './data/types';
import { ROUNDS_PER_TIER } from './data/types';
import { TIERS, tierMeta } from './data/tiers';
import {
  drawQuestion,
  hintFor,
  localizedQuestion,
  answerIndexOf,
  ALL_QUESTIONS_SOURCE,
  type DrawnQuestion,
} from './data/questions';
import { fmt, msg, t } from './i18n.svelte.ts';
import * as sound from './audio';
import { loadSoundPref, pushHistory, saveBest, saveHandle, saveSoundPref } from './storage';

export type Phase = 'boot' | 'intro' | 'playing' | 'feedback' | 'promote' | 'over' | 'confirm-quit';

export type JokerId = 'fifty' | 'freeze' | 'hint';

export interface JokerDef {
  id: JokerId;
  name: string;
  glyph: string;
  desc: string;
  hotkey: string;
}

/**
 * 锦囊的**展示文案**按当前语言生成 —— 做成函数而不是常量,
 * 语言切换时模板会重新求值;`id` 与键位与语言无关,不会打断作答状态。
 */
export function jokers(): JokerDef[] {
  return [
    { id: 'fifty', glyph: '⧗', hotkey: '1', name: fmt('joker.fifty'), desc: fmt('joker.fifty.desc') },
    { id: 'freeze', glyph: '❄', hotkey: '2', name: fmt('joker.freeze'), desc: fmt('joker.freeze.desc') },
    { id: 'hint', glyph: '◈', hotkey: '3', name: fmt('joker.hint'), desc: fmt('joker.hint.desc') },
  ];
}

export const JOKERS_PER_RUN = 3;
const FREEZE_SECONDS = 15;
const HINT_PENALTY = 0.4;
const FEEDBACK_MS = 2400;
const PROMOTE_MS = 3400;
/** 每题得分里的时间奖励权重:答得越快乘得越高,最低 1.0。 */
const TIME_BONUS_WEIGHT = 0.5;

interface State {
  phase: Phase;
  handle: string;
  tierIndex: number;
  tierProgress: number;
  lives: number;
  score: number;
  chain: number;
  bestChain: number;
  correct: number;
  answered: number;
  jokersLeft: number;
  jokersUsed: JokerId[];
  current: DrawnQuestion | null;
  picked: number | null;
  isCorrect: boolean | null;
  timeLeft: number;
  timeLimit: number;
  timeSpent: number;
  lastGain: number;
  lastBreakdown: string;
  eliminated: number[];
  penalty: number;
  hint: string | null;
  timesUp: boolean;
  cleared: boolean;
  finalTierIndex: number;
  seed: number;
  usedIds: string[];
  newBest: boolean;
  /** 退出确认弹窗弹出前的阶段,取消时回到这里。 */
  resumeAfterQuit: Phase;
}

/** 开机自检台词,按当前语言生成(切语言时开场动画会跟着变)。 */
export function bootLines(): string[] {
  return ['boot.line1', 'boot.line2', 'boot.line3', 'boot.line4', 'boot.line5'].map((k) =>
    fmt(k, { n: ALL_QUESTIONS_SOURCE.length, tiers: TIERS.map((t) => t.name).join(' / ') }),
  );
}

function freshGame(): State {
  return {
    phase: 'boot',
    handle: '',
    tierIndex: 0,
    tierProgress: 0,
    lives: TIERS[0].allowMiss,
    score: 0,
    chain: 0,
    bestChain: 0,
    correct: 0,
    answered: 0,
    jokersLeft: JOKERS_PER_RUN,
    jokersUsed: [],
    current: null,
    picked: null,
    isCorrect: null,
    timeLeft: TIERS[0].timeLimit,
    timeLimit: TIERS[0].timeLimit,
    timeSpent: 0,
    lastGain: 0,
    lastBreakdown: '',
    eliminated: [],
    penalty: 1,
    hint: null,
    timesUp: false,
    cleared: false,
    finalTierIndex: 0,
    seed: Math.floor(Math.random() * 1e9),
    usedIds: [],
    newBest: false,
    resumeAfterQuit: 'playing',
  };
}

export const game = $state<State>(freshGame());

let timer: ReturnType<typeof setInterval> | null = null;
let advanceTimer: ReturnType<typeof setTimeout> | null = null;
let advanceAction: (() => void) | null = null;
let advanceDeadline = 0;
let advanceRemaining = 0;
let tickCounter = 0;

export const tier = () => tierMeta(TIERS[game.tierIndex].id);

/**
 * **当前这道题,按当前语言即时求值。**
 *
 * 这是"切语言后题干/选项立刻跟着变"的关键:`game.current` 只存双语源码与选项顺序,
 * 文本在渲染时才摊平,所以中途切换语言会立刻反映到当前这道题上。
 * ——早期版本在抽题时就把文本冻结成单语,切语言只换界面、题目本身不变。
 */
export function currentQuestion() {
  return game.current ? localizedQuestion(game.current) : null;
}

/** 当前题的正确项在**展示顺序**中的下标(与语言无关)。 */
export function currentAnswerIndex(): number {
  return game.current ? answerIndexOf(game.current) : -1;
}

/** Localize already-visible hints and feedback when the player changes language. */
export function currentHint(): string | null {
  const question = currentQuestion();
  return game.hint !== null && question ? hintFor(question) : null;
}

export function feedbackBreakdown(): string {
  if (game.isCorrect === null) return '';
  if (!game.isCorrect) return fmt(game.timesUp ? 'score.timeout' : 'score.misjudge');
  return fmt('score.base', {
    base: tier().baseScore,
    time: Math.round(timeFactor() * 100),
    combo: Math.round(comboFactor() * 100),
    penalty: Math.round(game.penalty * 100),
  });
}

/**
 * 下面这些派生的数值都以「函数返回值」的形式导出 ——
 * Svelte 5 不允许从模块里直接导出 $derived,导出访问器是官方推荐写法。
 */

/** 当前档位的时间奖励系数,随剩余时间线性衰减。 */
export function timeFactor(): number {
  return 1 + TIME_BONUS_WEIGHT * (game.timeLimit > 0 ? game.timeLeft / game.timeLimit : 0);
}

/** 当前连击倍率:每连对 +0.1,封顶 ×2.0。 */
export function comboFactor(chain = game.chain): number {
  return Math.min(2, 1 + 0.1 * Math.max(0, chain - 1));
}

/** 本题若答对能拿多少分(实时预览,让玩家看着倒计时掉分)。 */
export function livePotential(): number {
  return Math.round(tier().baseScore * timeFactor() * comboFactor(game.chain + 1) * game.penalty);
}

export function accuracy(): number {
  return game.answered === 0 ? 0 : game.correct / game.answered;
}

export function rank(): { t: string; d: string } {
  const s = game.score;
  const reachedIn = game.finalTierIndex >= 2 || game.tierIndex >= 2;
  if (game.cleared && game.correct === game.answered && game.correct >= TIERS.length * ROUNDS_PER_TIER) return { t: 'SSS', d: fmt('rank.SSS') };
  if (game.cleared) return { t: 'SS', d: fmt('rank.SS') };
  if (reachedIn) return { t: 'S', d: fmt('rank.S') };
  if (s >= 3500) return { t: 'A', d: fmt('rank.A') };
  if (s >= 1800) return { t: 'B', d: fmt('rank.B') };
  if (s >= 600) return { t: 'C', d: fmt('rank.C') };
  return { t: 'D', d: fmt('rank.D') };
}

function clearTimers(): void {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  if (advanceTimer) {
    clearTimeout(advanceTimer);
    advanceTimer = null;
  }
  advanceAction = null;
  advanceRemaining = 0;
}

/** Preserve the remaining feedback time while the quit dialog is open. */
function scheduleAdvance(action: () => void, delay: number): void {
  if (advanceTimer) clearTimeout(advanceTimer);
  advanceAction = action;
  advanceRemaining = delay;
  advanceDeadline = Date.now() + delay;
  advanceTimer = setTimeout(() => {
    advanceTimer = null;
    advanceAction = null;
    advanceRemaining = 0;
    action();
  }, delay);
}

/** 启动 100ms 心跳倒计时。 */
function startTimer(): void {
  if (timer) clearInterval(timer);
  tickCounter = 0;
  timer = setInterval(() => {
    if (game.phase !== 'playing') return;
    game.timeLeft = Math.max(0, +(game.timeLeft - 0.1).toFixed(1));
    tickCounter += 1;
    if (tickCounter % 10 === 0 && game.timeLeft <= 5 && game.timeLeft > 0) sound.sfx('tick');
    if (game.timeLeft <= 0) {
      game.timesUp = true;
      reveal(-1, true);
    }
  }, 100);
}

function nextQuestion(): void {
  const d = drawQuestion(TIERS[game.tierIndex].id as TierId, game.usedIds);
  if (!d) {
    finishRun(false);
    return;
  }
  game.usedIds = [...game.usedIds, d.source.id];
  game.current = d;
  game.picked = null;
  game.isCorrect = null;
  game.eliminated = [];
  game.hint = null;
  game.penalty = 1;
  game.timesUp = false;
  game.lastGain = 0;
  game.lastBreakdown = '';
  game.timeLimit = tier().timeLimit;
  game.timeLeft = tier().timeLimit;
  game.timeSpent = 0;
  game.phase = 'playing';
  startTimer();
}

export function boot(): void {
  if (game.phase === 'boot') game.phase = 'intro';
}

export function startRun(handle: string): void {
  clearTimers();
  const clean = handle.trim().slice(0, 14) || 'ANON';
  game.handle = clean;
  saveHandle(clean);
  game.tierIndex = 0;
  game.tierProgress = 0;
  game.lives = TIERS[0].allowMiss;
  game.score = 0;
  game.chain = 0;
  game.bestChain = 0;
  game.correct = 0;
  game.answered = 0;
  game.jokersLeft = JOKERS_PER_RUN;
  game.jokersUsed = [];
  game.cleared = false;
  game.finalTierIndex = 0;
  game.seed = Math.floor(Math.random() * 1e9);
  game.usedIds = [];
  game.newBest = false;
  sound.startAmbient();
  nextQuestion();
}

/** 提交作答。`index` 为 -1 表示超时。 */
export function answer(index: number): void {
  if (game.phase !== 'playing' || !game.current) return;
  reveal(index, false);
}
function reveal(index: number, timesUp: boolean): void {
  const cur = game.current;
  if (!cur) return;
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  const correct = !timesUp && index === currentAnswerIndex();
  game.picked = index;
  game.isCorrect = correct;
  game.timesUp = timesUp;
  game.answered += 1;
  game.finalTierIndex = Math.max(game.finalTierIndex, game.tierIndex);

  if (correct) {
    const gain = livePotential();
    game.score += gain;
    game.lastGain = gain;
    game.chain += 1;
    game.bestChain = Math.max(game.bestChain, game.chain);
    game.correct += 1;
    game.tierProgress += 1;
    const comp = Math.round(timeFactor() * 100);
    const comb = Math.round(comboFactor() * 100);
    game.lastBreakdown = t(msg('score.base'), {
      base: tier().baseScore,
      time: comp,
      combo: comb,
      penalty: Math.round(game.penalty * 100),
    });
    sound.sfx('correct');
  } else {
    game.chain = 0;
    game.lives -= 1;
    game.lastGain = 0;
    game.lastBreakdown = fmt(timesUp ? 'score.timeout' : 'score.misjudge');
    sound.sfx(timesUp ? 'glitch' : 'wrong');
  }
  game.phase = 'feedback';

  const needPromote = correct && game.tierProgress >= ROUNDS_PER_TIER;
  scheduleAdvance(() => {
    if (game.lives <= 0) {
      finishRun(false);
      return;
    }
    if (needPromote) promote();
    else nextQuestion();
  }, FEEDBACK_MS);
}

function promote(): void {
  if (game.tierIndex >= TIERS.length - 1) {
    // 最后一档答满规定题数:通关。
    finishRun(true);
    return;
  }
  game.tierIndex += 1;
  game.tierProgress = 0;
  game.lives = tier().allowMiss;
  game.penalty = 1;
  game.hint = null;
  game.eliminated = [];
  game.phase = 'promote';
  sound.sfx('promote');
  scheduleAdvance(() => nextQuestion(), PROMOTE_MS);
}

function finishRun(cleared: boolean): void {
  clearTimers();
  game.cleared = cleared;
  game.finalTierIndex = Math.max(game.finalTierIndex, game.tierIndex);
  const rec = {
    handle: game.handle,
    score: game.score,
    tier: TIERS[game.finalTierIndex].id as TierId,
    cleared,
    accuracy: accuracy(),
    combo: game.bestChain,
    answered: game.answered,
    at: Date.now(),
  };
  game.newBest = saveBest(rec);
  pushHistory(rec);
  game.phase = 'over';
  sound.stopAmbient();
  sound.sfx(cleared ? 'victory' : 'gameover');
}

/** 重开一局。 */
export function retry(): void {
  startRun(game.handle || 'ANON');
}

/**
 * 中途退出。
 * 不直接回标题,而是弹一个确认框 —— 现场是触屏 + 站着操作,误触代价不小。
 * 弹窗期间**倒计时暂停**(心跳只认 playing),取消时回到原来的阶段。
 */
export function requestQuit(): void {
  if (game.phase !== 'playing' && game.phase !== 'feedback') return;
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  if (advanceTimer) {
    advanceRemaining = Math.max(0, advanceDeadline - Date.now());
    clearTimeout(advanceTimer);
    advanceTimer = null;
  }
  game.resumeAfterQuit = game.phase;
  game.phase = 'confirm-quit';
}

/** 取消退出,回到刚才的阶段。 */
export function cancelQuit(): void {
  if (game.phase !== 'confirm-quit') return;
  game.phase = game.resumeAfterQuit === 'feedback' ? 'feedback' : 'playing';
  // 恢复答题倒计时或尚未结束的判定展示时间。
  if (game.phase === 'playing') startTimer();
  else if (advanceAction) scheduleAdvance(advanceAction, advanceRemaining);
}

/** 确认退出:丢弃本局进度,回到标题页。 */
export function confirmQuit(): void {
  if (game.phase !== 'confirm-quit') return;
  toIntro();
}

/** 回到标题。 */
export function toIntro(): void {
  clearTimers();
  sound.stopAmbient();
  const handle = game.handle;
  const s = freshGame();
  Object.assign(game, s);
  game.handle = handle;
  game.phase = 'intro';
}

export function canUseJoker(id: JokerId): boolean {
  // 退出确认弹窗期间一律禁用,避免"弹窗还开着却把锦囊用掉了"
  if (game.phase !== 'playing' || game.jokersLeft <= 0) return false;
  if (!game.current) return false;
  if (id === 'fifty') return game.eliminated.length === 0;
  if (id === 'freeze') return true;
  if (id === 'hint') return game.hint === null && game.penalty >= 1;
  return false;
}

export function useJoker(id: JokerId): void {
  if (!canUseJoker(id)) return;
  const cur = game.current;
  if (!cur) return;
  game.jokersLeft -= 1;
  game.jokersUsed = [...game.jokersUsed, id];

  if (id === 'fifty') {
    const correct = currentAnswerIndex();
    const count = localizedQuestion(cur).options.length;
    const wrong = Array.from({ length: count }, (_, i) => i).filter((i) => i !== correct);
    const kill = wrong.sort(() => Math.random() - 0.5).slice(0, Math.min(2, wrong.length));
    game.eliminated = kill;
    sound.sfx('power');
  } else if (id === 'freeze') {
    game.timeLeft = Math.min(game.timeLimit, +(game.timeLeft + FREEZE_SECONDS).toFixed(1));
    sound.sfx('power');
  } else {
    game.hint = hintFor(localizedQuestion(cur));
    game.penalty = HINT_PENALTY;
    sound.sfx('blip');
  }
}

const KEY_TO_JOKER: Record<string, JokerId> = {
  '1': 'fifty',
  '2': 'freeze',
  '3': 'hint',
};

export function jokerByKey(key: string): JokerId | null {
  return KEY_TO_JOKER[key] ?? null;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/** 键盘快捷作答:A/B/C/D 选择对应选项。返回是否消费了该按键。 */
export function answerByKey(key: string): boolean {
  if (game.phase !== 'playing' || !game.current) return false;
  const i = LETTERS.indexOf(key.toUpperCase());
  const count = game.current ? localizedQuestion(game.current).options.length : 0;
  if (i < 0 || i >= count) return false;
  if (game.eliminated.includes(i)) return true;
  answer(i);
  return true;
}

/**
 * 声音开关的**响应式**镜像。
 *
 * `audio.ts` 是普通模块,它的 `enabled` 是个普通变量 —— Svelte 追踪不到它。
 * 如果模板直接写 `soundOn()`,`toggleSound()` 改了值界面却不会重渲染:
 * 按钮看上去「点不动」(状态与 localStorage 其实都变了)。
 * 所以这里用 $state 同步一份,让图标能随开关变化。
 */
let soundState = $state({ on: sound.isSoundEnabled() });

export function soundOn(): boolean {
  return soundState.on;
}

let audioInited = false;
let audioUnlockArmed = false;

/**
 * 初始化音频:**只读取静音偏好**,不在这里创建 AudioContext。
 * 上下文必须等到真正的用户手势里再建(浏览器自动播放策略),
 * 否则会得到一个永远 suspended 的上下文 —— 底噪按钮亮着却没有任何声音。
 * 这里挂一个一次性的手势监听,由 `unlockAudio()` 完成创建与 resume。
 */
export function initAudio(): void {
  if (!audioInited) {
    audioInited = true;
    // 每次调用都重读偏好会覆盖用户刚点的静音,所以只在首次读一次
    sound.setSoundEnabled(loadSoundPref());
    soundState.on = sound.isSoundEnabled();
  }
  if (typeof window === 'undefined' || audioUnlockArmed) return;
  audioUnlockArmed = true;
  const unlock = (): void => {
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
    sound.unlockAudio();
  };
  window.addEventListener('pointerdown', unlock, { once: true });
  window.addEventListener('keydown', unlock, { once: true });
}

export function toggleSound(): void {
  const next = !sound.isSoundEnabled();
  sound.setSoundEnabled(next);
  soundState.on = next;
  saveSoundPref(next);
  if (next && game.phase === 'playing') sound.startAmbient();
}
