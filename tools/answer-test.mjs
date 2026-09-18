import assert from 'node:assert/strict';
import { documentQuestions } from '../src/lib/data/questions/document.ts';
import { noviceQuestions } from '../src/lib/data/questions/novice.ts';

const byRef = new Map(documentQuestions.map((q) => [q.sourceRef, q]));
const correctOption = (ref, lang = 'zh') => {
  const q = byRef.get(ref);
  assert.ok(q, ref);
  return q[lang].options[q.answer];
};
// Stable independently checked outputs catch answer-index and translation drift.
const outputs = {
  '01': "<class 'float'>", '02': '_score', '03': '3 1', '04': 'abcdef',
  '05': 'yth', '06': '5', '07': 'A', '08': '0 1 2', '09': '4',
  '10': '[1, 2, 3, 4, 5]', '11': '30', '12': '4', '13': '14',
  '14': '15', '15': '5 3',
};
for (const [n, output] of Object.entries(outputs)) {
  for (const lang of ['zh', 'en']) assert.equal(correctOption(`part2-${n}`, lang), output);
}

const input = [77, 52, 32, 82, 43, 21, 90, 28, 46];
const sorted = [...input].sort((a, b) => a - b);
const expected = [];
while (sorted.length) {
  expected.push(sorted.shift());
  if (sorted.length) expected.push(sorted.pop());
}
const results = [];
for (const [offset, sign] of [[1, -1], [0, -1], [0, 1], [1, 1]]) {
  const a = [...input];
  let k = 1;
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = a.length - 1; j > i + offset; j--) {
      if (sign * k * (a[j] - a[j - 1]) > 0) [a[j - 1], a[j]] = [a[j], a[j - 1]];
    }
    k = -k;
  }
  results.push(JSON.stringify(a) === JSON.stringify(expected));
}
assert.deepEqual(results, [false, true, false, false]);
assert.equal(byRef.get('part3-01').answer, results.indexOf(true));
assert.equal(byRef.get('part3-02').answer, 0);
for (const [length, ref] of [[5, 'part3-03'], [6, 'part3-04']]) {
  let head = null;
  for (let data = length; data >= 1; data--) head = { data, next: head };
  let p = head, q = head;
  while (q !== null && q.next !== null) { p = p.next; q = q.next.next; }
  for (const lang of ['zh', 'en']) assert.equal(correctOption(ref, lang), String(p.data));
}
const selection = noviceQuestions.find((q) => q.id === 'novice-2');
assert.equal(selection.answer, 3, 'Unconditional swaps take n - 1 operations for every input');
assert.equal(byRef.get('part2-17').answer, 1, 'The literal space makes the URL hostname invalid');
console.log('Python answer fixtures, all four sorting choices, linked-list variants and corrected keys passed.');
