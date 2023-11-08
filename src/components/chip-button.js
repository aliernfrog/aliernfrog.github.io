export default function({
  label,
  icon,
  containerColor,
  contentColor,
  iconSize = "18",
  link
}, {
  templateConfig
}) {
  containerColor ??= templateConfig.primarySurfaceColor;
  contentColor ??= templateConfig.onPrimarySurfaceColor;
  
  return [
    link ? `<a href="${link}">` : "",
    `<div style="display:inline-block;padding:8px;margin:16px 0px 16px 0px;border-radius:25px;background-color:${containerColor};color:${contentColor};">`,
    icon ? `<img src="${icon}" alt="${label ?? ""}" style="width:${iconSize}px;height:${iconSize}px;vertical-align:middle;">` : "",
    label ? `<p1 style="padding-left:4px;vertical-align:middle;">${label}</p1>` : "",
    "</div>",
    link ? "</a>" : ""
  ].join("");
}