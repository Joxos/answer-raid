/**
 * 轻量 i18n:不依赖任何第三方库。
 *
 * 设计要点:
 * - 语言状态用 Svelte 5 runes 写成单例,`locale()` 在组件里是**响应式**的;
 *   任何读它的模板/派生值(含音频、HUD 文案)都会随语言切换自动重渲染。
 * - 组件里的静态文案统一用 `msg('key')`,插值用 `fmt('key', { n: 3 })`;
 *   需要多次插值的组合句用 `Msg` 保留成 `Message`,再交给 `t()` 渲染。
 * - 题库不走字典:每题自带 `zh` / `en` 两份文本,抽题时按当前语言取一份,
 *   因此渲染层完全不用感知语言(`cur.q.prompt` 拿到什么就画什么)。
 *
 * 语言优先级:`?lang=` 查询参数 > localStorage > 浏览器语言 > 默认中文。
 * 查询参数的存在是为了让自动化测试能确定性地锁定语言。
 */

export const LOCALES = ['zh', 'en'] as const;
export type Lang = (typeof LOCALES)[number];

export const LANG_LABEL: Record<Lang, string> = { zh: '中文', en: 'English' };
/** 语言切换按钮上显示的**目标**语言(点了之后会变成哪国语言)。 */
export const LANG_SWITCH_LABEL: Record<Lang, string> = { zh: 'EN', en: '中' };

const LANG_KEY = 'csa.raid.lang.v1';

function isLang(v: unknown): v is Lang {
  return typeof v === 'string' && (LOCALES as readonly string[]).includes(v);
}

/** 查询参数强制指定语言(测试与分享链接用)。 */
export function langFromQuery(): Lang | null {
  if (typeof window === 'undefined') return null;
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    return isLang(q) ? q : null;
  } catch {
    return null;
  }
}

function storedLang(): Lang | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const v = localStorage.getItem(LANG_KEY);
    if (!v) return null;
    // 兼容直接写入的裸字符串与 JSON 字符串两种形式
    const parsed: unknown = isLang(v) ? v : JSON.parse(v);
    return isLang(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function browserLang(): Lang | null {
  if (typeof navigator === 'undefined') return null;
  const langs = navigator.languages ?? [navigator.language];
  for (const l of langs) {
    if (!l) continue;
    const lower = l.toLowerCase();
    if (lower.startsWith('zh')) return 'zh';
    if (lower.startsWith('en')) return 'en';
  }
  return null;
}

/** 首次进入时决定语言。 */
export function initialLang(): Lang {
  return langFromQuery() ?? storedLang() ?? browserLang() ?? 'zh';
}

const state = $state<{ lang: Lang }>({ lang: initialLang() });

/** 当前语言(响应式)。 */
export function locale(): Lang {
  return state.lang;
}

export function isZh(): boolean {
  return state.lang === 'zh';
}

export function setLocale(lang: Lang): void {
  if (!isLang(lang) || state.lang === lang) return;
  state.lang = lang;
  if (typeof document !== 'undefined') document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  // 用户手动切过语言之后,把 URL 上的 ?lang= 摘掉。
  // 否则该参数优先级高于 localStorage,刷新一次又会跳回参数指定的语言,
  // 用户会觉得"我切了但没生效"。
  dropQueryParam('lang');
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(LANG_KEY, JSON.stringify(lang));
  } catch {
    /* 无痕模式:忽略 */
  }
}

/** 从地址栏移除某个查询参数(不动历史记录的其他部分)。 */
function dropQueryParam(key: string): void {
  if (typeof window === 'undefined' || typeof history === 'undefined') return;
  try {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(key)) return;
    url.searchParams.delete(key);
    history.replaceState(null, '', url.pathname + (url.search ? url.search : '') + url.hash);
  } catch {
    /* 忽略 */
  }
}

export function toggleLocale(): void {
  setLocale(state.lang === 'zh' ? 'en' : 'zh');
}

export function applyDocumentLang(): void {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
}

/** 可带插值的文案:直接给字符串,或给一个按参数求值的函数(每次渲染重新求值)。 */
export type Message = string | ((params: Record<string, unknown>) => string);

/** 把一个 `Message` 渲染成字符串。非 Message 的值原样返回,方便嵌套。 */
export function t(m: Message | null | undefined, params: Record<string, unknown> = {}): string {
  if (m == null) return '';
  return typeof m === 'function' ? m(params) : m;
}

/** 组合句:保留成 `Message`,供 `t()` 延迟插值。 */
export const Msg =
  (build: (p: Record<string, unknown>) => string): Message =>
  (p) =>
    build(p);

const nb = (v: unknown): string => Number(v).toLocaleString();

/* ------------------------------------------------------------------ */
/* 字典:所有静态 UI 文案集中在这里。英文缺失时回退到中文,不会渲染成 key。 */

const DICT: Record<Lang, Record<string, Message>> = {
  zh: {
    'q.hintPenalty': Msg((p) => `情报 ×${p.n}`),
    'q.diagram': '题目示意图',
    'org.chip': '计算机协会 · 百团大战',
    'org.bank': Msg((p) => `${p.n} 题库 · 随机抽题`),
    'intro.tagline': Msg((p) => `${p.tiers} 个难度 · 每档答对 ${p.rounds} 题晋级 · 答错扣不灭次数 · 通关 ${p.tier} 档才算封神`),
    'intro.tiers': '// 难度档位',
    'intro.nPerTier': Msg((p) => `${p.n} 题`),
    'intro.perQuestion': Msg((p) => `${p.s}s / 题`),
    'intro.lives': Msg((p) => `不灭 ×${p.n}`),
    'intro.randomNote': '每局随机抽题，同一题不会重复出现，选项顺序也会打乱。',
    'intro.handle': '// 特工代号',
    'intro.handlePh': '你的名字 / 昵称',
    'intro.start': '▶ 开始突袭',
    'intro.emptyHandle': '输入名字或昵称即可开始。',
    'intro.enterHint': '按 ENTER 直接开打',
    'intro.jokers': '// 装备 · 三个锦囊',
    'intro.jokersNote': Msg((p) => `整局只有 ${p.n} 次,按 1 2 3 或点击卡牌使用,用完不补。`),
    'intro.archive': '// 档案',
    'intro.best': '历史最高',
    'intro.tierOf': Msg((p) => `${p.tier} 档`),
    'intro.combo': Msg((p) => `连击 ×${p.n}`),
    'intro.cleared': '已通关',
    'intro.notCleared': '未通关',
    'intro.noRecord': '完成一局后，你的成绩会显示在这里。',
    'intro.footKeys': '键盘: A B C D 选项 · 1 2 3 锦囊 · ENTER 确认',

    'hud.anon': 'ANON',
    'hud.progressTip': '本档晋级进度',
    'hud.livesTip': '不灭次数:答错扣一次,归零出局',
    'hud.lives': '不灭',
    'hud.combo': '连击',
    'hud.comboRate': Msg((p) => `倍率 ${p.pct}%`),
    'hud.potTip': '本题答对可得分(随时间衰减)',
    'hud.pot': '本题',

    'joker.fifty': '逻辑切割',
    'joker.fifty.desc': '抹除两个错误选项',
    'joker.freeze': '时间冻结',
    'joker.freeze.desc': '本档恢复 15 秒',
    'joker.hint': '内线情报',
    'joker.hint.desc': '给出考点,本题得分 ×0.4',
    'joker.unavailable': '当前不可用',
    'joker.exhausted': '锦囊已耗尽',
    'joker.alreadyCut': '本题已使用过',
    'joker.alreadyHint': '本题已获得情报',

    'boot.line1': 'CSA-BIOS v3.7 · 计算机协会 · 百团大战特装版',
    'boot.line2': '检测 CPU ................................................. OK',
    'boot.line3': Msg((p) => `挂载题库 /dev/csa0 ............................ ${p.n} SECTORS`),
    'boot.line4': Msg((p) => `难度档位:${p.tiers}`),
    'boot.line5': '警告:本机对「想当然」零容忍。',
    'boot.ready': '系统就绪。按 任意键 载入答题终端 …',

    'fb.verdict.timesUp': 'TIMEOUT',
    'fb.verdict.granted': 'ACCESS GRANTED',
    'fb.verdict.denied': 'ACCESS DENIED',
    'fb.why': '// 原理',
    'fb.correctAnswer': '正解',
    'fb.livesLeft': Msg((p) => `不灭 −1 · 剩 ${p.n}`),
    'fb.chainHold': Msg((p) => `连击 ×${p.n} 保持中`),
    'fb.tierProgress': Msg((p) => `${p.tier} · 进度 ${p.n}/${p.total}`),

    'score.base': Msg(
      (p) =>
        `基础 ${p.base} × 时间 ${p.time}% × 连击 ${p.combo}%` +
        (p.penalty === 100 ? '' : ` × 情报 ${p.penalty}%`),
    ),
    'score.misjudge': '误判 · 连击清零',
    'score.timeout': 'TIMEOUT · 判定为未作答',

    'promote.cleared': Msg((p) => `LEVEL CLEAR · ${p.tier} 已攻破`),
    'promote.loading': Msg((p) => `载入下一档 … ${p.s}s`),
    'promote.meta': Msg((p) => `本档 ${p.n} 题 · 每题 ${p.s}s · 不灭 ×${p.lives}`),
    'promote.hd.1': '本档开始考「名词」与「为什么」:模型、框架、数据结构、网络协议。',
    'promote.hd.2': '答错只扣不灭次数,但别再靠排除法 —— 干扰项都是真实存在的误解。',
    'promote.hd.3': '拿不准就回想它在解决什么问题,而不是背它的名字。',
    'promote.in.1': '最终档:底层语义、安全原理与算法程序,直觉在这里通常是错的。',
    'promote.in.2': '不灭次数重置为 1 —— 错一题即出局,想清楚了再点。',
    'promote.in.3': '通过后你将被记录为「封神」候选。',

    'rank.SSS': '全程零失误通关 · 封神',
    'rank.SS': '通关 IN 档',
    'rank.S': '触及 IN 档',
    'rank.A': '打到 IN 档中段',
    'rank.B': 'HD 档站稳了',
    'rank.C': '过了 EZ 档',
    'rank.D': '先来协会补补课',

    'res.clear': Msg((p) => `${p.handle} 通关了全部 ${p.n} 个档位 —— **计算机协会**正式向你发出邀请。`),
    'res.lost': Msg((p) => `连接在 ${p.tier} 中断 —— 不灭次数归零。`),
    'res.log': '// 战斗日志',
    'res.accuracy': '正确率',
    'res.bestCombo': '最高连击',
    'res.reached': '抵达档位',
    'res.livesLeft': '剩余不灭',
    'res.jokersUsed': '锦囊消耗',
    'res.best': '历史最高',
    'res.perTier': '// 逐档战绩',
    'res.next': '// 下一步',
    'res.retry': '↻ 再来一局',
    'res.home': '⌂ 返回标题',
    'res.share': '↗ 分享战绩',
    'res.copied': '✓ 已复制战绩',
    'res.join': '// 加入我们',
    'res.scan': '扫码加入招新群',
    'res.qrAlt': '计算机协会招新群二维码',
    'res.club': '**计算机协会** · 百团大战',
    'res.activities': '算法集训 · 项目实战 · 硬件折腾 · 通宵黑客松',
    'res.shareText': Msg(
      (p) =>
        `我在【计算机协会·百团大战】ANSWER RAID 拿到 ${nb(p.score)} 分,` +
        `评级 ${p.rank}(${p.rankDesc}),答对 ${p.correct}/${p.answered},最高连击 ×${p.combo}。` +
        `你敢来试试吗?`,
    ),
    'res.shareTitle': 'ANSWER RAID · 计算机协会',

    'hint.tags': Msg((p) => `检测到考点【${p.tags}】,回到定义本身推一遍,别信直觉。`),
    'hint.source': Msg((p) => `检测到标签【${p.tags}】· 出处:${p.source}`),
    'hint.panel': '◈ 内线情报',

    'tier.ez.label': '轻松',
    'tier.ez.desc': '计算机常识 · 读题就能答',
    'tier.hd.label': '进阶',
    'tier.hd.desc': '基础概念 · 别信直觉',
    'tier.in.label': '深入',
    'tier.in.desc': '专业名词 · 平时关注技术圈才会',

    // 题目标签(`tag.<中文标签>`);中文下就是标签本身,登记出来是为了和英文一一对应
    'tag.补码': '补码',
    'tag.二进制': '二进制',
    'tag.排序': '排序',
    'tag.选择排序': '选择排序',
    'tag.Python': 'Python',
    'tag.range': 'range',
    'tag.整除': '整除',
    'tag.取余': '取余',
    'tag.循环': '循环',
    'tag.累加': '累加',
    'tag.大模型': '大模型',
    'tag.GPT': 'GPT',
    'tag.厂商': '厂商',
    'tag.API 计费': 'API 计费',
    'tag.Web': 'Web',
    'tag.前端框架': '前端框架',
    'tag.开源': '开源',
    'tag.Transformer': 'Transformer',
    'tag.注意力': '注意力',
    'tag.浮点数': '浮点数',
    'tag.IEEE754': 'IEEE754',
    'tag.计算理论': '计算理论',
    'tag.NP': 'NP',
    'tag.数据结构': '数据结构',
    'tag.哈希表': '哈希表',
    'tag.算法': '算法',
    'tag.双指针': '双指针',
    'tag.硬件': '硬件',
    'tag.常识': '常识',
    'tag.数据单位': '数据单位',
    'tag.输入输出': '输入输出',
    'tag.文件': '文件',
    'tag.扩展名': '扩展名',
    'tag.图片格式': '图片格式',
    'tag.压缩': '压缩',
    'tag.操作系统': '操作系统',
    'tag.故障处理': '故障处理',
    'tag.内存与硬盘': '内存与硬盘',
    'tag.云服务': '云服务',
    'tag.进程': '进程',
    'tag.万维网': '万维网',
    'tag.数据恢复': '数据恢复',
    'tag.URL': 'URL',
    'tag.IP 地址': 'IP 地址',
    'tag.病毒': '病毒',
    'tag.localhost': 'localhost',
    'tag.单位换算': '单位换算',
    'tag.密码': '密码',
    'tag.隐私': '隐私',
    'tag.HTTPS': 'HTTPS',
    'tag.SSD': 'SSD',
    'tag.液体': '液体',
    'tag.进制转换': '进制转换',
    'tag.防护': '防护',
    'tag.安全': '安全',
    'tag.网络': '网络',

    'lang.switch': '切换语言',
    'quit.btn': '退出本局',
    'quit.title': '退出本局?',
    'quit.body': '当前进度与得分都会丢弃,不会记入档案。',
    'quit.confirm': '☑ 确认退出',
    'quit.cancel': '↩ 继续答题',
    'quit.escHint': '按 ESC 也可以继续答题',
    'theme.switch': '切换主题',
    'theme.dark': '暗色(CRT)',
    'theme.light': '亮色(强光)',
    'sound.off': '静音',
    'sound.on': '开启音效',
    'sound.switch': '切换音效',
  },

  en: {
    'q.hintPenalty': Msg((p) => `Hint ×${p.n}`),
    'q.diagram': 'Question diagram',
    'org.chip': 'Computer Association · Club Fair',
    'org.bank': Msg((p) => `${p.n} questions · drawn at random`),
    'intro.tagline': Msg((p) => `${p.tiers} tiers · ${p.rounds} correct answers each · wrong answers cost lives · clear ${p.tier} to win`),
    'intro.tiers': '// DIFFICULTY TIERS',
    'intro.nPerTier': Msg((p) => `${p.n} questions`),
    'intro.perQuestion': Msg((p) => `${p.s}s each`),
    'intro.lives': Msg((p) => `lives ×${p.n}`),
    'intro.randomNote': 'Questions are drawn at random without repeats during a run. Answer options are shuffled.',
    'intro.handle': '// AGENT CALLSIGN',
    'intro.handlePh': 'your name / nickname',
    'intro.start': '▶ START RAID',
    'intro.emptyHandle': 'Enter a name or nickname to begin.',
    'intro.enterHint': 'Press ENTER to jump straight in',
    'intro.jokers': '// GEAR · THREE JOKERS',
    'intro.jokersNote': Msg((p) => `Only ${p.n} per run, press 1 2 3 or click a card — no refills.`),
    'intro.archive': '// ARCHIVE',
    'intro.best': 'Personal best',
    'intro.tierOf': Msg((p) => `${p.tier} tier`),
    'intro.combo': Msg((p) => `combo ×${p.n}`),
    'intro.cleared': 'Cleared',
    'intro.notCleared': 'Not cleared',
    'intro.noRecord': 'Complete a run to see your results here.',
    'intro.footKeys': 'Keys: A B C D options · 1 2 3 jokers · ENTER confirm',

    'hud.anon': 'ANON',
    'hud.progressTip': 'Progress in this tier',
    'hud.livesTip': 'Lives: one wrong answer costs one, zero ends the run',
    'hud.lives': 'LIVES',
    'hud.combo': 'COMBO',
    'hud.comboRate': Msg((p) => `multiplier ${p.pct}%`),
    'hud.potTip': 'Points if you answer now (decays with time)',
    'hud.pot': 'WORTH',

    'joker.fifty': 'Logic Cut',
    'joker.fifty.desc': 'Erase two wrong options',
    'joker.freeze': 'Time Freeze',
    'joker.freeze.desc': 'Restore 15s to this question',
    'joker.hint': 'Inside Info',
    'joker.hint.desc': 'Reveal the topic, score ×0.4',
    'joker.unavailable': 'Not available right now',
    'joker.exhausted': 'No jokers left',
    'joker.alreadyCut': 'Already used on this question',
    'joker.alreadyHint': 'Info already revealed',

    'boot.line1': 'CSA-BIOS v3.7 · Computer Association · Club Fair Edition',
    'boot.line2': 'CPU check ............................................... OK',
    'boot.line3': Msg((p) => `Mounting question bank /dev/csa0 ............... ${p.n} SECTORS`),
    'boot.line4': Msg((p) => `Difficulty tiers: ${p.tiers}`),
    'boot.line5': 'Warning: this machine has zero tolerance for "sounds about right".',
    'boot.ready': 'System ready. Press any key to load the raid terminal …',

    'fb.verdict.timesUp': 'TIMEOUT',
    'fb.verdict.granted': 'ACCESS GRANTED',
    'fb.verdict.denied': 'ACCESS DENIED',
    'fb.why': '// WHY',
    'fb.correctAnswer': 'ANSWER',
    'fb.livesLeft': Msg((p) => `Lives −1 · ${p.n} left`),
    'fb.chainHold': Msg((p) => `Combo ×${p.n} still alive`),
    'fb.tierProgress': Msg((p) => `${p.tier} · progress ${p.n}/${p.total}`),

    'score.base': Msg(
      (p) =>
        `base ${p.base} × time ${p.time}% × combo ${p.combo}%` +
        (p.penalty === 100 ? '' : ` × info ${p.penalty}%`),
    ),
    'score.misjudge': 'MISJUDGED · combo reset',
    'score.timeout': 'TIMEOUT · counted as unanswered',

    'promote.cleared': Msg((p) => `LEVEL CLEAR · ${p.tier} down`),
    'promote.loading': Msg((p) => `Loading next tier … ${p.s}s`),
    'promote.meta': Msg((p) => `${p.n} questions · ${p.s}s each · lives ×${p.lives}`),
    'promote.hd.1': 'This tier starts testing names and reasons: models, frameworks, data structures, protocols.',
    'promote.hd.2': 'A wrong answer only costs a life — but stop guessing by elimination: every distractor is a real misconception.',
    'promote.hd.3': 'If unsure, recall what it solves rather than what it is called.',
    'promote.in.1': 'Final tier: low-level semantics, security principles and algorithm programs. Instinct is usually wrong here.',
    'promote.in.2': 'Lives reset to 1 — one wrong answer ends the run, so think before you click.',
    'promote.in.3': 'Clear this and you are recorded as a candidate for godhood.',

    'rank.SSS': 'Flawless clear · ascended',
    'rank.SS': 'Cleared the IN tier',
    'rank.S': 'Reached the IN tier',
    'rank.A': 'Solid run inside IN',
    'rank.B': 'Held your ground in HD',
    'rank.C': 'Past the EZ tier',
    'rank.D': 'Come study with the club first',

    'res.clear': Msg((p) => `${p.handle} cleared all ${p.n} tiers — the **Computer Association** formally invites you.`),
    'res.lost': Msg((p) => `Connection lost at ${p.tier} — lives hit zero.`),
    'res.log': '// BATTLE LOG',
    'res.accuracy': 'Accuracy',
    'res.bestCombo': 'Best combo',
    'res.reached': 'Reached tier',
    'res.livesLeft': 'Lives left',
    'res.jokersUsed': 'Jokers used',
    'res.best': 'Personal best',
    'res.perTier': '// PER-TIER BREAKDOWN',
    'res.next': '// NEXT',
    'res.retry': '↻ Play again',
    'res.home': '⌂ Back to title',
    'res.share': '↗ Share result',
    'res.copied': '✓ Result copied',
    'res.join': '// JOIN US',
    'res.scan': 'Scan to join the club',
    'res.qrAlt': 'Computer Association recruit-group QR code',
    'res.club': '**Computer Association** · Club Fair',
    'res.activities': 'Algorithm training · real projects · hardware tinkering · all-night hackathons',
    'res.shareText': Msg(
      (p) =>
        `I scored ${nb(p.score)} on ANSWER RAID [Computer Association · Club Fair], ` +
        `rank ${p.rank} (${p.rankDesc}), ${p.correct}/${p.answered} correct, best combo ×${p.combo}. ` +
        `Think you can beat it?`,
    ),
    'res.shareTitle': 'ANSWER RAID · Computer Association',

    'hint.tags': Msg((p) => `Topics detected [${p.tags}] — go back to the definitions, don't trust instinct.`),
    'hint.source': Msg((p) => `Tags [${p.tags}] · source: ${p.source}`),
    'hint.panel': '◈ INSIDE INFO',

    'tier.ez.label': 'EZ',
    'tier.ez.desc': 'Everyday basics — read and answer',
    'tier.hd.label': 'HD',
    'tier.hd.desc': 'Core concepts — instinct misleads',
    'tier.in.label': 'IN',
    'tier.in.desc': 'Specialist terms — follow the field',

    'tag.补码': "two's complement",
    'tag.二进制': 'binary',
    'tag.排序': 'sorting',
    'tag.选择排序': 'selection sort',
    'tag.Python': 'Python',
    'tag.range': 'range',
    'tag.整除': 'integer division',
    'tag.取余': 'modulo',
    'tag.循环': 'loops',
    'tag.累加': 'accumulation',
    'tag.大模型': 'LLMs',
    'tag.GPT': 'GPT',
    'tag.厂商': 'vendors',
    'tag.API 计费': 'API pricing',
    'tag.Web': 'Web',
    'tag.前端框架': 'frontend frameworks',
    'tag.开源': 'open source',
    'tag.Transformer': 'Transformer',
    'tag.注意力': 'attention',
    'tag.浮点数': 'floating point',
    'tag.IEEE754': 'IEEE 754',
    'tag.计算理论': 'theory of computation',
    'tag.NP': 'NP',
    'tag.数据结构': 'data structures',
    'tag.哈希表': 'hash tables',
    'tag.算法': 'algorithms',
    'tag.双指针': 'two pointers',
    'tag.硬件': 'hardware',
    'tag.常识': 'basics',
    'tag.数据单位': 'data units',
    'tag.输入输出': 'I/O devices',
    'tag.文件': 'files',
    'tag.扩展名': 'file extensions',
    'tag.图片格式': 'image formats',
    'tag.压缩': 'compression',
    'tag.操作系统': 'operating systems',
    'tag.故障处理': 'troubleshooting',
    'tag.内存与硬盘': 'RAM vs. disk',
    'tag.云服务': 'cloud services',
    'tag.进程': 'processes',
    'tag.万维网': 'the Web',
    'tag.数据恢复': 'data recovery',
    'tag.URL': 'URLs',
    'tag.IP 地址': 'IP addresses',
    'tag.病毒': 'malware',
    'tag.localhost': 'localhost',
    'tag.单位换算': 'unit conversion',
    'tag.密码': 'passwords',
    'tag.隐私': 'privacy',
    'tag.HTTPS': 'HTTPS',
    'tag.SSD': 'SSDs',
    'tag.液体': 'liquids',
    'tag.进制转换': 'number bases',
    'tag.防护': 'protection',
    'tag.安全': 'security',
    'tag.网络': 'networking',

    'lang.switch': 'Switch language',
    'quit.btn': 'Quit run',
    'quit.title': 'Quit this run?',
    'quit.body': 'Current progress and score will be discarded and not saved.',
    'quit.confirm': '☑ Quit',
    'quit.cancel': '↩ Keep playing',
    'quit.escHint': 'Press ESC to keep playing',
    'theme.switch': 'Switch theme',
    'theme.dark': 'Dark (CRT)',
    'theme.light': 'Light (bright light)',
    'sound.off': 'Mute',
    'sound.on': 'Unmute',
    'sound.switch': 'Toggle sound',
  },
};

/** 取文案。缺失的 key 回退到中文,再缺失就原样返回 key(方便排查)。 */
export function msg(key: string): Message {
  return DICT[state.lang][key] ?? DICT.zh[key] ?? key;
}

/** 取文案并立即插值。 */
export function fmt(key: string, params: Record<string, unknown> = {}): string {
  return t(msg(key), params);
}

/**
 * 题目标签(如「补码」「大模型」)的本地化。
 * tags 本身是**数据**(写死在题目里的中文键),展示时统一走字典的 `tag.*` 命名空间。
 *
 * 缺条目时回退成 key 本身 —— 也就是原样的中文。**刻意不加 `!` 之类的标记**:
 * `Python` / `Transformer` / `Web` / `GPT` / `NP` 这些标签的正确中英形式本来就一样,
 * 判定"是否翻译过"不能靠"值等不等于 key",否则会把这些标签污名化成 `Python!`。
 * 漏译由 `pnpm test:bank` 检查(它比对的是 **zh 与 en 两份取值是否雷同**)。
 */
export function tagLabel(tag: string): string {
  return fmt(`tag.${tag}`);
}

/** 按当前语言把一组候选拼成 A / B · C 这种列表。 */
export function joinList(items: readonly string[], sep = ' · '): string {
  return items.filter(Boolean).join(sep);
}
