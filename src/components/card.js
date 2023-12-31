export default function({
  title,
  description,
  icon,
  containerColor,
  link,
  margin = "8px"
}, {
  templateConfig
}) {
  const _containerColor = containerColor ?? templateConfig.primarySurfaceColor;
  
  return [
    link ? `<a href="${link}">` : "",
    `<div style="border-radius:25px;margin:${margin};padding:8px 16px 8px 16px;background-color:${_containerColor};">`,
    `<div style="margin-bottom:8px;">`,
    icon ? `<img src="${icon}" style="width:40px;height:40px;vertical-align:middle;margin-right:8px;">` : "",
    `<p1 style="vertical-align:middle;font-size:20px;font-weight:bold;">${title}</p1><br>`,
    `</div>`,
    description ? `<p1 style="opacity:70%;">${description}</p1><br>` : "",
    `<component-content/>`,
    `</div>`,
    link ? `</a>` : ""
  ].join("");
}