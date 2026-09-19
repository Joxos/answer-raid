<script lang="ts">
  /** 判定面板:正误 + 原理讲解 + 得分明细。 */
  import { fly } from 'svelte/transition';
  import Rich from './Rich.svelte';
  import { game, tier, currentQuestion, currentAnswerIndex, feedbackBreakdown } from '../quiz.svelte';
  import { ROUNDS_PER_TIER } from '../data/types';
  import { msg, t, fmt } from '../i18n.svelte.ts';

  const cur = $derived(currentQuestion());
  const answerIdx = $derived(currentAnswerIndex());
  const verdict = $derived(
    game.timesUp
      ? 'fb.verdict.timesUp'
      : game.isCorrect
        ? 'fb.verdict.granted'
        : 'fb.verdict.denied',
  );
</script>

{#if cur}
  <section class="fb panel" class:ok={game.isCorrect === true} class:bad={game.isCorrect !== true} in:fly={{ y: 16, duration: 260 }}>
    <div class="top">
      <span class="verdict">
        {#if game.isCorrect}
          <span class="glyph">✓</span>{t(msg(verdict))}
        {:else if game.timesUp}
          <span class="glyph">⏱</span>{t(msg(verdict))}
        {:else}
          <span class="glyph">✗</span>{t(msg(verdict))}
        {/if}
      </span>

      <span class="rightAns mute">
        {t(msg('fb.correctAnswer'))} <b>{String.fromCharCode(65 + answerIdx)}</b>
        <span class="sep">·</span>
        <Rich text={cur.options[answerIdx]} />
      </span>

      {#if game.isCorrect}
        <span class="gain">+{game.lastGain}</span>
      {:else}
        <span class="loss">{fmt('fb.livesLeft', { n: Math.max(0, game.lives) })}</span>
      {/if}
    </div>

    <div class="why">
      <span class="wh">{t(msg('fb.why'))}</span>
      <Rich text={cur.explain} />
    </div>

    <div class="foot">
      <span class="brk mute">{feedbackBreakdown()}</span>
      <span class="tierNow" style="--th:{tier().hue}"
        >{fmt('fb.tierProgress', {
          tier: fmt(`tier.${tier().id}.label`),
          n: game.tierProgress,
          total: ROUNDS_PER_TIER,
        })}</span
      >
      {#if game.chain >= 3}
        <span class="fire">{fmt('fb.chainHold', { n: game.chain })}</span>
      {/if}
    </div>
  </section>
{/if}

<style>
  .fb {
    position: relative;
    z-index: 4;
    padding: 0.9rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    border-left-width: 3px;
  }
  .fb.ok {
    border-left-color: var(--accent);
    box-shadow: inset 3px 0 30px -6px hsl(var(--hue) 100% 60% / 0.4);
  }
  .fb.bad {
    border-left-color: var(--danger);
    box-shadow: inset 3px 0 30px -6px var(--danger-glow);
  }

  .top {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-wrap: wrap;
  }
  .verdict {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-family: var(--display);
    font-size: 1.1rem;
    letter-spacing: 0.12em;
  }
  .ok .verdict {
    color: var(--accent);
    text-shadow: 0 0 16px var(--accent-glow);
  }
  .bad .verdict {
    color: var(--danger);
    text-shadow: 0 0 16px var(--danger-glow);
  }
  .glyph {
    font-size: 1.25em;
  }
  .rightAns {
    font-size: 0.84rem;
    flex: 1;
    min-width: 0;
  }
  .rightAns b {
    color: var(--fg-strong);
  }
  .rightAns .sep {
    margin: 0 0.35rem;
  }
  .gain {
    font-family: var(--display);
    font-size: 1.5rem;
    color: var(--accent);
    text-shadow: 0 0 20px var(--accent-glow);
  }
  .loss {
    font-size: 0.82rem;
    color: var(--danger);
    border: 1px solid var(--danger-glow);
    padding: 0.1rem 0.5rem;
  }

  .why {
    font-size: 0.88rem;
    line-height: 1.8;
    color: var(--fg);
    padding: 0.65rem 0.8rem;
    background: var(--scrim);
    border: 1px dashed var(--line);
  }
  .wh {
    display: block;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: var(--fg-mute);
    margin-bottom: 0.3rem;
  }

  .foot {
    display: flex;
    gap: 0.8rem 1.2rem;
    flex-wrap: wrap;
    align-items: center;
    font-size: 0.74rem;
  }
  .brk {
    flex: 1;
    min-width: 0;
  }
  .tierNow {
    color: hsl(var(--th) 90% 65%);
    border: 1px solid hsl(var(--th) 70% 50% / 0.45);
    padding: 0.05rem 0.45rem;
  }
  .fire {
    color: var(--warn);
    animation: blink 1.4s steps(1) infinite;
  }
</style>
