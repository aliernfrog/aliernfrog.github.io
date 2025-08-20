<script>
  import BottomSpacer from "$lib/ui/components/BottomSpacer.svelte";
  import Markdown from "$lib/ui/components/Markdown.svelte";
  import FancyTopBar from "$lib/ui/widgets/FancyTopBar.svelte";
  
  export let data;
  
  $: ({ post } = data);
  
  function readableTime(date) {
    return new Date(date).toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
</script>

<FancyTopBar
  title={post.title}
  description={post.description}
  icon="/favicon.png"
  iconLink="/"
  showHomeButton>
  <div style:margin-top="8px" style:text-align="right">
    <p1 style:font-size="0.8rem" style:opacity="80%">
      {readableTime(post.date)}
      {#if post.updated}
        <br />
        Updated: {readableTime(post.updated)}
      {/if}
    </p1>
  </div>
</FancyTopBar>

<div class="fancya">
  <Markdown text={post.content} />
</div>

<BottomSpacer />