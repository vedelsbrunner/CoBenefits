<script lang="ts">
  import BadgeBase from './BadgeBase.svelte';
  import { computeChipColor } from './badgeUtils';
  import type { ColorMode } from './badgeUtils';
  import type { BadgeData, ChipColor, ChipSize, ChipVariant, IconKey } from './types';

  export let badge: BadgeData;
  export let size: ChipSize = 'medium';
  export let variant: ChipVariant = 'filled';
  // If null/undefined, we compute chipColor from intent/mono settings.
  export let chipColor: ChipColor | null = null;
  export let colorMode: ColorMode = 'intent';
  export let baseColor: ChipColor = 'grey';
  export let leftIconKey: IconKey = 'iconIntent';
  export let rightIconKey: IconKey = 'none';

  $: effectiveChipColor = chipColor ?? computeChipColor(badge, colorMode, baseColor);
</script>

{#if badge}
  <BadgeBase
    label={badge.label}
    description={badge.description ?? ''}
    avatar={badge.avatar}
    intent={badge.intent}
    type={badge.type}
    {size}
    {variant}
    chipColor={effectiveChipColor}
    {leftIconKey}
    {rightIconKey}
  />
{/if}

