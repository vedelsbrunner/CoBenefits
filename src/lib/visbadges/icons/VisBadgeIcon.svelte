<script lang="ts">
  export type VisBadgeIconName = 'CheckCircle' | 'Warning' | 'Info';
  export let name: VisBadgeIconName;
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
{:else}
  <span style="display:inline-block;width:{size}px;height:{size}px" aria-hidden="true" />
{/if}

