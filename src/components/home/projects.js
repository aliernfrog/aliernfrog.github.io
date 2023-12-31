import tags from "../../values/tags.js";

export default function({}, {
  builder,
  templateConfig
}) {
  const { projects } = builder;
  const projectDivs = [];
  
  projects.forEach(project => {
    const projectTags = (() => {
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
    })();
    
    projectDivs.push([
      `<builder-component name="card" `,
      `title="${project.name}" `,
      `description="${project.description}" `,
      `icon="${project.icon}" `,
      `link="${project.url}"`,
      projectTags ? `> ${projectTags} </builder-component>` : "/>"
    ].join(""));
  });

  return projectDivs.join("");
}