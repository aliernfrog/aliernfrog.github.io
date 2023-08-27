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
    `<a href="${social.url}" style="text-decoration:none;padding:8px 4px 8px 4px;">`,
    `<div style="display:inline-block;padding:8px;margin:16px 0px 16px 0px;border-radius:25px;background-color:${templateConfig.primarySurfaceColor};color:${templateConfig.onPrimarySurfaceColor};">`,
    `<img src="${social.icon}" alt="${social.label}" style="width:30px;height:30px;vertical-align:middle;">`,
    showLabels == "true" ? `<p1 style="padding-left:4px;vertical-align:middle;">${social.label}</p1>` : "",
    `</div>`,
    `</a>`
  ].join("")).join("");

  return `<div style="text-align:center;">${socialDivs}</div>`;
}