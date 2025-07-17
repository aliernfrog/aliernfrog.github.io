<script>
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import Markdown from "$lib/ui/components/Markdown.svelte";
  import FancyTopBar from "$lib/ui/widgets/FancyTopBar.svelte";
  import DiscordSupport from "$lib/ui/widgets/DiscordSupport.svelte";
  import policy from "$lib/values/indinibee/privacy.txt?raw";
</script>

<FancyTopBar
  title="Privacy Policy"
  sideTitle="of Ms. Indinibee"
  description="Last updated: November 13th, 2024"
  icon="/icons/projects/indinibee.png"
  iconLink="/indinibee"
  backButton={{
    label: "Ms. Indinibee",
    icon: "/icons/projects/indinibee.png",
    url: "/indinibee"
  }}
  showHomeButton />

<div class="fancya">
  <Markdown text={policy} />
</div>

<DiscordSupport />

<BottomSpacer />