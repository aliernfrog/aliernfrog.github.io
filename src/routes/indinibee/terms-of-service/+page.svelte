<script>
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import Markdown from "$lib/ui/components/Markdown.svelte";
  import DiscordSupport from "$lib/ui/widgets/DiscordSupport.svelte";
  import FancyTopBar from "$lib/ui/widgets/FancyTopBar.svelte";
  import terms from "$lib/values/indinibee/terms.txt?raw";
</script>

<FancyTopBar
  title="Terms of Service"
  sideTitle="of Ms. Indinibee"
  description="Last updated: August 1st, 2025"
  icon="/icons/projects/indinibee.png"
  iconLink="/indinibee"
  backButton={{
    label: "Ms. Indinibee",
    icon: "/icons/projects/indinibee.png",
    url: "/indinibee"
  }}
  showHomeButton />

<div class="fancya">
  <Markdown text={terms} />
</div>

<DiscordSupport />

<BottomSpacer />