<script lang="ts">
  import NavigationBar from '$lib/components/NavigationBar.svelte';
  import { computeChipColor, mapIntentToColor } from '$lib/visbadges/badgeUtils';
  import BinaryBadge from '$lib/visbadges/BinaryBadge.svelte';

  import type { ChipColor, ChipSize, ChipVariant, IconKey, BadgeData } from '$lib/visbadges/types';
  import type { ColorMode } from '$lib/visbadges/badgeUtils';

  // Design controls (mirrors the reference abstraction)
  let size: ChipSize = 'medium';
  let variant: ChipVariant = 'filled';
  let leftIconKey: IconKey = 'iconIntent';
  let rightIconKey: IconKey = 'none';
  // default should be colored by intent
  let colorMode: ColorMode = 'intent';
  // used when colorMode === 'mono'
  let baseColor: ChipColor = 'grey';
  let showDebug = false;

  const samples: BadgeData[] = [
    {
      badgeType: 'BINARY',
      id: '2',
      label: 'Open Data',
      description:
        'Indicates that the visualization uses publicly accessible data, which can be downloaded, verified, or reused.',
      type: 'DATA',
      intent: 'CONFIRMATION'
    },
    {
      badgeType: 'BINARY',
      id: '92',
      label: 'Truncated Axis',
      description:
        'Indicates that the visualization uses a truncated axis, which can affect perception of differences.',
      type: 'VISUAL ENCODING',
      intent: 'WARNING'
    },
    {
      badgeType: 'BINARY',
      id: '31',
      label: 'Uncertainty Shown',
      description: 'Indicates that uncertainty is explicitly shown (e.g., intervals, error bars, bands, or ranges).',
      type: 'ANALYSIS',
      intent: 'INFORMATION'
    }
  ];

  function chipColorFor(badge: BadgeData) {
    return computeChipColor(badge, colorMode, baseColor);
  }
</script>

<NavigationBar />

<main class="playground">
  <h1 class="title">Playground</h1>
  <p class="subtitle">
    Experimental area for prototyping binary visualization badges (Svelte port of the reference abstractions).
  </p>

  <div class="status">
    Mode: <strong>{colorMode}</strong>
    {#if colorMode === 'mono'}
      · Mono color: <strong>{baseColor}</strong>
    {/if}
  </div>

  <section class="controls" aria-label="Badge design controls">
    <div class="controls-row">
      <label class="control">
        <span class="control-label">Size</span>
        <select bind:value={size}>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
      </label>

      <label class="control">
        <span class="control-label">Variant</span>
        <select bind:value={variant}>
          <option value="filled">filled</option>
          <option value="outlined">outlined</option>
        </select>
      </label>

      <label class="control">
        <span class="control-label">Left icon</span>
        <select bind:value={leftIconKey}>
          <option value="iconIntent">iconIntent</option>
          <option value="iconScope">iconScope</option>
          <option value="none">none</option>
        </select>
      </label>

      <label class="control">
        <span class="control-label">Right icon</span>
        <select bind:value={rightIconKey}>
          <option value="none">none</option>
          <option value="iconIntent">iconIntent</option>
          <option value="iconScope">iconScope</option>
        </select>
      </label>

      <label class="control">
        <span class="control-label">Color mode</span>
        <select bind:value={colorMode}>
          <option value="intent">intent</option>
          <option value="mono">mono</option>
        </select>
      </label>

      <label class="control" class:disabled={colorMode !== 'mono'}>
        <span class="control-label">Mono color</span>
        <select bind:value={baseColor} disabled={colorMode !== 'mono'}>
          <option value="grey">grey</option>
          <option value="black">black</option>
        </select>
      </label>

      <label class="control checkbox">
        <span class="control-label">Debug</span>
        <input type="checkbox" bind:checked={showDebug} />
      </label>
    </div>
  </section>

  <div class="badge-row">
    {#each samples as badge (badge.id)}
      <div class="badge-block">
        <BinaryBadge
          {badge}
          {size}
          {variant}
          {leftIconKey}
          {rightIconKey}
          {colorMode}
          {baseColor}
        />
        {#if showDebug}
          <div class="debug">
            mode=<strong>{colorMode}</strong> · baseColor=<strong>{baseColor}</strong> · chipColor=<strong>{chipColorFor(badge)}</strong>
            · rawIntent=<strong>{JSON.stringify(badge.intent)}</strong> · mappedIntent=<strong>{mapIntentToColor(badge.intent)}</strong>
            · type=<strong>{badge.type}</strong>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</main>

<style>
  .playground {
    max-width: 980px;
    margin: 24px auto;
    padding: 0 16px;
  }

  .title {
    margin: 0 0 8px 0;
    font-size: 28px;
  }

  .subtitle {
    margin: 0 0 16px 0;
    color: rgba(17, 24, 39, 0.75);
    line-height: 1.45;
  }

  .status {
    margin: 0 0 10px 0;
    font-size: 13px;
    color: rgba(17, 24, 39, 0.75);
  }

  .badge-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  }

  .badge-block {
    display: grid;
    gap: 6px;
  }

  .debug {
    font-size: 12px;
    color: rgba(17, 24, 39, 0.65);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }

  .controls {
    margin: 12px 0 14px 0;
    padding: 12px;
    border: 1px solid rgba(17, 24, 39, 0.1);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }

  .controls-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: end;
  }

  .control {
    display: grid;
    gap: 6px;
    min-width: 150px;
  }

  .checkbox {
    min-width: 110px;
  }

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    accent-color: #111827;
  }

  .control-label {
    font-size: 12px;
    font-weight: 800;
    color: rgba(17, 24, 39, 0.7);
  }

  select {
    height: 34px;
    padding: 0 10px;
    border-radius: 10px;
    border: 1px solid rgba(17, 24, 39, 0.14);
    background: rgba(255, 255, 255, 0.9);
    font-weight: 650;
    color: rgba(17, 24, 39, 0.9);
  }

  .disabled {
    opacity: 0.55;
  }
</style>
