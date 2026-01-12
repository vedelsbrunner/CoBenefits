<script lang="ts">
  import VisBadgeIcon from './icons/VisBadgeIcon.svelte';
  import { resolveIntentIconName, resolveScopeIconName } from './iconMappings';
  import type { BadgeAvatar, ChipColor, ChipSize, ChipVariant, IconKey } from './types';
  import FlowbiteTooltip from '$lib/components/FlowbiteTooltip.svelte';
  import type { TooltipPlacement } from '$lib/components/FlowbiteTooltip.svelte';

  export let label: string;
  export let description: string = '';
  export let avatar: BadgeAvatar | undefined = undefined;
  export let intent: string | undefined = undefined;
  export let type: string | undefined = undefined;
  export let size: ChipSize = 'medium';
  export let variant: ChipVariant = 'filled';
  export let leftIconKey: IconKey = 'iconIntent';
  export let rightIconKey: IconKey = 'none';
  export let chipColor: ChipColor = 'grey';
  export let fontWeight: number = 700;
  export let tooltipPlacement: TooltipPlacement = 'top';
  export let interactive: boolean = true;

  const sizeMap: Record<ChipSize, { py: number; px: number; font: number; icon: number; hideLabel: boolean }> = {
    small: { py: 0, px: 0, font: 12, icon: 22, hideLabel: true },
    medium: { py: 2, px: 8, font: 14, icon: 16, hideLabel: false },
    large: { py: 1, px: 5, font: 18, icon: 24, hideLabel: false },
  };

  function resolveIconName(key: IconKey): string {
    if (key === 'none' || key === 'avatar') return '';
    if (key === 'iconIntent') return resolveIntentIconName(intent);
    if (key === 'iconScope') return resolveScopeIconName(type);
    return '';
  }

  $: ui = sizeMap[size] ?? sizeMap.medium;
  $: leftIconName = resolveIconName(leftIconKey);
  $: rightIconName = resolveIconName(rightIconKey);

  const colorTokens: Record<string, { border: string; fg: string; bg: string }> = {
    grey: { border: 'rgba(17, 24, 39, 0.20)', fg: '#111827', bg: 'rgba(17, 24, 39, 0.06)' },
    black: { border: 'rgba(17, 24, 39, 0.90)', fg: '#ffffff', bg: 'rgba(17, 24, 39, 0.92)' },
    // Material UI palette (600):
    // green[600] = #43A047, blue[600] = #1E88E5, red[600] = #E53935
    success: { border: 'rgba(67, 160, 71, 0.55)', fg: '#ffffff', bg: '#43A047' },
    info: { border: 'rgba(30, 136, 229, 0.55)', fg: '#ffffff', bg: '#1E88E5' },
    warning: { border: 'rgba(229, 57, 53, 0.55)', fg: '#ffffff', bg: '#E53935' },
    primary: { border: 'rgba(99, 102, 241, 0.40)', fg: 'rgb(55, 48, 163)', bg: 'rgba(99, 102, 241, 0.18)' },
    secondary: { border: 'rgba(236, 72, 153, 0.40)', fg: 'rgb(131, 24, 67)', bg: 'rgba(236, 72, 153, 0.18)' },
  };

  $: baseTokens = colorTokens[chipColor] ?? colorTokens.grey;
  // In outlined chips the background is transparent, so a "white" foreground (used for filled black)
  // becomes invisible. Keep mono black readable by switching to a dark foreground in outlined mode.
  $: tokens =
    variant === 'outlined'
      ? {
          ...baseTokens,
          fg: chipColor === 'black' ? '#111827' : baseTokens.fg
        }
      : baseTokens;
</script>

{#if description}
  <FlowbiteTooltip placement={tooltipPlacement}>
    <span slot="trigger" class="wrap">
      <span
        class="chip {variant} {ui.hideLabel ? 'mini' : ''} {interactive ? 'interactive' : ''}"
        style="--pad-y:{ui.py}px; --pad-x:{ui.px}px; --font:{ui.font}px; --icon:{ui.icon}px; --chip-border:{tokens.border}; --chip-fg:{tokens.fg}; --chip-bg:{tokens.bg}; --chip-weight:{fontWeight};"
        tabindex="0"
        role="note"
        aria-label={label}
      >
        {#if leftIconKey === 'avatar' && avatar}
          {#if avatar.type === 'letter'}
            <span class="avatar">{avatar.value}</span>
          {:else if avatar.type === 'image'}
            <img class="avatar-img" src={avatar.value} alt="" />
          {/if}
        {:else if leftIconName}
          <span class="icon left" aria-hidden="true">
            <VisBadgeIcon name={leftIconName} size={ui.icon} />
          </span>
        {/if}

        {#if !ui.hideLabel}
          <span class="label">{label}</span>
        {/if}

        {#if rightIconName}
          <span class="icon right" aria-hidden="true">
            <VisBadgeIcon name={rightIconName} size={ui.icon} />
          </span>
        {/if}
      </span>
    </span>

    <span slot="content">
      {description}
    </span>
  </FlowbiteTooltip>
{:else}
  <span class="wrap">
    <span
      class="chip {variant} {ui.hideLabel ? 'mini' : ''} {interactive ? 'interactive' : ''}"
      style="--pad-y:{ui.py}px; --pad-x:{ui.px}px; --font:{ui.font}px; --icon:{ui.icon}px; --chip-border:{tokens.border}; --chip-fg:{tokens.fg}; --chip-bg:{tokens.bg}; --chip-weight:{fontWeight};"
      tabindex="0"
      role="note"
      aria-label={label}
    >
      {#if leftIconKey === 'avatar' && avatar}
        {#if avatar.type === 'letter'}
          <span class="avatar">{avatar.value}</span>
        {:else if avatar.type === 'image'}
          <img class="avatar-img" src={avatar.value} alt="" />
        {/if}
      {:else if leftIconName}
        <span class="icon left" aria-hidden="true">
          <VisBadgeIcon name={leftIconName} size={ui.icon} />
        </span>
      {/if}

      {#if !ui.hideLabel}
        <span class="label">{label}</span>
      {/if}

      {#if rightIconName}
        <span class="icon right" aria-hidden="true">
          <VisBadgeIcon name={rightIconName} size={ui.icon} />
        </span>
      {/if}
    </span>
  </span>
{/if}

<style>
  .wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: var(--pad-y) var(--pad-x);
    box-sizing: border-box;
    border-radius: 999px;
    font-weight: var(--chip-weight, 700);
    font-size: var(--font);
    line-height: 1;
    user-select: none;
    cursor: default;
    outline: none;
    border: 1px solid var(--chip-border, rgba(17, 24, 39, 0.16));
    color: var(--chip-fg, #111827);
    background: var(--chip-bg, rgba(255, 255, 255, 0.92));
    /* No glass/blur by default (cleaner + predictable over charts). */
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    box-shadow: none;
    transition: transform 120ms ease, box-shadow 120ms ease, filter 120ms ease;
  }

  .chip.filled {
    background: var(--chip-bg, rgba(255, 255, 255, 0.92));
  }

  .chip.outlined {
    background: rgba(255, 255, 255, 0);
    box-shadow: none;
  }

  .chip:focus-visible {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }

  .chip.interactive {
    cursor: pointer;
  }

  .chip.interactive:hover,
  .chip.interactive:focus-visible {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 0 0 3px var(--chip-border, rgba(17, 24, 39, 0.18)), 0 10px 20px rgba(17, 24, 39, 0.18);
    filter: saturate(1.05);
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: currentColor;
  }

  .label {
    white-space: nowrap;
  }

  .mini {
    /* compact, perfectly circular chip when the label is hidden */
    padding: 5px;
    width: calc(var(--icon) + 10px);
    height: calc(var(--icon) + 10px);
    min-width: unset;
    justify-content: center;
  }

  .avatar {
    width: var(--icon);
    height: var(--icon);
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: calc(var(--font) - 1px);
    background: rgba(17, 24, 39, 0.08);
  }

  .avatar-img {
    width: var(--icon);
    height: var(--icon);
    border-radius: 999px;
    object-fit: cover;
    display: block;
  }

  /* Colors are set via CSS variables inline (keeps dynamic coloring reliable). */

  /* Tooltip is handled by FlowbiteTooltip. */
</style>

