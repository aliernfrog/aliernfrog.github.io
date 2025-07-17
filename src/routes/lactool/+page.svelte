<script>
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import FilledButton from "$lib/ui/components/FilledButton.svelte";
  import OutlinedButton from "$lib/ui/components/OutlinedButton.svelte";
  import FancyTopBar from "$lib/ui/widgets/FancyTopBar.svelte";
  import GitHubRepo from "$lib/ui/widgets/GitHubRepo.svelte";
  
  const downloadLink = "https://github.com/aliernfrog/lac-tool/releases/latest/download/lactool.apk";
  const source = "aliernfrog/lac-tool";
  
  const legacyDownloadLink = "https://github.com/aliernfrog/lac-tool-legacy/releases/latest/download/lactool-legacy.apk";
  const legacySource = "aliernfrog/lac-tool-legacy";
  
  const lacLink = "https://play.google.com/store/apps/details?id=com.MA.LAC";
</script>

<FancyTopBar
  title="LAC Tool"
  icon="icons/projects/lactool.png"
  description="Easily manage LAC maps, wallpapers and screenshots"
  showHomeButton
  colors={[ "#1f2d41", "#6c7b81" ]}>
  <div style:margin-top="12px" style:text-align="right">
    <a href={legacyDownloadLink}>
      <OutlinedButton
        label="Legacy"
        icon="icons/download.svg" />
    </a>
    <a href={downloadLink}>
      <FilledButton
        label="Download"
        icon="icons/download.svg" />
    </a><br />
    <div style:margin-top="12px">
      <p1 style:font-size="0.7rem">
        At least Android 5 is required for the latest version<br />
        Legacy version only supports Android 4.3
      </p1>
    </div>
  </div>
</FancyTopBar>

<div style:margin-top="24px" />

<div style:text-align="center">
  <p1 style:font-size="1.1rem">
    Import, share and merge <a class="fancya" href={lacLink}>LAC</a> maps; set wallpaper for the in-game cellphone, view in-game screenshots in a gallery view and much more
  </p1><br />
  <p1 style:font-size="1.3rem">
    All in a single app!
  </p1><br />
  <img
    alt="Screenshot from LAC Tool"
    src="https://raw.githubusercontent.com/aliernfrog/lac-tool/refs/heads/main/images/maps.jpg"
    style:margin-top="16px"
    style:width="200px"
    style:text-align="center">
</div>

<h1 style:text-align="center">⭐ Feature overview</h1>
<ul>
  <li>📥 Import, export and share maps</li>
  <li>🏷️ Edit roles, options and filter objects of maps</li>
  <li>🔀 Merge multiple maps into one</li>
  <li>📱 Set custom wallpaper for the in-game cellphone</li>
  <li>📷 View screenshots taken using the in-game cellphone</li>
  <li>🎨 Adaptive design with Material You theming</li>
</ul>

<div style:margin-top="16px" />

<h1 style:text-align="center">GitHub repositories</h1>
{#each [ source, legacySource ] as repo}
  <div style:margin-top="16px">
    <GitHubRepo repo={repo} />
  </div>
{/each}

<BottomSpacer />