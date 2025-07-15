<script>
  import FilledButton from "$lib/ui/components/FilledButton.svelte";
  import socials from "$lib/values/socials.ts";
</script>

<div style:margin-top="48px" style:text-align="center">
  <a href={socials.discord.url}>
    <FilledButton
      label="Support server"
      icon="/icons/socials/discord.svg" />
  </a>
</div>