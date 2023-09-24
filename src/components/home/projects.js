import projects from "../../values/projects.json" assert { type: "json" }
import tags from "../../values/tags.js";

export default function({}, {
  templateConfig
}) {
  const projectDivs = [];
  
  projects.forEach(project => {
    function getTags() {
      if (!project.tags?.length) return;
      const divs = [];
      project.tags.forEach(tagId => {
        const tag = tags[tagId];
        if (!tag) return;
        divs.push(
          `<div style="display:inline-block;vertical-align:middle;font-size:12px;border-radius:8px;margin:8px 0px 8px 0px;padding:8px;background-color:${templateConfig.secondarySurfaceColor};">${tag.emoji} ${tag.label}</div>`
        );
      });
      return divs.join(" ");
    }
    
    projectDivs.push([
      `<a href="${project.url}">`,
      `<div style="border-radius:25px;padding:8px;margin:8px;background-color:${templateConfig.primarySurfaceColor};">`,
      `<div style="margin-bottom:8px;">`,
      `<img src="${project.icon}" style="width:40px;height:40px;vertical-align:middle;margin-right:8px;">`,
      `<p1 style="vertical-align:middle;font-size:20px;font-weight:bold;">${project.name}</p1><br>`,
      `</div>`,
      `<p1 style="opacity:70%;">${project.description}</p1><br>`,
      getTags() ?? "",
      `</div></a>`
    ].join(""));
  });

  return projectDivs.join("");
}