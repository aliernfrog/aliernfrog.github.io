<script>
  export let label;
  export let icon;
  export let unhoveredOpacity = "100%";
</script>

<div
  class="button"
  style={`--unhovered-opacity: ${unhoveredOpacity}`}
  on:click >
  <img class="icon" src={icon}> <p1 style:vertical-align="middle">{label}</p1>
</div>

<style>
  .button {
    display: inline-block;
    padding: 8px;
    background-color: transparent;
    color: var(--onSurface);
    border: 1px solid var(--onSurface);
    border-radius: 15px;
    opacity: var(--unhovered-opacity);
    transition: background-color 0.3s ease-in-out,
      color 0.3s ease-in-out,
      border-radius 0.3s ease-in-out,
      opacity 0.3s ease-in-out;
  }
  
  .button:hover {
    background-color: var(--onSurface);
    color: var(--surface);
    border-radius: 10px;
    opacity: 100%;
  }
  
  .icon {
    filter: var(--onSurface-filter);
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: middle;
    transition: filter 0.3s ease-in-out;
  }
  
  .button:hover .icon {
    filter: var(--surface-filter);
  }
</style>