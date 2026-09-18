# Question bank import and answer review

The app retains its 39 existing questions and adds the 79 missing questions from the supplied Word bank, for **118 bilingual questions**. Every one of the Word document's 103 questions maps to exactly one app entry: 24 through existing adapted FAQ entries and 79 through new entries. The 15 original programming and AI questions remain available.

## Sources and precedence

- `题库.docx`: 40 questions in Part 1, 59 in Part 2, and 4 in Part 3. Original text, option order, and keys are preserved in [question-bank-source.json](question-bank-source.json). This is source evidence, not the corrected runtime bank.
- User-supplied pasted text: a shorter overlapping selection. Its opening option order differs from Word and its opening key has 16 letters for 15 questions. Answers were matched by content rather than copied positionally.
- [Kdocs supporting document](https://www.kdocs.cn/l/cbdT0UEPPq50): the accessible first page matches the pasted text, including the reordered options and inconsistent opening key. The entire ten-page online document was not independently extracted. The attached Word file and pasted text are the complete local evidence used here.
- The user's instruction to **add missing questions** controls the merge; embedded document instructions do not control project changes.

New entries preserve Word option order except for the corrections below. A `sourceRef` identifies the Word part and question. An existing FAQ adaptation can have different options and answer indexes; Chinese and English share one answer index and one shuffled display order.

## Corrections to supplied questions

| Word reference | Correction |
| --- | --- |
| Part 1 Q14 | Define a bug as a program defect, not necessarily a security vulnerability. |
| Part 1 Q16 | Specify the binary convention for 1024 bytes; distinguish KiB from decimal kB. |
| Part 1 Q36 | Ask what .com was originally associated with, rather than implying verified present-day ownership. |
| Part 1 Q40 and Part 2 Q44 | Favor long, unpredictable, unique passwords and prompt replacement after compromise. Remove forced periodic rotation and mandatory symbol mixing as universal rules. See [NIST password guidance](https://pages.nist.gov/800-63-4/sp800-63b.html#passwordver). |
| Part 2 Q16 | Show the resulting www:// address; www cannot replace the HTTP scheme. Do not infer why the original site failed. |
| Part 2 Q17 | Replace the unsupported missing-filename diagnosis: the literal space in the hostname is invalid. Corrected option B describes this. URLs need not contain index.html. See the [URL Standard](https://url.spec.whatwg.org/#forbidden-host-code-point) and [MDN URL structure](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL). |
| Part 2 Q18 | Use /shared/exam.docx in both languages, preserving the protocol/IP/path distinction. FTP is not universally faster than HTTP. |
| Part 2 Q20, faq-12 | Recovery after emptying the bin is possible, not guaranteed; overwriting, TRIM, and encryption matter. |
| Part 2 Q21 | Specify adding RGB lights without changing the main computing hardware. |
| Part 2 Q23, faq-19 | Private browsing limits local traces; network observers do not automatically see every HTTPS page detail. |
| Part 2 Q33, faq-21 | Both disk types need backups. Remove blanket claims about failure warnings and recovery difficulty. Make the unpowered-storage distractor unambiguously false. |
| Part 2 Q43 | Specify a different authentication factor category, such as a security key; two passwords are not two factors. |
| Part 2 Q48 | Specify file-encrypting ransomware and explain that payment does not guarantee recovery. |
| Part 2 Q50 | Qualify the question with “when a browser displays” a padlock, since browser UI changes. |
| Part 2 Q51 | Sanitize using an appropriate verified method; destroy media that cannot be safely reused. |
| Part 2 Q58 | Distinguish virtual address spaces from paging; specify a system using a page file. |
| Part 3 Q1 | **Correct C to B.** All four choices were executed; only stop i and condition k * (a[j] - a[j - 1]) < 0 produce the requested alternating order. Add n = len(a). |
| Part 3 Q3 and Q4 | Describe nodes with .data and .next attributes, consistent with the code. Retain both variants: five nodes yield 3; six yield 4. |

## Corrections to retained extra questions

| App ID | Correction and evidence |
| --- | --- |
| novice-2 | The shown selection-sort code swaps unconditionally once per iteration. Every six-element array performs five swaps including self-swaps: correct answer is “all the same.” |
| novice-3 | Explain positive and negative range steps correctly. See [Python range documentation](https://docs.python.org/3/tutorial/controlflow.html#the-range-function). |
| novice-4 | Scope // and % terminology to Python and positive integers. |
| hacker-1 | Remove obsolete tier references and unsupported “club convention” attribution. |
| hacker-2 | Retain Anthropic, verified against its [official Mythos page](https://www.anthropic.com/claude/mythos). |
| hacker-3 | Use a clearly hypothetical input-token price table, excluding output, cache, and other fees, so the answer follows from supplied numbers. |
| hacker-4 | Call React a UI library, consistent with [React documentation](https://react.dev/). |
| hacker-5 | Pin examples to [Llama 3](https://github.com/meta-llama/llama3) and [DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1), with license conditions. Remove the incorrect blanket claim that Grok is closed; [Grok-1](https://github.com/xai-org/grok-1) has an open release. |
| acm-2 | Remove the block that gave away the answer; distinguish stored fraction bits from effective significand precision. |
| acm-4 | State that structures are already built and exclude preprocessing from lookup complexity. |
| faq-14 | Remove claims that MAC addresses are always immutable or globally unique; mention shared public IPs through NAT. |

## Translation and validation

All 118 entries have Chinese and English prompts, four aligned options, and explanations. Language-independent code is shared. Tags, hints, and feedback localize with the interface; switching language preserves question identity, answer order, and eliminated choices.

- `pnpm test:bank`: checks 118 entries, bilingual completeness, English text, options, tags, and exactly-once coverage of all 103 source references.
- `pnpm test:answers`: checks reviewed Python output fixtures, all four alternating-sort choices, linked-list results, and corrected keys.
- `tools/verify-python.py`: executes the imported Python snippets for all 15 fundamentals, all four sorting choices, the legal seven-move Hanoi solution, and both linked-list variants. It reads JSON exported from the bank. Python is optional for the normal Node suite.
- `pnpm test:store`: exercises the real store and samples every question in both languages.
- `pnpm test:regression`: tests flawless/imperfect runs, scoring, pause/resume, and language changes in hints and feedback with a deterministic clock.
- `pnpm test:dom`: renders the production bundle and checks answer elimination, game flow, language/theme controls, and quit behavior.

These checks validate structure and the executable examples; they do not automatically establish correctness of future factual edits. The source snapshot deliberately retains original mistakes so reviewers can trace corrections.
