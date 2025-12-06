<script>
  import "../app.css";
  import "$lib/styles/colors.css";
  import colors from "$lib/values/colors.ts";
</script>

<svelte:head>
  <meta name="theme-color" content={colors.surface}>
</svelte:head>

<slot />