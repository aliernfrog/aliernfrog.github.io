<script>
  import { onMount } from "svelte";
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import LargeIcon from "$lib/ui/components/LargeIcon.svelte";
  import OutlinedButton from "$lib/ui/components/OutlinedButton.svelte";
  import GitHubRepo from "$lib/ui/widgets/GitHubRepo.svelte";
  import ProjectCard from "$lib/ui/widgets/ProjectCard.svelte";
  import FancyTopBar from "$lib/ui/widgets/FancyTopBar.svelte";
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

<FancyTopBar
  title="alieRN"
  sideTitle="frog"
  icon="favicon.png"
  description="Someone with a few hobby projects running on the internet"
  colors={[ "#5c151a", "#5a4b4d" ]}>
  <div style:margin-top="8px" style:text-align="right">
    {#each Object.values(socials) as social, index}
      <a
        href={social.url}
        style:text-decoration="none"
        style:margin-left={index != 0 ? "8px" : "0px"}>
        <OutlinedButton
          label={social.name}
          icon={social.icon} />
      </a>
    {/each}
  </div>
</FancyTopBar>

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
  <h1>
    <img style:filter="var(--onSurface-filter)" src="icons/construction.svg" style:width="2rem" style:height="2rem" style:vertical-align="middle">
    <font style:vertical-align="middle">Recent work took place in:</font>
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