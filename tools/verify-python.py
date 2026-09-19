"""Execute the reviewed Python question snippets from JSON on stdin.

node --experimental-strip-types --input-type=module -e "import {documentQuestions as q} from './src/lib/data/questions/document.ts'; console.log(JSON.stringify(q))" | python tools/verify-python.py

This intentionally executes the checked-in quiz code. Review code changes before running.
"""
import contextlib
import io
import json
import keyword
import re
import sys
from types import SimpleNamespace

bank = {q['sourceRef']: q for q in json.load(sys.stdin)}

def execute(code, initial=None):
    namespace = dict(initial or {})
    output = io.StringIO()
    with contextlib.redirect_stdout(output):
        exec(code, namespace)
    return output.getvalue().strip(), namespace

for n in range(1, 16):
    q = bank[f'part2-{n:02}']
    if n == 2:
        valid = [o.isidentifier() and not keyword.iskeyword(o) for o in q['zh']['options']]
        assert valid == [False, False, True, False]
        result = '_score'
    else:
        code = q.get('code') or re.fullmatch(r'执行 (.*) 的输出是', q['zh']['prompt'])[1]
        result, state = execute(code)
        if n == 9:
            # Count actual loop iterations rather than using its final variable value.
            instrumented = 'iterations = 0\n' + code.replace('    i += 1', '    iterations += 1\n    i += 1')
            _, state = execute(instrumented)
            result = str(state['iterations'])
    for lang in ['zh', 'en']:
        assert result == q[lang]['options'][q['answer']], (n, lang, result)

q = bank['part3-01']
expected = [21, 90, 28, 82, 32, 77, 43, 52, 46]
matches = []
for option in q['zh']['options']:
    stop, condition = re.fullmatch(r'①\s*(.*?)\s+②\s*(.*)', option).groups()
    code = q['code'].replace('①', stop).replace('②', condition)
    _, state = execute(code, {'a': [77, 52, 32, 82, 43, 21, 90, 28, 46]})
    matches.append(state['a'] == expected)
assert matches == [False, True, False, False]
assert q['answer'] == matches.index(True)

q = bank['part3-02']
option = q['zh']['options'][q['answer']]
args = re.findall(r'[①②③④⑤⑥]\s*([abc])', option)
code = q['code']
for marker, arg in zip('①②③④⑤⑥', args):
    code = code.replace(marker, arg)
out, _ = execute(code)
pegs = {'A': [3, 2, 1], 'B': [], 'C': []}
for line in out.splitlines():
    start, end = line.split(' -> ')
    disk = pegs[start].pop()
    assert not pegs[end] or disk < pegs[end][-1], 'Illegal Hanoi move'
    pegs[end].append(disk)
assert pegs == {'A': [], 'B': [], 'C': [3, 2, 1]}
assert len(out.splitlines()) == 7

for n, length in [(3, 5), (4, 6)]:
    q = bank[f'part3-{n:02}']
    head = None
    for data in range(length, 0, -1):
        head = SimpleNamespace(data=data, next=head)
    out, _ = execute(q['code'], {'head': head})
    for lang in ['zh', 'en']:
        assert out == q[lang]['options'][q['answer']]
print('Executed all 15 Python fundamentals, four sorting choices, Hanoi, and both linked-list cases successfully.')
