<script>
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import FilledButton from "$lib/ui/components/FilledButton.svelte";
  import FancyTopBar from "$lib/ui/widgets/FancyTopBar.svelte";
  import GitHubRepo from "$lib/ui/widgets/GitHubRepo.svelte";
  
  const downloadLink = "https://github.com/aliernfrog/pf-tool/releases/latest/download/pftool.apk";
  const source = "aliernfrog/pf-tool";
  
  const pfLink = "https://play.google.com/store/apps/details?id=com.MA.Polyfield";
</script>

<FancyTopBar
  title="PF Tool"
  icon="icons/projects/pftool.png"
  description="Easily import and share Polyfield maps"
  showHomeButton
  colors={[ "#1c2335", "#562e24" ]}>
  <div style:margin-top="12px" style:text-align="right">
    <a href={downloadLink}>
      <FilledButton
        label="Download"
        icon="icons/download.svg" />
    </a><br />
    <div style:margin-top="12px">
      <p1 style:font-size="0.7rem">
        At least Android 5 is required
      </p1>
    </div>
  </div>
</FancyTopBar>

<div style:margin-top="24px" />

<div style:text-align="center">
  <p1 style:font-size="1.1rem">
    Import and share <a class="fancya" href={pfLink}>Polyfield</a> maps
  </p1><br />
  <p1 style:font-size="1.3rem">
    With ease!
  </p1><br />
  <img
    alt="PF Tool screenshot (dark)"
    src="https://raw.githubusercontent.com/aliernfrog/pf-tool/refs/heads/main/images/maps.jpg"
    style:margin-top="16px"
    style:width="150px">
  <img
    alt="PF Tool screenshot (light)"
    src="https://raw.githubusercontent.com/aliernfrog/pf-tool/refs/heads/main/images/maps_light.jpg"
    style:width="150px"
    style="margin-left: 16px;">
</div>

<h1 style:text-align="center">⭐ Feature overview</h1>
<ul>
  <li>📥 Import, export and share maps as <code>.zip</code> files</li>
  <li>🎨 Adaptive design with Material You theming</li>
</ul>

<div style:margin-top="16px" />

<h1 style:text-align="center">GitHub repository</h1>
<div style:margin-top="16px">
  <GitHubRepo repo={source} />
</div>

<BottomSpacer />