<script lang="ts">
  import FlowbiteTooltip from '$lib/components/FlowbiteTooltip.svelte';
  import VisBadgeIcon from './icons/VisBadgeIcon.svelte';
  import type { BadgeData, BadgeIntent } from './types';
  import type { VisBadgeIconName } from './icons/VisBadgeIcon.svelte';

  export type BadgeTone = 'neutral' | 'success' | 'info' | 'warning';

  export let badge: BadgeData;
  /**
   * If true, hover/focus styles are applied and the badge is keyboard focusable.
   */
  export let interactive: boolean = true;

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
          class="badge {tone} {interactive ? 'interactive' : ''}"
          role="note"
          aria-label={badge.label}
          tabindex={interactive ? 0 : undefined}
        >
          {#if iconName}
            <span class="icon" aria-hidden="true">
              <VisBadgeIcon name={iconName} size={18} />
            </span>
          {/if}
          <span class="label">{badge.label}</span>
        </span>
      </span>
      <span slot="content">{badge.description}</span>
    </FlowbiteTooltip>
  {:else}
    <span
      class="badge {tone} {interactive ? 'interactive' : ''}"
      role="note"
      aria-label={badge.label}
      tabindex={interactive ? 0 : undefined}
    >
      {#if iconName}
        <span class="icon" aria-hidden="true">
          <VisBadgeIcon name={iconName} size={18} />
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
    gap: 6px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(17, 24, 39, 0.16);
    background: rgba(255, 255, 255, 0.92);
    color: #111827;
    font-weight: 650;
    font-size: 13px;
    line-height: 1;
    user-select: none;
    outline: none;
  }

  .badge.success {
    border-color: rgba(67, 160, 71, 0.55);
  }

  .badge.info {
    border-color: rgba(30, 136, 229, 0.55);
  }

  .badge.warning {
    border-color: rgba(229, 57, 53, 0.55);
  }

  .badge.interactive {
    cursor: pointer;
    transition: transform 120ms ease, box-shadow 120ms ease, filter 120ms ease;
  }

  .badge.interactive:hover,
  .badge.interactive:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18), 0 10px 20px rgba(17, 24, 39, 0.14);
    filter: saturate(1.05);
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

