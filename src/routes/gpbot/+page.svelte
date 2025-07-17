<script>
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import FilledButton from "$lib/ui/components/FilledButton.svelte";
  import DiscordSupport from "$lib/ui/widgets/DiscordSupport.svelte";
  import FancyTopBar from "$lib/ui/widgets/FancyTopBar.svelte";
  import GitHubRepo from "$lib/ui/widgets/GitHubRepo.svelte";
  
  const addLink = "https://discord.com/api/oauth2/authorize?client_id=806615704987762759";
  const privacyLink = "/gpbot/privacy-policy";
  const termsLink = "/gpbot/terms-of-service";
</script>

{#snippet termsText()}
  <p1 style:font-size="0.7rem">
    by adding, you agree to <a class="fancya" href={termsLink}>Terms of Service</a> and <a class="fancya" href={privacyLink}>Privacy Policy</a>
  </p1>
{/snippet}

<FancyTopBar
  title="GPBot"
  icon="icons/projects/gpbot.png"
  description="Google Play Store™ scraper bot for Discord with many useful features"
  contentColor="#ffffff"
  colors={[ "#005cff", "#46aaff" ]}
  showHomeButton >
  <div style:margin-top="12px" style:text-align="right">
    <a href={addLink}>
      <FilledButton
        label="Add bot"
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
    Track app updates, view exact download count, search apps
  </p1><br />
  <p1 style:font-size="1.3rem">
    Right in your Discord chat!
  </p1>
</div>

<h1 style:text-align="center">⭐ Feature overview</h1>
<ul>
  <li>👀 Track app updates</li>
  <li>ℹ️ View general information of apps, including some information which may not be visible in official Google Play clients</li>
  <li>🌐 Localization for: English, Polish, Russian and Turkish</li>
</ul>

<div style:margin-top="16px" />

<h1 style:text-align="center">🎉 Getting started</h1>
<ul>
  <li>
    Add GPBot using <a class="fancya" href={addLink}>this link</a>
    <div style:margin="3px 0px 4px 0px">
      * {@render termsText()}
    </div>
  </li>
  <li>Search apps using <code>/app-search</code></li>
  <li>View information of a specific app with app ID using <code>/app-info</code></li>
  <li>Track apps using <code>/app-track</code> (currently max 5 apps per server)</li>
</ul>

<div style:margin-top="16px" />

<h1 style:text-align="center">♥️ Special thanks</h1>
This project uses <a class="fancya" href="https://github.com/facundoolano/google-play-scraper">facundoolano/google-play-scraper</a> to scrape data from Play Store
<br /><br />
<GitHubRepo showFullName repo="facundoolano/google-play-scraper" />

<DiscordSupport />

<BottomSpacer />