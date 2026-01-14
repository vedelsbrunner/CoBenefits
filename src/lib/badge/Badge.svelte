<script lang="ts">
  import FlowbiteTooltip from '$lib/components/FlowbiteTooltip.svelte';
  import VisBadgeIcon from './icons/VisBadgeIcon.svelte';
  import { base } from '$app/paths';
  import type { BadgeData, BadgeIntent, BadgeOnClick } from './types';
  import type { VisBadgeIconName } from './icons/VisBadgeIcon.svelte';

  export type BadgeTone = 'neutral' | 'success' | 'info' | 'warning';
  export type BadgeVariant = 'filled' | 'outlined';

  export let badge: BadgeData;
  export let variant: BadgeVariant = 'filled';
  export let mini: boolean = false;
  export let onClick: BadgeOnClick | null = null;

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
  $: iconSize = mini ? 24 : 20;
  $: showTooltip = Boolean(badge?.description) || Boolean(onClick);

  function isExternalHref(href: string, externalFlag?: boolean): boolean {
    if (externalFlag) return true;
    return /^https?:\/\//i.test(href);
  }

  $: external = onClick ? isExternalHref(onClick.href, onClick.external) : false;
  $: href = onClick
    ? external
      ? onClick.href
      : (() => {
          const raw = onClick.href.startsWith('/') ? onClick.href : `/${onClick.href}`;
          return base && raw.startsWith(base + '/') ? raw : `${base}${raw}`;
        })()
    : null;
</script>

{#if badge}
  {#if showTooltip}
    <FlowbiteTooltip placement="top" openDelayMs={mini ? 420 : 80}>
      <span slot="trigger">
        {#if onClick && href}
          <a
            class="badge {tone} {variant} {mini ? 'mini' : ''} interactive"
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            aria-label={badge.label}
          >
            {#if iconName}
              <span class="icon" aria-hidden="true">
                <VisBadgeIcon
                  name={iconName}
                  size={iconSize}
                  bg={variant === 'outlined' ? 'var(--badge-solid)' : '#ffffff'}
                  fg={variant === 'outlined' ? '#ffffff' : 'var(--badge-solid)'}
                  bgOpacity={1}
                />
              </span>
            {/if}
            <span class="label">{badge.label}</span>
          </a>
        {:else}
          <span
            class="badge {tone} {variant} {mini ? 'mini' : ''} interactive"
            role="note"
            aria-label={badge.label}
            tabindex="0"
          >
            {#if iconName}
              <span class="icon" aria-hidden="true">
                <VisBadgeIcon
                  name={iconName}
                  size={iconSize}
                  bg={variant === 'outlined' ? 'var(--badge-solid)' : '#ffffff'}
                  fg={variant === 'outlined' ? '#ffffff' : 'var(--badge-solid)'}
                  bgOpacity={1}
                />
              </span>
            {/if}
            <span class="label">{badge.label}</span>
          </span>
        {/if}
      </span>
      <span slot="content">
        {#if badge.description}
          <span class="tip-desc">{badge.description}</span>
        {/if}
        {#if onClick}
          <span class="tip-hint" aria-label="Click for more">
            <span>Click for more</span>
            <svg class="tip-hint-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M14 5h5v5h-2V8.4l-6.3 6.3-1.4-1.4L15.6 7H14V5ZM5 7h6v2H7v10h10v-4h2v6H5V7Z"
                fill="currentColor"
              />
            </svg>
          </span>
        {/if}
      </span>
    </FlowbiteTooltip>
  {:else}
    {#if onClick && href}
      <a
        class="badge {tone} {variant} {mini ? 'mini' : ''} interactive"
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={badge.label}
      >
        {#if iconName}
          <span class="icon" aria-hidden="true">
            <VisBadgeIcon
              name={iconName}
              size={iconSize}
              bg={variant === 'outlined' ? 'var(--badge-solid)' : '#ffffff'}
              fg={variant === 'outlined' ? '#ffffff' : 'var(--badge-solid)'}
              bgOpacity={1}
            />
          </span>
        {/if}
        <span class="label">{badge.label}</span>
      </a>
    {:else}
      <span
        class="badge {tone} {variant} {mini ? 'mini' : ''} interactive"
        role="note"
        aria-label={badge.label}
        tabindex="0"
      >
        {#if iconName}
          <span class="icon" aria-hidden="true">
            <VisBadgeIcon
              name={iconName}
              size={iconSize}
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
{/if}

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--badge-gap);
    padding: var(--badge-pad-y) var(--badge-pad-x);
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
    --badge-gap: 3px;
    --badge-pad-y: 3px;
    --badge-pad-x: 6px;
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

  a.badge {
    text-decoration: none;
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

  .tip-desc {
    display: block;
  }

  .tip-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    white-space: nowrap;
    color: rgba(255, 255, 255, 0.92);
    font: inherit;
    line-height: inherit;
    opacity: 0.95;
    margin-top: 6px;
    font-size: 11px;
  }

  .tip-hint-icon {
    width: 12px;
    height: 12px;
    display: block;
    opacity: 0.95;
  }

  /* Mini mode: collapsed icon-only; expands on hover/focus using the same outlined badge styling. */
  .badge.mini {
    --badge-gap: 0px;
    --badge-pad-y: 0px;
    --badge-pad-x: 0px;
    border-color: transparent; /* hide outlined border in collapsed state */
    background: transparent; /* no pill in collapsed state */
  }

  .badge.mini .label {
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-width 320ms cubic-bezier(0.2, 0, 0, 1), opacity 200ms ease;
  }

  .badge.mini:hover,
  .badge.mini:focus-visible {
    --badge-gap: 3px;
    --badge-pad-y: 3px;
    --badge-pad-x: 6px;
  }

  .badge.mini.outlined:hover,
  .badge.mini.outlined:focus-visible {
    border-color: var(--badge-border);
  }

  .badge.mini:hover .label,
  .badge.mini:focus-visible .label {
    max-width: 220px;
    opacity: 1;
  }

  /* Mini interaction should feel subtle (no lift), while still being clearly interactive. */
  .badge.mini.interactive {
    transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease,
      padding 320ms cubic-bezier(0.2, 0, 0, 1);
  }

  .badge.mini.interactive:hover,
  .badge.mini.interactive:focus-visible {
    transform: none;
    box-shadow: none;
  }

  /* Keep a clean keyboard-only focus ring (no drop shadow). */
  .badge.mini.interactive:focus-visible {
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.25);
  }
</style>

