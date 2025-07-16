<script>
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import Markdown from "$lib/ui/components/Markdown.svelte";
  import DiscordSupport from "$lib/ui/widgets/DiscordSupport.svelte";
  import FancyTopBar from "$lib/ui/widgets/FancyTopBar.svelte";
  import terms from "$lib/values/gpbot/terms.txt?raw";
</script>

<FancyTopBar
  title="Terms of Service"
  sideTitle="of GPBot"
  description="Last updated: July 5th, 2024"
  icon="/icons/projects/gpbot.png"
  iconLink="/gpbot"
  backButton={{
    label: "GPBot",
    icon: "/icons/projects/gpbot.png",
    url: "/gpbot"
  }}
  showHomeButton />

<div class="fancya">
  <Markdown text={terms} />
</div>

<DiscordSupport />

<BottomSpacer />