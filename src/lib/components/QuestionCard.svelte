<script lang="ts">
  /** 题目卡:题面 / 代码 / 图表 / 选项。feedback 阶段自动标出正误。 */
  import Rich from './Rich.svelte';
  import { game, answer, currentQuestion, currentAnswerIndex, currentHint } from '../quiz.svelte';
  import { ROUNDS_PER_TIER } from '../data/types';
  import { tierMeta } from '../data/tiers';
  import { msg, t, tagLabel } from '../i18n.svelte.ts';

  /**
   * 注意这里读的是 `currentQuestion()` 而不是 `game.current.q`:
   * 前者按**当前语言**即时摊平,所以切换语言时题干/选项会立刻跟着变;
   * 后者是抽题那一刻冻结的单语快照。
   */
  const cur = $derived(currentQuestion());
  const answerIdx = $derived(currentAnswerIndex());
  const locked = $derived(game.phase !== 'playing');
  const revealed = $derived(game.isCorrect !== null);
  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  const svgSrc = $derived(
    cur?.chartKind === 'svg' && cur.chartData
      ? `data:image/svg+xml;utf8,${encodeURIComponent(cur.chartData)}`
      : null,
  );

  function pick(i: number): void {
    if (locked) return;
    if (game.eliminated.includes(i)) return;
    answer(i);
  }

  function optClass(i: number): string {
    const cls: string[] = [];
    if (game.eliminated.includes(i)) cls.push('gone');
    if (!revealed) return cls.join(' ');
    if (cur && i === answerIdx) cls.push('right');
    if (game.picked === i && cur && i !== answerIdx) cls.push('wrong');
    if (game.picked === i) cls.push('picked');
    return cls.join(' ');
  }
</script>

{#if cur}
  <article class="qcard panel" class:shake={game.isCorrect === false} style="--tier-hue:{tierMeta(cur.tier).hue}">
    <div class="qhead">
      <span class="qno">
        <em>Q</em>{String(game.tierProgress + 1).padStart(2, '0')}
        <span class="mute">/ {String(ROUNDS_PER_TIER).padStart(2, '0')}</span>
      </span>
      <span class="tags">
        {#each cur.tags as tg (tg)}<span class="chip">{tagLabel(tg)}</span>{/each}
      </span>
      {#if game.penalty < 1}
        <span class="chip pen">{t(msg('q.hintPenalty'), { n: game.penalty })}</span>
      {/if}
    </div>

    <h2 class="prompt"><Rich text={cur.prompt} /></h2>

    {#if cur.code}
      <pre class="code"><code>{cur.code}</code></pre>
    {:else if cur.chartKind === 'ascii' && cur.chartData}
      <pre class="chart">{cur.chartData}</pre>
    {:else if svgSrc}
      <img class="chartSvg" src={svgSrc} alt={t(msg('q.diagram'))} />
    {/if}

    {#if game.hint}
      <p class="hint"><span class="hk">{t(msg('hint.panel'))}</span>{currentHint()}</p>
    {/if}

    <ul class="opts">
      {#each cur.options as opt, i (opt)}
        <li>
          <button class={optClass(i)} onclick={() => pick(i)} disabled={locked || game.eliminated.includes(i)}>
            <span class="letter">{LETTERS[i]}</span>
            <span class="otext"><Rich text={opt} /></span>
            <span class="mark">
              {#if game.eliminated.includes(i)}
                ✕
              {:else if revealed && i === answerIdx}
                ✓
              {:else if revealed && game.picked === i}
                ✗
              {:else}
                <span class="kbd">{LETTERS[i]}</span>
              {/if}
            </span>
          </button>
        </li>
      {/each}
    </ul>
  </article>
{/if}

<style>
  .qcard {
    position: relative;
    z-index: 4;
    padding: clamp(0.9rem, 2vw, 1.3rem);
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }
  .qcard.shake {
    animation: shake 0.42s ease-out both;
  }

  .qhead {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-wrap: wrap;
    padding-bottom: 0.6rem;
    border-bottom: 1px dashed var(--line);
  }
  .qno {
    font-family: var(--display);
    font-size: 1.15rem;
    color: var(--accent);
    letter-spacing: 0.08em;
  }
  .qno em {
    font-style: normal;
    font-size: 0.62em;
    opacity: 0.6;
    margin-right: 0.15em;
  }
  .qno .mute {
    font-size: 0.6em;
  }
  .tags {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
  }
  .chip.pen {
    border-color: var(--warn);
    color: var(--warn);
    background: var(--warn-soft);
  }

  .prompt {
    font-family: var(--mono);
    font-size: clamp(0.98rem, 2.7vw, 1.16rem);
    line-height: 1.75;
    color: var(--fg-strong);
    letter-spacing: 0.01em;
  }

  .chartSvg {
    display: block;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    padding: 0.6rem;
    background: var(--code-bg);
    border: 1px solid var(--line);
  }

  .hint {
    margin: 0;
    padding: 0.55rem 0.75rem;
    font-size: 0.84rem;
    color: var(--warn);
    border: 1px dashed var(--warn-glow);
    background: var(--warn-soft);
  }
  .hk {
    display: inline-block;
    margin-right: 0.6rem;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    color: var(--on-accent);
    background: var(--warn);
    padding: 0.05em 0.4em;
  }

  .opts {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .opts button {
    width: 100%;
    display: grid;
    grid-template-columns: 2.1rem 1fr auto;
    align-items: center;
    gap: 0.7rem;
    padding: 0.7rem 0.85rem;
    text-align: left;
    background: linear-gradient(90deg, hsl(var(--hue) 60% 40% / 0.08), transparent 70%);
    border: 1px solid var(--line);
    color: var(--fg);
    font-size: 0.94rem;
    position: relative;
    overflow: hidden;
    transition: border-color 0.14s, background 0.14s, transform 0.08s, box-shadow 0.14s;
  }
  .opts button::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--accent);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.16s ease-out;
  }
  .opts button:hover:not(:disabled) {
    border-color: var(--line-hard);
    background: linear-gradient(90deg, hsl(var(--hue) 80% 50% / 0.16), transparent 75%);
    box-shadow: inset 0 0 24px hsl(var(--hue) 100% 60% / 0.08);
    transform: translateX(3px);
  }
  .opts button:hover:not(:disabled)::before {
    transform: scaleY(1);
  }
  .opts button:disabled {
    cursor: default;
  }

  .letter {
    display: grid;
    place-items: center;
    width: 2.1rem;
    height: 2.1rem;
    font-family: var(--display);
    font-size: 1.05rem;
    color: var(--accent);
    border: 1px solid var(--line-hard);
    background: var(--key-bg);
  }
  .otext {
    min-width: 0;
  }
  .mark {
    font-size: 1rem;
    color: var(--fg-mute);
  }
  .mark .kbd {
    opacity: 0.45;
  }

  /* --- 判定态 --- */
  .opts button.gone {
    opacity: 0.3;
    text-decoration: line-through;
    filter: grayscale(1);
  }
  .opts button.right {
    border-color: var(--accent);
    background: linear-gradient(90deg, var(--accent-soft), transparent 80%);
    box-shadow: var(--panel-shadow);
  }
  .opts button.right .letter {
    color: var(--on-accent);
    background: var(--accent);
    border-color: var(--accent);
  }
  .opts button.right .mark {
    color: var(--accent);
    font-size: 1.3rem;
  }
  .opts button.wrong {
    border-color: var(--danger);
    background: linear-gradient(90deg, var(--danger-soft), transparent 80%);
    animation: shake 0.4s ease-out both;
  }
  .opts button.wrong .letter {
    color: var(--on-accent);
    background: var(--danger);
    border-color: var(--danger);
  }
  .opts button.wrong .mark {
    color: var(--danger);
    font-size: 1.3rem;
  }
  .opts button.picked {
    outline: 1px solid currentColor;
    outline-offset: 1px;
  }
</style>
