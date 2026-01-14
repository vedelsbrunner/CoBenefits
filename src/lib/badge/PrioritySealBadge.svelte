<script lang="ts">
  import FlowbiteTooltip from '$lib/components/FlowbiteTooltip.svelte';
  import VisBadgeIcon from './icons/VisBadgeIcon.svelte';
  import type { BadgeData, BadgeIntent, BadgeOnClick } from './types';
  import type { VisBadgeIconName } from './icons/VisBadgeIcon.svelte';
  import { base } from '$app/paths';

  export let badge: BadgeData;
  export let variant: 'outlined' | 'filled' = 'outlined';
  export let onClick: BadgeOnClick | null = null;

  /**
   * Text that is rendered around the circle.
   * Defaults to the badge label.
   */
  export let ringText: string | null = null;
  export let repeat: number = 2;
  export let separator: string = ' • ';

  /**
   * Size of the seal in px (outer diameter).
   */
  export let size: number = 76;

  /**
   * Rotation speed in ms; set to 0 to disable rotation.
   */
  export let rotationMs: number = 200000;

  function toIntent(value: unknown): BadgeIntent | undefined {
    if (typeof value !== 'string') return undefined;
    const normalized = value.normalize('NFKC').replace(/\s+/g, ' ').trim().toUpperCase();
    if (normalized === 'CONFIRMATION') return 'CONFIRMATION';
    if (normalized === 'INFORMATION') return 'INFORMATION';
    if (normalized === 'WARNING') return 'WARNING';
    return undefined;
  }

  function intentToTone(intent?: BadgeIntent): 'neutral' | 'success' | 'info' | 'warning' {
    if (!intent) return 'neutral';
    if (intent === 'CONFIRMATION') return 'success';
    if (intent === 'INFORMATION') return 'info';
    if (intent === 'WARNING') return 'warning';
    return 'neutral';
  }

  function intentToIcon(intent?: BadgeIntent): VisBadgeIconName | null {
    if (!intent) return null;
    if (intent === 'CONFIRMATION') return 'Confirmation';
    if (intent === 'INFORMATION') return 'Info';
    if (intent === 'WARNING') return 'Warning';
    return null;
  }

  function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }

  $: intent = toIntent(badge?.intent);
  $: tone = intentToTone(intent);
  $: iconName = intentToIcon(intent);

  $: displayText = (ringText ?? badge?.label ?? '').trim() || '—';
  $: repeatSafe = clamp(Math.floor(repeat || 1), 1, 10);
  $: chars = [...Array(repeatSafe)]
    .map(() => [...displayText.toUpperCase()].concat([...separator.toUpperCase()]))
    .flat();

  // Tune type sizes to keep it compact and readable.
  $: ringFontPx = Math.round(size * 0.12);
  $: centerIcon = Math.round(size * 0.30);

  $: href = onClick ? (onClick.external ? onClick.href : `${base}${onClick.href}`) : null;
  $: external = onClick?.external ?? (href?.startsWith('http') || false);
</script>

{#if badge}
  <FlowbiteTooltip placement="top" openDelayMs={120}>
    <span slot="trigger">
      {#if onClick && href}
        <a
          class="seal {tone} {variant}"
          style={`--seal-size:${size}px; --seal-font:${ringFontPx}px; --rotation:${rotationMs}ms;`}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          aria-label={badge.label}
        >
          <span class="ring {rotationMs > 0 ? 'spin' : ''}" aria-hidden="true">
            {#each chars as char, index (index)}
              <span class="char" style={`--angle:${(1 / chars.length) * index}turn;`}>{char}</span>
            {/each}
          </span>

          <span class="center" aria-hidden="true">
            <span class="center-pill">
              {#if iconName}
                <VisBadgeIcon
                  name={iconName}
                  size={centerIcon}
                  bg="var(--seal-solid)"
                  fg="#ffffff"
                  bgOpacity={1}
                />
              {/if}
            </span>
          </span>
        </a>
      {:else}
        <span
          class="seal {tone} {variant}"
          style={`--seal-size:${size}px; --seal-font:${ringFontPx}px; --rotation:${rotationMs}ms;`}
          role="note"
          tabindex="0"
          aria-label={badge.label}
        >
          <span class="ring {rotationMs > 0 ? 'spin' : ''}" aria-hidden="true">
            {#each chars as char, index (index)}
              <span class="char" style={`--angle:${(1 / chars.length) * index}turn;`}>{char}</span>
            {/each}
          </span>

          <span class="center" aria-hidden="true">
            <span class="center-pill">
              {#if iconName}
                <VisBadgeIcon
                  name={iconName}
                  size={centerIcon}
                  bg="var(--seal-solid)"
                  fg="#ffffff"
                  bgOpacity={1}
                />
              {/if}
            </span>
          </span>
        </span>
      {/if}
    </span>
    <span slot="content">
      <strong>{badge.label}</strong>
      {#if badge.description}
        <span style="display:block;margin-top:4px;opacity:0.9">{badge.description}</span>
      {/if}
      {#if onClick}
        <div class="tip-link-wrap">
          <span class="tip-link-text">Click for more</span>
          <svg class="tip-link-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M14 5h5v5h-2V8.4l-6.3 6.3-1.4-1.4L15.6 7H14V5ZM5 7h6v2H7v10h10v-4h2v6H5V7Z"
              fill="currentColor"
            />
          </svg>
        </div>
      {/if}
    </span>
  </FlowbiteTooltip>
{/if}

<style>
  .seal {
    position: relative;
    width: var(--seal-size);
    height: var(--seal-size);
    border-radius: 999px;
    display: inline-grid;
    place-items: center;
    outline: none;
    cursor: pointer;
    user-select: none;
    background: transparent;

    /* intent tokens (match other badge colors) */
    --seal-solid: rgb(17, 24, 39);
    --seal-ring: rgba(17, 24, 39, 0.55);
    --seal-line: rgba(17, 24, 39, 0.18);
    --seal-ring-fg: var(--seal-solid);
  }

  a.seal {
    text-decoration: none;
    color: inherit;
  }

  .seal.success {
    --seal-solid: rgb(46, 125, 50);
    --seal-ring: rgba(46, 125, 50, 0.62);
    --seal-line: rgba(46, 125, 50, 0.22);
  }
  .seal.info {
    --seal-solid: rgb(2, 136, 209);
    --seal-ring: rgba(2, 136, 209, 0.62);
    --seal-line: rgba(2, 136, 209, 0.22);
  }
  .seal.warning {
    --seal-solid: rgb(237, 108, 2);
    --seal-ring: rgba(237, 108, 2, 0.68);
    --seal-line: rgba(237, 108, 2, 0.24);
  }

  /* Filled variant: solid intent background, white ring text */
  .seal.filled {
    background: var(--seal-solid);
    --seal-ring-fg: rgba(255, 255, 255, 0.92);
  }

  .ring {
    position: absolute;
    inset: 0;
    border-radius: 999px;
    font-size: var(--seal-font);
    color: var(--seal-ring-fg);
    opacity: 0.92;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    font-weight: 400;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0turn);
    }
    100% {
      transform: rotate(1turn);
    }
  }

  .ring.spin {
    animation: rotation var(--rotation) linear infinite;
  }

  .char {
    width: 1em;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) rotate(var(--angle));
    text-align: center;
  }

  .center {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }

  .center-pill {
    width: calc(var(--seal-size) * 0.64);
    height: calc(var(--seal-size) * 0.64);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.96);
    border: 1px solid var(--seal-line);
    display: grid;
    place-items: center;
    opacity: 0.95;
  }

  .seal.filled .center-pill {
    border-color: rgba(255, 255, 255, 0.35);
    background: #ffffff;
    opacity: 1;
  }

  .seal:focus-visible .center-pill {
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.25);
  }

  .tip-link-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-top: 4px;
    padding-top: 4px;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.92);
    font-size: 11px;
    line-height: 1.2;
    white-space: nowrap;
  }

  .tip-link-icon {
    width: 12px;
    height: 12px;
    display: block;
    opacity: 0.95;
  }
</style>

