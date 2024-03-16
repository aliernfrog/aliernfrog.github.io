<script>
  import { Button, Card } from "m3-svelte";
  import ButtonIcon from "$lib/components/button-icon.svelte";
  import Socials from "$lib/socials.js";
</script>

<div>
  
</div>

<Card type="elevated">
  <div style:text-align="center">
    <img
      src="favicon.png"
      alt="aliernfrog icon"
      style:border-radius=50%
      style:width=100px
      style:vertical-align="middle"
      style:margin-right=8px>
    <div style:display="inline-block" style:vertical-align="middle">
      <h1>alieRN</h1>
      <p1>@aliernfrog</p1>
    </div>
    <br><br>
    {#each Socials as social}
      <div style:padding-left=4px style:padding-right=4px style:display="inline-block">
        <Button
          type="outlined"
          on:click={() => window.open(social.url)}>
          <ButtonIcon src={social.icon}/>
          {social.name}
        </Button>
      </div>
    {/each}
  </div>
</Card>