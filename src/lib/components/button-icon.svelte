<script>
  export let src;
  export let alt;
  export let color;
</script>

<img
  src={src}
  alt={alt ?? ""}
  style:width=32px
  style:height=32px
  style:padding-right=8px
  style:filter="drop-shadow(0px 1000px 0px {color ?? "rgb(var(--m3-scheme-primary))"})"
  style:transform=translateY(-1000px)>