<script lang="ts">
  export let name: string;
  export let size: number = 18;
</script>

{#if name === 'CheckCircle'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" fill="currentColor" opacity="0.14" />
    <path
      d="M9.2 12.5 7.5 10.8a1 1 0 0 0-1.4 1.4l2.4 2.4a1 1 0 0 0 1.4 0l7-7a1 1 0 1 0-1.4-1.4l-6.3 6.3Z"
      fill="currentColor"
    />
  </svg>
{:else if name === 'Warning'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3.5c.4 0 .8.2 1 .6l9 15.6c.4.7-.1 1.6-1 1.6H3c-.9 0-1.4-.9-1-1.6l9-15.6c.2-.4.6-.6 1-.6Z"
      fill="currentColor"
      opacity="0.14"
    />
    <path d="M12 8a1 1 0 0 1 1 1l-.3 5.5a.7.7 0 0 1-1.4 0L11 9a1 1 0 0 1 1-1Z" fill="currentColor" />
    <path d="M12 18a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 18Z" fill="currentColor" />
  </svg>
{:else if name === 'Info'}
  <!-- square info icon (matches the reference's special-cased "Info") -->
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 3h18v18H3V3Z" fill="currentColor" opacity="0.14" />
    <path d="M12 10.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
    <path d="M11 11.5h2V18h-2v-6.5Z" fill="currentColor" />
  </svg>
{:else if name === 'DatasetOutlined'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Z" fill="currentColor" opacity="0.14" />
    <path
      d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
  </svg>
{:else if name === 'AnalyticsOutlined'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 19V5h14v14H5Z" fill="currentColor" opacity="0.14" />
    <path d="M7 17V13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    <path d="M12 17V10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    <path d="M17 17V8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
  </svg>
{:else if name === 'BubbleChartOutlined'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="8" cy="14" r="4" fill="currentColor" opacity="0.14" />
    <circle cx="15.5" cy="9.5" r="3.5" fill="currentColor" opacity="0.14" />
    <circle cx="16.5" cy="16.5" r="2.5" fill="currentColor" opacity="0.14" />
    <circle cx="8" cy="14" r="4" stroke="currentColor" stroke-width="1.4" />
    <circle cx="15.5" cy="9.5" r="3.5" stroke="currentColor" stroke-width="1.4" />
    <circle cx="16.5" cy="16.5" r="2.5" stroke="currentColor" stroke-width="1.4" />
  </svg>
{:else if name === 'TouchAppOutlined'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 11.5V6.8a1.8 1.8 0 1 1 3.6 0V12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    <path
      d="M12.6 12.2V9.5a1.5 1.5 0 1 1 3 0v3.2"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <path
      d="M15.6 12.7v-1.2a1.4 1.4 0 1 1 2.8 0v4.2c0 2.6-1.7 4.3-4.3 4.3H12c-2.3 0-3.2-1-4-2.4l-1.6-3"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
{:else if name === 'QueryStatsOutlined'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 6h16v12H4V6Z" fill="currentColor" opacity="0.14" />
    <path d="M7 15l2-3 2 2 3-5 2 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7 9h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
  </svg>
{:else}
  <span style="display:inline-block;width:{size}px;height:{size}px" aria-hidden="true" />
{/if}

