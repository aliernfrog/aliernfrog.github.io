<script>
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import FilledButton from "$lib/ui/components/FilledButton.svelte";
  import DiscordSupport from "$lib/ui/widgets/DiscordSupport.svelte";
  import FancyTopBar from "$lib/ui/widgets/FancyTopBar.svelte";
  import GitHubRepo from "$lib/ui/widgets/GitHubRepo.svelte";
  
  const downloadLink = "https://github.com/aliernfrog/ensicord/releases/download/3/Ensicord.apk";
  const source = "aliernfrog/ensicord";
</script>

<FancyTopBar
  title="Ensicord"
  icon="icons/projects/ensicord.png"
  description="Ensi, in a separate & offline app"
  showHomeButton
  colors={[ "#1f2d41", "#6c7b81" ]}>
  <div style:margin-top="12px" style:text-align="right">
    <a href={downloadLink}>
      <FilledButton
        label="Download"
        icon="icons/download.svg" />
    </a><br />
    <div style:margin-top="12px">
      <p1 style:font-size="0.7rem">
        The app is outdated and chat/theme packs do not work at this time<br />
        At least Android 4.1 is required
      </p1>
    </div>
  </div>
</FancyTopBar>

<div style:margin-top="24px" />

<div style:text-align="center">
  <p1 style:font-size="1.1rem">
    Chat with <a class="fancya" href="/ensibot">Ensi</a>
  </p1><br />
  <p1 style:font-size="1.3rem">
    In an offline app!
  </p1>
</div>

<h1 style:text-align="center">ℹ️ Information</h1>
<p1>
  Ensicord is an app I made in my free time, and it is currently outdated and partially broken.<br />
  It is currently being rewritten in JetPack Compose in the <a class="fancya" href="https://github.com/aliernfrog/ensicord/tree/compose">compose</a> branch. The progress is slow.
</p1>

<div style:margin-top="16px" />

<h1 style:text-align="center">GitHub repository</h1>
<div style:margin-top="16px">
  <GitHubRepo repo="aliernfrog/ensicord" />
</div>

<DiscordSupport />

<BottomSpacer />