<script lang="ts">
  export type VisBadgeTone = 'neutral' | 'info' | 'warn';

  export let label: string;
  export let description: string;
  export let iconSrc: string;
  export let tone: VisBadgeTone = 'neutral';
  export let href: string | null = null;
</script>

<span class="wrap">
  {#if href}
    <a class="badge {tone}" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <img class="icon" src={iconSrc} alt="" />
      <span class="text">{label}</span>
    </a>
  {:else}
    <span class="badge {tone}" role="note" aria-label={label}>
      <img class="icon" src={iconSrc} alt="" />
      <span class="text">{label}</span>
    </span>
  {/if}

  <span class="popover" role="tooltip">
    <span class="popover-title">{label}</span>
    <span class="popover-desc">{description}</span>
  </span>
</span>

<style>
  .wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(17, 24, 39, 0.14);
    background: rgba(255, 255, 255, 0.9);
    color: #111827;
    font-weight: 700;
    font-size: 13px;
    line-height: 1;
    user-select: none;
    box-shadow: 0 1px 0 rgba(17, 24, 39, 0.04);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }

  a.badge {
    text-decoration: none;
  }

  .badge:hover {
    border-color: rgba(17, 24, 39, 0.22);
  }

  .badge:focus-visible {
    outline: 3px solid rgba(59, 130, 246, 0.35);
    outline-offset: 2px;
  }

  .icon {
    width: 22px;
    height: 22px;
    display: block;
  }

  .text {
    white-space: nowrap;
  }

  .badge.info {
    border-color: rgba(37, 99, 235, 0.22);
  }

  .badge.warn {
    border-color: rgba(245, 158, 11, 0.32);
  }

  .popover {
    position: absolute;
    left: 0;
    top: calc(100% + 10px);
    z-index: 20;
    width: min(340px, 70vw);
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(17, 24, 39, 0.12);
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 10px 30px rgba(17, 24, 39, 0.12);
    color: #111827;

    opacity: 0;
    transform: translateY(-6px);
    pointer-events: none;
    transition: opacity 140ms ease, transform 140ms ease;
  }

  .popover-title {
    display: block;
    font-weight: 800;
    font-size: 13px;
    margin-bottom: 4px;
  }

  .popover-desc {
    display: block;
    font-size: 13px;
    line-height: 1.35;
    color: rgba(17, 24, 39, 0.78);
  }

  /* show on hover/focus */
  .wrap:hover .popover,
  .wrap:focus-within .popover {
    opacity: 1;
    transform: translateY(0);
  }
</style>

