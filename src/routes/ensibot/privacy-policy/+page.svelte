<script>
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import Markdown from "$lib/ui/components/Markdown.svelte";
  import FancyTopBar from "$lib/ui/widgets/FancyTopBar.svelte";
  import DiscordSupport from "$lib/ui/widgets/DiscordSupport.svelte";
  import policy from "$lib/values/ensi/privacy.txt?raw";
</script>

<FancyTopBar
  title="Privacy Policy"
  sideTitle="of Ensi"
  description="Last updated: July 4th, 2024"
  icon="/icons/projects/ensi.png"
  iconLink="/ensibot" />

<div class="fancya">
  <Markdown text={policy} />
</div>

<DiscordSupport />

<BottomSpacer />