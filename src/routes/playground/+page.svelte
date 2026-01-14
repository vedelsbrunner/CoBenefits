<script lang="ts">
  import NavigationBar from '$lib/components/NavigationBar.svelte';
  import BinaryBadge from '$lib/badge/BinaryBadge.svelte';
  import type { BadgeData } from '$lib/badge/types';

  let interactive = true;

  const samples: BadgeData[] = [
    {
      id: '2',
      label: 'Open Data',
      description:
        'Indicates that the visualization uses publicly accessible data, which can be downloaded, verified, or reused.',
      type: 'DATA',
      intent: 'CONFIRMATION'
    },
    {
      id: '92',
      label: 'Truncated Axis',
      description:
        'Indicates that the visualization uses a truncated axis, which can affect perception of differences.',
      type: 'VISUAL ENCODING',
      intent: 'WARNING'
    },
    {
      id: '31',
      label: 'Uncertainty Shown',
      description: 'Indicates that uncertainty is explicitly shown (e.g., intervals, error bars, bands, or ranges).',
      type: 'ANALYSIS',
      intent: 'INFORMATION'
    }
  ];
</script>

<NavigationBar />

<main class="playground">
  <h1 class="title">Playground</h1>
  <p class="subtitle">
    Small demo page for visualization badges.
  </p>

  <section class="controls" aria-label="Badge design controls">
    <div class="controls-row">
      <label class="control checkbox">
        <span class="control-label">Interactive</span>
        <input type="checkbox" bind:checked={interactive} />
      </label>
    </div>
  </section>

  <div class="badge-row">
    {#each samples as badge (badge.id)}
      <div class="badge-block">
        <BinaryBadge {badge} {interactive} />
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
</style>
