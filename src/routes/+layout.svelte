<script>
  import "../app.css";
  import "$lib/styles/colors.css";
  import colors from "$lib/values/colors.ts";
  import SnowfallEffect from "$lib/ui/widgets/SnowfallEffect.svelte";
  
  let snowfallEnabled = $state(true);
</script>

<svelte:head>
  <meta name="theme-color" content={colors.surface}>
</svelte:head>

<slot />

{#if snowfallEnabled}
  <SnowfallEffect />
  <div style:text-align="center">
    <button
      on:click={() => snowfallEnabled = false}
      style:horizontal-align="center"
      style:border-radius="20px"
      style:opacity="10%">☃️ Tap to disable snowfall</button>
  </div>
{/if}