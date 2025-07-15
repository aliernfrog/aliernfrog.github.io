<script>
  import { parse as parseMarkdown } from "marked";
  
  let {
    text
  } = $props();
  
  const parsed = parseMarkdown(
    // Remove indentation and leading/trailing whitespace
    text.trim().replace(/^\s+/gm, "").replaceAll("\\n","<br>")
  );
</script>

<div>
  {@html parsed}
</div>