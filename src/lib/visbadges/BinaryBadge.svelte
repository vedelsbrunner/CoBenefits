<script lang="ts">
  import BadgeBase from './BadgeBase.svelte';
  import type { BadgeData, ChipColor, ChipSize, ChipVariant, IconKey } from './types';

  export let badge: BadgeData;
  export let size: ChipSize = 'medium';
  export let variant: ChipVariant = 'filled';
  export let chipColor: ChipColor = 'grey';
  export let leftIconKey: IconKey = 'iconIntent';
  export let rightIconKey: IconKey = 'none';
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
    {chipColor}
    {leftIconKey}
    {rightIconKey}
  />
{/if}

