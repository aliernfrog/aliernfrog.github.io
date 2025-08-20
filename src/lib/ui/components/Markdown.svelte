<script>
  import { parse as parseMarkdown } from "marked";
  
  let {
    text
  } = $props();
  
  let parsed = $derived(
    parseMarkdown(text.replaceAll("\\n", "<br />"))
  );
</script>

<div>
  {@html parsed}
</div>