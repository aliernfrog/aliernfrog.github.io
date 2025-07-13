<script>
  import { onMount } from "svelte";
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import LargeIcon from "$lib/ui/components/LargeIcon.svelte";
  import GitHubRepo from "$lib/ui/widgets/GitHubRepo.svelte";
  import ProjectCard from "$lib/ui/widgets/ProjectCard.svelte";
  import TopBarButton from "$lib/ui/widgets/TopBarButton.svelte";
  import socials from "$lib/values/socials.ts";
  
  let repos;
  
  onMount(async () => {
    try {
      const res = await fetch("https://api.github.com/users/aliernfrog/repos?type=owner&sort=pushed&per_page=3");
      repos = (await res.json()).filter(repo => !repo.fork);
    } catch (e) {
      console.error("Failed to fetch repos", e);
    }
  });
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

<h1>
  My projects
  <p1 style:font-size="0.7rem" style:opacity="50%" style:vertical-align="middle">(Some of them)</p1>
</h1>

<ProjectCard
  name="Ensi"
  description="Randomized chatting & utility bot for Discord"
  icon="icons/projects/ensi.png"
  tags={[ "Discord bot", "Fun", "Utility" ]}
  url="./ensibot" />
  
<div style:margin-top="8px" />
  
<ProjectCard
  name="GPBot"
  description="Google Play Store™️ scraper bot for Discord"
  icon="icons/projects/gpbot.png"
  tags={[ "Discord bot", "Utility" ]}
  url="./gpbot" />

<div style:margin-top="8px" />

<ProjectCard
  name="LAC Tool"
  description="Easily manage LAC maps, wallpapers and screenshots"
  icon="icons/projects/lactool.png"
  tags={[ "Android app", "Open source" ]}
  url="./lactool" />

<div style:margin-top="8px" />

<ProjectCard
  name="PF Tool"
  description="Easily import and share Polyfield maps"
  icon="icons/projects/pftool.png"
  tags={[ "Android app", "Open source" ]}
  url="./pftool" />
  
<div style:margin-top="8px" />

<ProjectCard
  name="Ensicord"
  description="Ensi, in a separate & offline app"
  icon="icons/projects/ensicord.png"
  tags={[ "Android app", "Open source" ]}
  url="./ensicord">
  <div
    class="card-component"
    style:margin-top="12px"
    style:padding="8px"
    style:border-radius="15px"
    style:background-color="var(--onSurface)"
    style:color="var(--surface)">
    <img
      style:filter="var(--surface-filter)"
      style:vertical-align="middle"
      src="icons/warning.svg">
    <p1 style:vertical-align="middle">Current version of Ensicord is outdated<p1/>
  </div>
</ProjectCard>

<div style:margin-top="8px" />

<ProjectCard
  name="VD Plugins"
  description="Plugins for Revenge, a modification for Discord Mobile"
  icon="icons/projects/vdplugins.png"
  tags={[ "Open source" ]}
  url="https://aliernfrog.github.io/vd-plugins" />

{#if repos?.length}
  <h1 style:vertical-align="middle">
    <img style:filter="var(--onSurface-filter)" src="icons/construction.svg">
    Recent work took place in:
  </h1>
  <div style:overflow-x="scroll" style:white-space="nowrap">
    {#each repos as repo, index}
      <div
        style:display="inline-block"
        style:margin-left={index === 0 ? "0px" : "12px"}>
        <GitHubRepo display="inline-block" json={repo} />
      </div>
    {/each}
  </div>
{/if}

<BottomSpacer />

<style>
  .topbar {
    background: linear-gradient(70deg, #5C151A, #5A4B4D);
    background-size: 200% 200%;
    animation: rotateGradient 3s infinite linear;
  }
  
  @keyframes rotateGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
</style>