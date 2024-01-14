export default function({
  showLabels = "false",
  path = "aliernfrog"
},
{
  socials,
  templateConfig
}) {
  const scoped = socials.socials[path] ?? socials.socials["aliernfrog"];
  const socialDivs = scoped.map(social => [
    `<builder-component name="chip-button"`,
    showLabels == "true" ? `label="${social.label}"` : "",
    `icon="${social.icon}"`,
    `link="${social.url}"`,
    `iconSize="28"`,
    `iconBorderRadius="0"`,
    "/>"
  ].join(" ")).join("");

  return `<div style="text-align:center;">${socialDivs}</div>`;
}