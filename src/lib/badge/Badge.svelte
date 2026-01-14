<script lang="ts">
  import FlowbiteTooltip from '$lib/components/FlowbiteTooltip.svelte';
  import VisBadgeIcon from './icons/VisBadgeIcon.svelte';
  import type { BadgeData, BadgeIntent } from './types';
  import type { VisBadgeIconName } from './icons/VisBadgeIcon.svelte';

  export type BadgeTone = 'neutral' | 'success' | 'info' | 'warning';
  export type BadgeVariant = 'filled' | 'outlined';

  export let badge: BadgeData;
  export let variant: BadgeVariant = 'filled';

  function toIntent(value: unknown): BadgeIntent | undefined {
    if (typeof value !== 'string') return undefined;
    const normalized = value.normalize('NFKC').replace(/\s+/g, ' ').trim().toUpperCase();
    if (normalized === 'CONFIRMATION') return 'CONFIRMATION';
    if (normalized === 'INFORMATION') return 'INFORMATION';
    if (normalized === 'WARNING') return 'WARNING';
    return undefined;
  }

  function intentToTone(intent?: BadgeIntent): BadgeTone {
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
</script>

{#if badge}
  {#if badge.description}
    <FlowbiteTooltip placement="top">
      <span slot="trigger">
        <span
          class="badge {tone} {variant} interactive"
          role="note"
          aria-label={badge.label}
          tabindex="0"
        >
          {#if iconName}
            <span class="icon" aria-hidden="true">
              <VisBadgeIcon
                name={iconName}
                size={20}
                bg={variant === 'outlined' ? 'var(--badge-solid)' : '#ffffff'}
                fg={variant === 'outlined' ? '#ffffff' : 'var(--badge-solid)'}
                bgOpacity={1}
              />
            </span>
          {/if}
          <span class="label">{badge.label}</span>
        </span>
      </span>
      <span slot="content">{badge.description}</span>
    </FlowbiteTooltip>
  {:else}
    <span
      class="badge {tone} {variant} interactive"
      role="note"
      aria-label={badge.label}
      tabindex="0"
    >
      {#if iconName}
        <span class="icon" aria-hidden="true">
          <VisBadgeIcon
            name={iconName}
            size={20}
            bg={variant === 'outlined' ? 'var(--badge-solid)' : '#ffffff'}
            fg={variant === 'outlined' ? '#ffffff' : 'var(--badge-solid)'}
            bgOpacity={1}
          />
        </span>
      {/if}
      <span class="label">{badge.label}</span>
    </span>
  {/if}
{/if}

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 3px 6px;
    border-radius: 16px;
    border: 1px solid transparent;
    font-weight: 500;
    font-size: 14px;
    line-height: 1;
    user-select: none;
    outline: none;
    transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease, box-shadow 120ms ease,
      transform 120ms ease;

    /* Tokens (overridden by tone classes) */
    --badge-border: rgba(17, 24, 39, 0.22);
    --badge-fg: rgb(17, 24, 39);
    --badge-bg: rgba(17, 24, 39, 0.08);
    --badge-bg-hover: rgba(17, 24, 39, 0.12);
    --badge-solid: rgb(17, 24, 39);
  }

  /* Tone tokens (roughly aligned with MUI palette intent) */
  .badge.neutral {
    --badge-border: rgba(17, 24, 39, 0.22);
    --badge-fg: rgb(17, 24, 39);
    --badge-bg: rgba(17, 24, 39, 0.08);
    --badge-bg-hover: rgba(17, 24, 39, 0.12);
    --badge-solid: rgb(17, 24, 39);
  }

  .badge.success {
    --badge-border: rgba(46, 125, 50, 0.65); /* ~MUI success.main */
    --badge-fg: rgb(27, 94, 32); /* ~MUI success.dark */
    --badge-bg: rgba(46, 125, 50, 0.14);
    --badge-bg-hover: rgba(46, 125, 50, 0.22);
    --badge-solid: rgb(46, 125, 50);
  }

  .badge.info {
    --badge-border: rgba(2, 136, 209, 0.65); /* ~MUI info.main */
    --badge-fg: rgb(1, 87, 155); /* ~MUI info.dark-ish */
    --badge-bg: rgba(2, 136, 209, 0.14);
    --badge-bg-hover: rgba(2, 136, 209, 0.22);
    --badge-solid: rgb(2, 136, 209);
  }

  .badge.warning {
    --badge-border: rgba(237, 108, 2, 0.70); /* ~MUI warning.main */
    --badge-fg: rgb(191, 54, 12); /* ~MUI warning.dark-ish */
    --badge-bg: rgba(237, 108, 2, 0.14);
    --badge-bg-hover: rgba(237, 108, 2, 0.22);
    --badge-solid: rgb(237, 108, 2);
  }

  /* Variants */
  .badge.filled {
    background: var(--badge-solid);
    border-color: transparent;
    color: #ffffff;
  }

  .badge.outlined {
    background: transparent;
    border-color: var(--badge-border);
    color: var(--badge-fg);
  }

  .badge.interactive {
    cursor: pointer;
  }

  .badge.interactive:hover,
  .badge.interactive:focus-visible {
    transform: translateY(-1px);
  }

  .badge.interactive:hover {
    background: var(--badge-bg-hover);
  }

  /* Filled hover = darker solid (MUI-like) */
  .badge.filled.interactive:hover {
    background: var(--badge-fg);
  }

  /* MUI-ish focus ring */
  .badge.interactive:focus-visible {
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.25);
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .label {
    white-space: nowrap;
  }
</style>

