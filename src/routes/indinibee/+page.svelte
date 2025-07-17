<script>
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import FilledButton from "$lib/ui/components/FilledButton.svelte";
  import DiscordSupport from "$lib/ui/widgets/DiscordSupport.svelte";
  import FancyTopBar from "$lib/ui/widgets/FancyTopBar.svelte";
  
  const addLink = "https://discord.com/oauth2/authorize?client_id=698531260284534864";
  const privacyLink = "/indinibee/privacy-policy";
  const termsLink = "/indinibee/terms-of-service";
</script>

{#snippet termsText()}
  <p1 style:font-size="0.7rem">
    by adding, you agree to <a class="fancya" href={termsLink}>Terms of Service</a> and <a class="fancya" href={privacyLink}>Privacy Policy</a>
  </p1>
{/snippet}

<FancyTopBar
  title="Ms. Indinibee"
  icon="icons/projects/indinibee.png"
  description="Bee themed economy bot for Discord"
  showHomeButton
  contentColor="#ffffff"
  colors={[ "#b5b500", "#73ff77" ]}>
  <div style:margin-top="12px" style:text-align="right">
    <a href={addLink}>
      <FilledButton
        label="Add Ms. Indinibee"
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
    This bot is still a WIP.
  </p1>
</div>

<DiscordSupport />

<BottomSpacer />