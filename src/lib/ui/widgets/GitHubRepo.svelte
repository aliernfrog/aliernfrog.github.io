<script>
  import { onMount } from "svelte";
  import ClickableCard from "../components/ClickableCard.svelte";

  export let display = "block";
  export let json;
  export let repo = json?.full_name;
  export let showFullName;
  
  let loading = !json;
  let error = (!json && !repo) ? "No data provided" : null;
  
  onMount(async () => {
    if (repo && !json) {
      const res = await fetch(`https://api.github.com/repos/${repo}`);
      json = await res.json();
    }
    loading = false;
  });
</script>

<ClickableCard display={display} url={`https://github.com/${repo}`}>
  <img
    class="card-icon"
    style:vertical-align="middle"
    style:width="1.2rem"
    style:height="1.2rem"
    src="/icons/socials/github.svg">
  <p1 style:font-size="1.7rem" style:vertical-align="middle">{(showFullName ? json?.full_name : json?.name) ?? repo}</p1><br />
  {#if loading}
    Loading repository details...
  {:else if error || !json}
    Error: {error ?? "unknown"}
  {:else}
    <p1>
      {json.description ?? "* No description *"}
      {#if json?.stargazers_count !== null}
        <br/><p1 style:font-size="0.8rem">⭐ {json.stargazers_count}</p1>
      {/if}
    </p1>
  {/if}
</ClickableCard>