export default function({
  title,
  description,
  containerColor,
  link
}, {
  templateConfig
}) {
  const _containerColor = containerColor ?? templateConfig.primarySurfaceColor;
  
  return [
    link ? `<a href=${link}>` : "",
    `<div style="border-radius:25px;padding:8px 16px 8px 16px;background-color:${_containerColor};">`,
    `<div style="margin-bottom:8px;">`,
    `<p1 style="vertical-align:middle;font-size:20px;font-weight:bold;">${title}</p1><br>`,
    `</div>`,
    `<p1 style="opacity:70%;">${description}</p1><br>`,
    `</div>`,
    link ? `</a>` : ""
  ].join("");
}