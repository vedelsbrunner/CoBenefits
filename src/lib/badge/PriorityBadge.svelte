<script lang="ts">
  import FlowbiteTooltip from '$lib/components/FlowbiteTooltip.svelte';
  import VisBadgeIcon from './icons/VisBadgeIcon.svelte';
  import type { BadgeData, BadgeIntent, BadgeOnClick } from './types';
  import type { VisBadgeIconName } from './icons/VisBadgeIcon.svelte';
  import { base } from '$app/paths';

  export type PriorityBadgeVariant = 'solid' | 'ring' | 'double-ring' | 'stamp' | 'glow';

  export let badge: BadgeData;
  export let variant: PriorityBadgeVariant = 'solid';
  export let size: number = 44;
  export let showLabel: boolean = false;
  export let onClick: BadgeOnClick | null = null;

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

  $: intent = toIntent(badge?.intent);
  $: tone = intentToTone(intent);
  $: iconName = intentToIcon(intent);

  function fullLabel(label: unknown): string {
    const cleaned = String(label ?? '').trim();
    return cleaned || '—';
  }

  // Larger by default when we show text inside the circle.
  // Scale a bit with label length to avoid clipping while staying “badge-like”.
  $: rawLabel = fullLabel(badge?.label);
  $: labelLen = rawLabel.length;
  $: renderSize = showLabel ? Math.min(104, Math.max(size, 70 + Math.max(0, labelLen - 12) * 1.4)) : size;

  // Make room for text by shrinking the icon a bit in label mode.
  $: iconSize = Math.round(renderSize * (showLabel ? 0.34 : 0.55));

  // Font size tuned to fit more characters; text wraps to multiple lines inside the circle.
  $: textSize = showLabel ? (labelLen <= 12 ? 12 : labelLen <= 18 ? 11 : labelLen <= 26 ? 10 : 9) : 0;

  $: href = onClick ? (onClick.external ? onClick.href : `${base}${onClick.href}`) : null;
  $: external = onClick?.external ?? (href?.startsWith('http') || false);
</script>

{#if badge}
  <FlowbiteTooltip placement="top" openDelayMs={100}>
    <span slot="trigger">
      {#if onClick && href}
        <a
          class="prio {tone} {variant} {showLabel ? 'with-label' : ''}"
          style={`--prio-size:${renderSize}px; --prio-text-size:${textSize}px;`}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          aria-label={badge.label}
        >
          <span class="prio-inner" aria-hidden="true">
            {#if iconName}
              <!-- Use glyph-only inside a salient round badge (badge provides the background). -->
              <VisBadgeIcon
                name={iconName}
                size={iconSize}
                bg={variant === 'solid' ? '#ffffff' : 'var(--prio-solid)'}
                bgOpacity={1}
                fg={variant === 'solid' ? 'var(--prio-solid)' : '#ffffff'}
              />
            {/if}
            {#if showLabel}
              <span class="prio-text">{rawLabel}</span>
            {/if}
          </span>
        </a>
      {:else}
        <span
          class="prio {tone} {variant} {showLabel ? 'with-label' : ''}"
          style={`--prio-size:${renderSize}px; --prio-text-size:${textSize}px;`}
          role="note"
          tabindex="0"
          aria-label={badge.label}
        >
          <span class="prio-inner" aria-hidden="true">
            {#if iconName}
              <!-- Use glyph-only inside a salient round badge (badge provides the background). -->
              <VisBadgeIcon
                name={iconName}
                size={iconSize}
                bg={variant === 'solid' ? '#ffffff' : 'var(--prio-solid)'}
                bgOpacity={1}
                fg={variant === 'solid' ? 'var(--prio-solid)' : '#ffffff'}
              />
            {/if}
            {#if showLabel}
              <span class="prio-text">{rawLabel}</span>
            {/if}
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
  .prio {
    width: var(--prio-size);
    height: var(--prio-size);
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    user-select: none;

    /* shared motion */
    transition: transform 160ms cubic-bezier(0.2, 0, 0, 1), box-shadow 160ms cubic-bezier(0.2, 0, 0, 1),
      filter 160ms cubic-bezier(0.2, 0, 0, 1);

    /* tokens */
    --prio-solid: rgb(17, 24, 39);
    --prio-fg: #ffffff;
    --prio-border: rgba(17, 24, 39, 0.22);
    --prio-text: #ffffff;
  }

  a.prio {
    text-decoration: none;
    color: inherit;
  }

  .prio-inner {
    width: 100%;
    height: 100%;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .prio.with-label .prio-inner {
    flex-direction: column;
    gap: 2px;
    padding: 3px 5px 5px 5px;
    box-sizing: border-box;
  }

  .prio-text {
    font-size: var(--prio-text-size, 10px);
    font-weight: 500;
    letter-spacing: 0.02em;
    line-height: 1.05;
    color: var(--prio-text);
    text-align: center;
    white-space: normal;
    overflow-wrap: anywhere;
    opacity: 0.95;
  }

  /* Tone tokens (match Badge.svelte) */
  .prio.neutral {
    --prio-solid: rgb(17, 24, 39);
    --prio-border: rgba(17, 24, 39, 0.22);
  }

  .prio.success {
    --prio-solid: rgb(46, 125, 50);
    --prio-border: rgba(46, 125, 50, 0.65);
  }

  .prio.info {
    --prio-solid: rgb(2, 136, 209);
    --prio-border: rgba(2, 136, 209, 0.65);
  }

  .prio.warning {
    --prio-solid: rgb(237, 108, 2);
    --prio-border: rgba(237, 108, 2, 0.7);
  }

  /* Variants */
  .prio.solid {
    background: var(--prio-solid);
  }

  .prio.ring {
    background: #ffffff;
    box-shadow: inset 0 0 0 2px var(--prio-solid);
    --prio-text: var(--prio-solid);
  }

  .prio.double-ring {
    background: var(--prio-solid);
    box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.95), 0 0 0 2px var(--prio-solid);
  }

  .prio.stamp {
    background: var(--prio-solid);
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.85);
    filter: saturate(1.05);
  }
  .prio.stamp .prio-inner {
    /* subtle “stamped” texture */
    background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 0);
    background-size: 6px 6px;
    background-position: 0 0;
  }

  .prio.glow {
    background: var(--prio-solid);
    box-shadow: 0 10px 22px rgba(17, 24, 39, 0.16), 0 0 0 3px rgba(255, 255, 255, 0.92);
  }

  .prio:focus-visible {
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.28), 0 10px 22px rgba(17, 24, 39, 0.16);
  }

  .prio:hover {
    transform: translateY(-1px);
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

