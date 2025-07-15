<script>
  import { onDestroy, onMount } from "svelte";
  import { scale, slide } from "svelte/transition";
  import LargeIcon from "../components/LargeIcon.svelte";
  import OutlinedButton from "../components/OutlinedButton.svelte";

  let {
    title,
    description,
    icon,
    sideTitle,
    colors, // 2 allowed
    containerColor = "var(--surfaceContainer)",
    contentColor = "var(--onSurface)",
    children
  } = $props();
  
  if (!colors) colors = [ containerColor, containerColor ];
  if (colors.length === 1) colors = [ colors[0], colors[0] ];
  
  let currentScrollY = $state(0);
  let largeTopBarHeight = $state(0);
  let showSmallTopBar = $derived(currentScrollY > largeTopBarHeight);
  
  function handleScroll() {
    currentScrollY = window.scrollY;
  }
  
  onMount(() => {
    const largeTopBarEl = document.getElementById("large-topbar");
    if (largeTopBarEl) largeTopBarHeight = largeTopBarEl.offsetHeight;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<div
  class="topbar"
  id="large-topbar"
  style:background-color={containerColor}
  style:color={contentColor}
  style:border-radius="20px"
  style:padding="12px"
  style={`--color-a: ${colors[0]}; --color-b: ${colors[1]}`}>
  <LargeIcon src={icon} />
  <p1 style:margin-left="8px" style:font-size="2rem" style:vertical-align="middle"><b>{title}</b></p1>
  {#if sideTitle}
    <p1 style:font-size="0.8rem" style:opacity="70%" style:vertical-align="middle">{sideTitle}</p1>
  {/if}
  <div style:margin-top="8px" />
  <p1>{description}</p1>
  {#if children}
    {@render children()}
  {/if}
</div>

{#if showSmallTopBar}
  <div
    transition:slide
    style:position="fixed"
    style:top="0"
    style:left="0"
    style:margin="0"
    style:padding="12px"
    style:z-index="1000"
    style:text-align="center"
    style:width="94%">
    <div
      style:display="inline-block"
      style:background-color="#30002977"
      style:backdrop-filter="blur(5px)"
      style:border-radius="15px"
      style:border="0.1px solid var(--onSurface)"
      style:padding="12px">
      <LargeIcon src={icon} />
      <p1 style:font-size="1.8rem" style:margin="0px 24px 0px 24px" style:vertical-align="middle"><b>{title}</b></p1>
      <OutlinedButton label="" icon="/icons/arrow_upward.svg" on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
    </div>
  </div>
{/if}

<style>
  .topbar {
    background: linear-gradient(70deg, var(--color-a), var(--color-b));
    background-size: 200% 200%;
    animation: rotateGradient 3s infinite linear;
  }
  
  @keyframes rotateGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
</style>