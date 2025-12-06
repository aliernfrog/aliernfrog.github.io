<!--
  TODO: Fix suddenly disappearing snowflakes
  as a workaround to this, i just made them slowly fade away when wind animation finishes
-->

<script>
  import { onMount } from "svelte";
  import { randomNum, randomize } from "$lib/utils.ts";

  let {
    count = 50
  } = $props();
  
  const shapes = [ "❄️" ]; // "❆", "❅" ];
  const portion = 100/count;
  let snowflakes = $state([]);
  
  onMount(() => {
    snowflakes = Array.from({ length: count }, (_, i) => ({
      shape: randomize(shapes),
      opacity: Math.min(100, randomNum(60, 110)) + "%",
      scale: randomNum(50, 125) + "%",
      verticalPosition: randomNum(-100, -1) + "vh",
      horizontalPosition: randomNum(i*portion, i*portion+portion-1) + "%",
      delay: randomNum(1, 1)/100 + "s",
      fallDuration: randomNum(10, 15) + "s",
      windDuration: randomNum(4, 10) + "s",
      windDistance: randomNum(30, 80) + "px"
    }));
  });
</script>

<div class="snowfall-effect" aria-hidden="true">
  {#each snowflakes as snowflake}
    <div
      class="snowflake-anchor"
      style:scale={snowflake.scale}
      style:top={snowflake.verticalPosition}
      style:--left={snowflake.horizontalPosition}
      style:--delay={snowflake.delay}
      style:--fall-duration={snowflake.fallDuration}
      style:--wind-duration={snowflake.windDuration}
      style:--wind-distance={snowflake.windDistance}>
      <div class="snowflake" style:--opacity={snowflake.opacity}>{snowflake.shape}</div>
    </div>
  {/each}
</div>

<style>
  .snowflake-anchor {
    color: #fff;
    text-shadow: 0 0 5px #eeeeee;
    font-size: 1.5rem;
    position: fixed;
    z-index: 900;
    left: var(--left);
    user-select: none;
    pointer-events: none;
    
    animation-name: wind-animation;
    animation-duration: var(--wind-duration);
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-play-state: running;
  }
  
  .snowflake {
     animation-name: fall-animation;
     animation-duration: var(--fall-duration);
     animation-timing-function: linear;
     animation-iteration-count: infinite;
     animation-play-state: running;
  }
  
  @keyframes fall-animation {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: var(--opacity);
    }
    90% {
      opacity: var(--opacity);
    }
    100% {
      transform: translateY(110vh) rotate(360deg);
      opacity: 0%;
    }
  }
  
  @keyframes wind-animation {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(var(--wind-distance));
    }
  }
</style>