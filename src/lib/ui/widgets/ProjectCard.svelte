<script>
  import ClickableCard from "$lib/ui/components/ClickableCard.svelte";
  import LargeIcon from "$lib/ui/components/LargeIcon.svelte";
  
  let {
    name,
    description,
    icon,
    tags = [],
    url,
    children
  } = $props();
</script>

<ClickableCard url={url}>
  <div style="display: flex; align-items: center;">
    <div style="margin-right: 12px;">
      <LargeIcon src={icon} />
    </div>
    <div style="flex-grow: 1; display: flex; flex-direction: column">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
        <p1 style:font-size="1.7rem">{name}</p1>
        <div style="display: inline-flex; flex-wrap: wrap; vertical-align:middle; opacity: 80%">
          {#each tags as tag, index}
            <p1
              class="card-component"
              style:background-color="var(--content-color)"
              style:color="var(--container-color)"
              style:font-size="0.7rem"
              style:vertical-align="middle"
              style:padding="2px 4px 2px 4px"
              style:margin-left={index == 0 ? "0px" : "4px"}
              style:border-radius="5px">{tag}</p1>
          {/each}
        </div>
      </div>
      <div>
        <p1>{description}</p1>
      </div>
    </div>
  </div>
  {#if children}
    {@render children()}
  {/if}
</ClickableCard>