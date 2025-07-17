<script>
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import FilledButton from "$lib/ui/components/FilledButton.svelte";
  import DiscordSupport from "$lib/ui/widgets/DiscordSupport.svelte";
  import FancyTopBar from "$lib/ui/widgets/FancyTopBar.svelte";
  
  const addLink = "https://discord.com/oauth2/authorize?client_id=696151319819321368";
  const privacyLink = "/ensibot/privacy-policy";
  const termsLink = "/ensibot/terms-of-service";
</script>

{#snippet termsText()}
  <p1 style:font-size="0.7rem">
    by adding, you agree to <a class="fancya" href={termsLink}>Terms of Service</a> and <a class="fancya" href={privacyLink}>Privacy Policy</a>
  </p1>
{/snippet}

<FancyTopBar
  title="Ensi"
  icon="icons/projects/ensi.png"
  description="Randomized chatting & utility bot for Discord"
  showHomeButton
  colors={[ "#3f4a59", "#1e461f" ]}>
  <div style:margin-top="12px" style:text-align="right">
    <a href={addLink}>
      <FilledButton
        label="Add Ensi"
        icon="icons/add.svg" />
    </a><br />
    <div style:margin-top="12px">
      {@render termsText()}
    </div>
  </div>
</FancyTopBar>

<div style:margin-top="24px" />

<div style:text-align="center">
  <p1 style:font-size="1.1rem">
    Looking for some randomness in your chat?
  </p1><br />
  <p1 style:font-size="1.3rem">
    Ensi is just the bot for that!
  </p1>
</div>

<h1 style:text-align="center">⭐ Feature overview</h1>
<ul>
  <li>💬 Randomized chatting feature</li>
  <li>🧑‍🎨 Randomized image generation using <code>/image</code></li>
  <li>🈵 Randomized translation using <code>/mouslate</code></li>
  <li>🤜 Randomized fights with <code>/throw</code></li>
  <li>🏹 <code>/snipe</code> command</li>
  <li>🛠️ Various utility commands such as <code>/3y3</code>, <code>/murmur3</code> and <code>/userinfo</code></li>
</ul>

<div style:margin-top="16px" />

<h1 style:text-align="center">🎉 Getting started</h1>
<ul>
  <li>
    Add Ensi using <a class="fancya" href={addLink}>this link</a>
    <div style:margin="3px 0px 4px 0px">
      * {@render termsText()}
    </div>
  </li>
  <li>Configure chatting feature using <code>/chat</code></li>
  <li>Generate randomized images with <code>/image</code></li>
  <li>Start randomized fights with <code>/throw</code></li>
</ul>

<DiscordSupport />

<BottomSpacer />