<script>
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import Markdown from "$lib/ui/components/Markdown.svelte";
  import DiscordSupport from "$lib/ui/widgets/DiscordSupport.svelte";
  import FancyTopBar from "$lib/ui/widgets/FancyTopBar.svelte";
  import terms from "$lib/values/ensi/terms.txt?raw";
</script>

<FancyTopBar
  title="Terms of Service"
  sideTitle="of Ensi"
  description="Last updated: August 1st, 2025"
  icon="/icons/projects/ensi.png"
  iconLink="/ensibot"
  backButton={{
    label: "Ensi",
    icon: "/icons/projects/ensi.png",
    url: "/ensibot"
  }}
  showHomeButton />

<div class="fancya">
  <Markdown text={terms} />
</div>

<DiscordSupport />

<BottomSpacer />