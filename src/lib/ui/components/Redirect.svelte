<script>
  import { onMount } from "svelte";
  import ChipButton from "$lib/ui/components/ChipButton.svelte";

  let {
    url
  } = $props();
  
  onMount(() => {
    window.location = url;
  });
</script>

<div style:text-align="center">
  <a href="/">
    <ChipButton label="alieRN" icon="/favicon.png" />
  </a>
  <div style:margin-top="16px" />
  <h1>Redirecting...</h1>
  <p1>You should now be redirected to the following URL:</p1><br />
  <br />
  <a class="fancya" href={url}>{url}</a><br />
  <br />
  <br />
  <p1 style:font-size="0.8rem">If not redirected, click the URL above</p1>
</div>