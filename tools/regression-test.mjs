import assert from 'node:assert/strict';

// Deterministic clock: exercise the real store without waiting through whole runs.
let now = 0;
let nextId = 1;
const jobs = new Map();
Date.now = () => now;
globalThis.setTimeout = (fn, delay = 0) => {
  const id = nextId++;
  jobs.set(id, { fn, at: now + delay });
  return id;
};
globalThis.clearTimeout = (id) => jobs.delete(id);
globalThis.setInterval = (fn, delay) => {
  const id = nextId++;
  jobs.set(id, { fn, at: now + delay, interval: delay });
  return id;
};
globalThis.clearInterval = (id) => jobs.delete(id);
function advance(ms) {
  const end = now + ms;
  while (true) {
    const next = [...jobs.entries()].filter(([, job]) => job.at <= end)
      .sort((a, b) => a[1].at - b[1].at)[0];
    if (!next) break;
    const [id, job] = next;
    now = job.at;
    if (job.interval) job.at += job.interval;
    else jobs.delete(id);
    job.fn();
  }
  now = end;
}

const q = await import('../src/lib/quiz.svelte.ts');
const { setLocale, fmt } = await import('../src/lib/i18n.svelte.ts');
const { TIERS } = await import('../src/lib/data/tiers.ts');
const { ROUNDS_PER_TIER } = await import('../src/lib/data/types.ts');
const { ALL_QUESTIONS_SOURCE } = await import('../src/lib/data/questions.ts');

for (const lang of ['zh', 'en']) {
  setLocale(lang);
  assert.ok(fmt('org.bank', { n: ALL_QUESTIONS_SOURCE.length }).includes(String(ALL_QUESTIONS_SOURCE.length)));
  assert.ok(q.bootLines()[2].includes(String(ALL_QUESTIONS_SOURCE.length)));
  assert.ok(q.bootLines()[3].includes(TIERS.map((t) => t.name).join(' / ')));
  q.startRun('regression');
  let expectedTotal = 0;
  for (let n = 1; n <= TIERS.length * ROUNDS_PER_TIER; n++) {
    const base = TIERS[Math.floor((n - 1) / ROUNDS_PER_TIER)].baseScore;
    const multiplier = Math.min(2, 1 + 0.1 * (n - 1));
    const expected = Math.round(base * 1.5 * multiplier);
    assert.equal(q.livePotential(), expected, `preview for answer ${n}`);
    q.answer(q.currentAnswerIndex());
    expectedTotal += expected;
    assert.equal(q.game.lastGain, expected, `award for answer ${n}`);
    assert.ok(q.game.lastBreakdown.includes(`${Math.round(multiplier * 100)}%`));
    advance(2400);
    if (q.game.phase === 'promote') advance(3400);
  }
  assert.equal(q.game.score, expectedTotal);
  assert.equal(q.game.score, 10185);
  assert.equal(q.rank().t, 'SSS');
  q.toIntro();

  q.startRun('one mistake');
  q.answer((q.currentAnswerIndex() + 1) % 4);
  advance(2400);
  for (let n = 0; n < TIERS.length * ROUNDS_PER_TIER; n++) {
    q.answer(q.currentAnswerIndex());
    advance(2400);
    if (q.game.phase === 'promote') advance(3400);
  }
  assert.equal(q.game.cleared, true);
  assert.equal(q.rank().t, 'SS');
  q.toIntro();
}

// Pause feedback before an ordinary next question, promotion, loss, and victory.
for (const outcome of ['next', 'promote', 'loss', 'victory']) {
  q.startRun(outcome);
  if (outcome === 'promote' || outcome === 'victory') q.game.tierProgress = ROUNDS_PER_TIER - 1;
  if (outcome === 'victory') q.game.tierIndex = TIERS.length - 1;
  if (outcome === 'loss') q.game.lives = 1;
  q.answer(outcome === 'loss' ? (q.currentAnswerIndex() + 1) % 4 : q.currentAnswerIndex());
  advance(900);
  q.requestQuit();
  advance(10000);
  assert.equal(q.game.phase, 'confirm-quit', `${outcome} must remain paused`);
  q.cancelQuit();
  advance(1499);
  assert.equal(q.game.phase, 'feedback');
  advance(1);
  assert.equal(q.game.phase, { next: 'playing', promote: 'promote', loss: 'over', victory: 'over' }[outcome]);
  q.toIntro();
}
q.startRun('quit');
setLocale('zh');
q.useJoker('hint');
const chineseHint = q.currentHint();
setLocale('en');
assert.notEqual(q.currentHint(), chineseHint);
assert.ok(!/[\u3400-\u9fff]/.test(q.currentHint()));
advance(500);
q.requestQuit();
const remaining = q.game.timeLeft;
advance(5000);
assert.equal(q.game.timeLeft, remaining);
q.cancelQuit();
advance(100);
assert.equal(q.game.timeLeft, remaining - 0.1);
q.answer(q.currentAnswerIndex());
const englishBreakdown = q.feedbackBreakdown();
setLocale('zh');
assert.notEqual(q.feedbackBreakdown(), englishBreakdown);
assert.ok(q.feedbackBreakdown().includes('基础'));
q.requestQuit();
q.confirmQuit();
advance(10000);
assert.equal(q.game.phase, 'intro');
assert.equal(jobs.size, 0);
console.log('Scoring, ranks, localized counts, and all quit/pause transitions passed.');
