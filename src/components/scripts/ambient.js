export default function({
  color = ""
}) {
  return [
    "<script>",
    "function setAmbientColor(color) {",
    `const topbar = document.getElementById("topbar");`,
    "document.body.style.backgroundImage = `linear-gradient(${color}, #000000 ${topbar.offsetHeight*3}px)`;",
    `document.body.style.backgroundRepeat = "no-repeat";`,
    `document.querySelector('meta[name="theme-color"]').setAttribute("content", color);`,
    "}",
    `setAmbientColor("${color}");`,
    `</script>`
  ].join("");
}