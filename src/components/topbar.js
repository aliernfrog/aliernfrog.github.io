export default function({
  title,
  description,
  icon,
  iconLink,
  iconBorderRadius = "50",
  showHomeButton = "true",
  homeButtonLabel = "alieRN",
  homeButtonIcon = "/assets/images/aliernfrog.png",
  homeButtonLink = "/"
}) {
  const home = showHomeButton == "true" ? [
    `<builder-component name="chip-button"`,
    `label="${homeButtonLabel}"`,
    `icon="${homeButtonIcon}"`,
    `iconSize="22"`,
    `iconBorderRadius="50"`,
    `link="${homeButtonLink}" />`
  ].join(" ") : "";
  
  return [
    `<div id="topbar" style="text-align:center;">`,
    home,
    `<div style="margin-bottom:8px;">`,
    iconLink ? `<a href="${iconLink}">` : "",
    icon ? `<img src="${icon}" style="width:64px;height:64px;border-radius:${iconBorderRadius}%;vertical-align:middle;margin-right:8px;">`: "",
    iconLink ? `</a>` : "",
    `<p1 style="vertical-align:middle;font-size:30px;font-weight:bold;">${title}</p1><br>`,
    `</div>`,
    description ? `<p1>${description}</p1>` : "",
    `</div>`
  ].join("");
}