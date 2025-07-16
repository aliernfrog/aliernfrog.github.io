<script>
  export let label;
  export let icon;
  
  const isSVG = icon.endsWith(".svg");
</script>

<div class="button" on:click >
  <img class={isSVG ? "icon-svg" : "icon"} src={icon}> <p1 style:vertical-align="middle">{label}</p1>
</div>

<style>
  .button {
    display: inline-block;
    padding: 4px 8px 4px 8px;
    background-color: var(--surfaceContainer);
    color: var(--onSurface);
    border-radius: 10px;
    transition: background-color 0.3s ease-in-out,
      color 0.3s ease-in-out,
      border-radius 0.3s ease-in-out;
  }
  
  .button:hover {
    background-color: var(--onSurface);
    color: var(--surfaceContainer);
    border-radius: 5px;
  }
  
  .icon {
    width: 1.2rem;
    height: 1.2rem;
    vertical-align: middle;
    border-radius: 5px;
  }
  
  .icon-svg {
    filter: var(--onSurface-filter);
    width: 1.2rem;
    height: 1.2rem;
    vertical-align: middle;
    transition: filter 0.3s ease-in-out;
  }
  
  .button:hover .icon-svg {
    filter: var(--surface-filter);
  }
</style>