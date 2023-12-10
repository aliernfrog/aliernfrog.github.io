export default function({
  title,
  description,
  icon,
  showHomeButton = "true"
}) {
  const home = showHomeButton == "true" ? [
    `<builder-component name="chip-button"`,
    `label="aliernfrog"`,
    `icon="/assets/images/aliernfrog.png"`,
    `iconSize="22"`,
    `link="/" />`
  ].join(" ") : "";
  
  return [
    `<div id="topbar" style="text-align:center;">`,
    home,
    `<div style="margin-bottom:8px;">`,
    icon ? `<img src="${icon}" style="width:64px;height:64px;vertical-align:middle;margin-right:8px;">`: "",
    `<p1 style="vertical-align:middle;font-size:30px;font-weight:bold;">${title}</p1><br>`,
    `</div>`,
    description ? `<p1>${description}</p1>` : "",
    `</div>`
  ].join("");
}