<script>
  let {
    display = "block",
    url,
    containerColor = "var(--surfaceContainer)",
    contentColor = "var(--onSurface)",
    hoveredContainerColor = "var(--primary)",
    hoveredContentColor = "var(--onPrimary)",
    children
  } = $props();
</script>

{#snippet card()}
  <div
    class="card"
    style:display={display}
    style="--default-container-color: {containerColor}; --default-content-color: {contentColor}; --hovered-container-color: {hoveredContainerColor}; --hovered-content-color: {hoveredContentColor}">
    {@render children()}
  </div>
{/snippet}

{#if url}
  <a href={url}>
    {@render card()}
  </a>
{:else}
  {@render card()}
{/if}

<style>
  .card {
    --container-color: var(--default-container-color);
    --content-color: var(--default-content-color);
    background-color: var(--default-container-color);
    color: var(--default-content-color);
    padding: 12px;
    border-radius: 20px;
    transition: background-color 0.3s ease-in-out,
      color 0.3s ease-in-out,
      border-radius 0.3s ease-in-out;
  }
  
  .card:hover {
    --container-color: var(--hovered-container-color);
    --content-color: var(--hovered-content-color);
    background-color: var(--hovered-container-color);
    color: var(--hovered-content-color);
    border-radius: 10px;
  }
  
  .card :global(.card-component) {
    transition: color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
  }
</style>