<script>
  import { onMount } from "svelte";
  import ClickableCard from "../components/ClickableCard.svelte";

  export let display = "block";
  export let repo;
  export let json;
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

<ClickableCard display={display} url={json?.full_name ? `https://github.com/${json.full_name}` : ""}>
  {#if loading}
    Loading...
  {:else if error || !json}
    Error: {error ?? "unknown"}
  {:else}
    <p1 style:font-size="1.7rem">{showFullName ? json.full_name : json.name}</p1><br />
    <p1>
      {json.description ?? "* No description *"}
      {#if json?.stargazers_count !== null}
        <br/><p1 style:font-size="0.8rem">⭐ {json.stargazers_count}</p1>
      {/if}
    </p1>
  {/if}
</ClickableCard>