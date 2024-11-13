export default function({
  label,
  icon,
  containerColor,
  contentColor,
  opacity = "1.0",
  iconSize = "18",
  iconBorderRadius = "0",
  link
}, {
  templateConfig
}) {
  containerColor ??= templateConfig.primarySurfaceColor;
  contentColor ??= templateConfig.onPrimarySurfaceColor;
  
  return [
    link ? `<a href="${link}">` : "",
    `<div style="display:inline-block;padding:8px;margin:16px 0px 16px 0px;border-radius:25px;background-color:${containerColor};color:${contentColor};opacity:${opacity};">`,
    icon ? `<img src="${icon}" alt="${label ?? ""}" style="width:${iconSize}px;height:${iconSize}px;border-radius:${iconBorderRadius}%;vertical-align:middle;">` : "",
    label ? `<b><p1 style="padding-left:4px;vertical-align:middle;">${label}</p1></b>` : "",
    "</div>",
    link ? "</a>" : ""
  ].join("");
}