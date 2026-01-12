<script lang="ts">
  import VisBadgeIcon from './icons/VisBadgeIcon.svelte';
  import { resolveIntentIconName, resolveScopeIconName } from './iconMappings';
  import type { BadgeAvatar, ChipColor, ChipSize, ChipVariant, IconKey } from './types';

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

  const sizeMap: Record<ChipSize, { py: number; px: number; font: number; icon: number; hideLabel: boolean }> = {
    small: { py: 0, px: 0, font: 12, icon: 22, hideLabel: true },
    medium: { py: 1, px: 3, font: 14, icon: 22, hideLabel: false },
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
    success: { border: 'rgba(34, 197, 94, 0.40)', fg: 'rgb(22, 101, 52)', bg: 'rgba(34, 197, 94, 0.18)' },
    warning: { border: 'rgba(245, 158, 11, 0.48)', fg: 'rgb(146, 64, 14)', bg: 'rgba(245, 158, 11, 0.20)' },
    info: { border: 'rgba(59, 130, 246, 0.40)', fg: 'rgb(30, 64, 175)', bg: 'rgba(59, 130, 246, 0.18)' },
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

<span class="wrap">
  <span
    class="chip {variant} {ui.hideLabel ? 'mini' : ''}"
    style="--pad-y:{ui.py}px; --pad-x:{ui.px}px; --font:{ui.font}px; --icon:{ui.icon}px; --chip-border:{tokens.border}; --chip-fg:{tokens.fg}; --chip-bg:{tokens.bg};"
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

  {#if description}
    <span class="tooltip" role="tooltip">
      {description}
    </span>
  {/if}
</span>

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
    font-weight: 700;
    font-size: var(--font);
    line-height: 1;
    user-select: none;
    cursor: default;
    outline: none;
    border: 1px solid var(--chip-border, rgba(17, 24, 39, 0.16));
    color: var(--chip-fg, #111827);
    background: var(--chip-bg, rgba(255, 255, 255, 0.92));
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    box-shadow: 0 1px 0 rgba(17, 24, 39, 0.04);
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

  .tooltip {
    position: absolute;
    left: 0;
    top: calc(100% + 10px);
    z-index: 30;
    width: min(360px, 70vw);
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(17, 24, 39, 0.12);
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 10px 30px rgba(17, 24, 39, 0.12);
    color: rgba(17, 24, 39, 0.85);
    font-size: 13px;
    line-height: 1.35;

    opacity: 0;
    transform: translateY(-6px);
    pointer-events: none;
    transition: opacity 140ms ease, transform 140ms ease;
  }

  .wrap:hover .tooltip,
  .wrap:focus-within .tooltip {
    opacity: 1;
    transform: translateY(0);
  }
</style>

