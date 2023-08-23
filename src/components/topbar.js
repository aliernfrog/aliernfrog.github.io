export default function({
  title,
  description,
  icon
}) {
  return [
    `<div id="topbar" style="text-align:center;">`,
    `<div style="margin-bottom:8px;">`,
    `<img src="${icon}" style="width:64px;height:64px;vertical-align:middle;margin-right:8px;">`,
    `<p1 style="vertical-align:middle;font-size:30px;font-weight:bold;">${title}</p1><br>`,
    `</div>`,
    !!description ? `<p1>${description}</p1>` : "",
    `</div>`
  ].join("");
}