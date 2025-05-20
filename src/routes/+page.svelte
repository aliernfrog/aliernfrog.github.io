<script>
  import LargeIcon from "$lib/ui/components/LargeIcon.svelte";
  import TopBarButton from "$lib/ui/widgets/TopBarButton.svelte";
  import ProjectCard from "$lib/ui/widgets/ProjectCard.svelte";
  import socials from "$lib/values/socials.ts";
</script>

<div
  class="topbar"
  style:background-color="var(--surfaceContainer)"
  style:color="var(--onSurface)"
  style:border-radius="20px"
  style:padding="12px">
  <LargeIcon src="favicon.png" />
  <p1 style:margin-left="8px" style:font-size="2rem" style:vertical-align="middle"><b>alieRN</b></p1>
  <p1 style:font-size="0.8rem" style:opacity="70%" style:vertical-align="middle">frog</p1>
  <div style:margin-top="8px" />
  <p1>Someone with a few hobby projects running on the internet</p1>
  <div style:margin-top="8px" style:text-align="right">
    {#each Object.values(socials) as social, index}
      <a
        href={social.url}
        style:text-decoration="none"
        style:margin-left={index != 0 ? "8px" : "0px"}>
        <TopBarButton
          label={social.name}
          icon={social.icon} />
      </a>
    {/each}
  </div>
</div>

<h1>My projects</h1>

<ProjectCard
  name="Ensi"
  description="Randomized chatting & utility bot for Discord"
  icon="favicon.png"
  tags={[ "Discord bot", "Fun", "Utility" ]}
  url="./ensibot" />

<style>
  .topbar {
    background: linear-gradient(35deg, #5C151A, #5A4B4D);
    background-size: 200% 200%;
    animation: rotateGradient 3s infinite linear;
  }
  
  @keyframes rotateGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
</style>