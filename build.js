import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  rmSync
} from "fs";
import fsExtra from "fs-extra";
import { parse as parseHTML } from "node-html-parser";
import prettifyHTML from "pretty";
import socials from "./src/utils/Socials.js";
import { getParentFilePath, readdirRecursively, writeFile } from "./src/utils/FileUtil.js";
import { parseBuilderConfig, parseHTMLAttrs } from "./src/utils/HTMLParserUtil.js";
import getProjects from "./src/projects/index.js";

const DIST_DIR = "./dist";

const builder = {
  components: new Map(),
  templates: new Map(),
  projects: []
}

async function init() {
  console.log("Building..");

  const projects = await getProjects();
  builder.projects = projects;
  console.log(`Loaded ${projects.length} projects`);

  const ctx = {
    builder: builder,
    socials: socials
  }
  
  if (existsSync(DIST_DIR)) {
    rmSync(DIST_DIR, { recursive: true });
    console.log("Deleted existing dist directory");
  }
  mkdirSync(DIST_DIR);

  const componentFiles = readdirRecursively("./src/components").filter(f => f.endsWith(".js"));
  for (const file of componentFiles) {
    const name = normalizeName(file, "./src/components/", ".js");
    const generator = await import(file);
    builder.components.set(name, generator.default);
  }
  console.log(`Found ${builder.components.size} components`)
  
  const templateFiles = readdirRecursively("./src/templates").filter(f => f.endsWith(".html"));
  for (const file of templateFiles) {
    const content = readFileSync(file).toString().replaceAll("\n","");
    builder.templates.set(
      normalizeName(file, "./src/templates/", ".html"),
      content
    );
  }
  console.log(`Found ${builder.templates.size} templates`);

  const pageFiles = readdirRecursively("./src/pages").filter(f => f.endsWith(".html"));
  for (const file of pageFiles) {
    const route = normalizeName(file, "./src/pages/");
    const content = readFileSync(file).toString();
    const node = buildPage(parseHTML(content).removeWhitespace(), ctx);
    writeFile(`${DIST_DIR}/${route}`, prettifyHTML(node.toString()));
    console.log(`Successfully built: ${route}`);
  }

  for (const project of projects) {
    for (const file of project.files) {
      let finalContent = file.content;
      if (file.path.endsWith(".html")) {
        finalContent = replacePlaceholders(finalContent, "project", project);
        const node = buildPage(
          parseHTML(finalContent), ctx
        );
        finalContent = prettifyHTML(node.toString());
      }
      const path = `${DIST_DIR}/${project.url}/${file.path}`;
      writeFile(path, finalContent);
    }
    if (project.files.length) console.log(`Succesfully built project: ${project.id} (${project.files.length} files)`);
    else console.log(`Project ${project.id} has no files`);
  }

  for (const social of socials.socials.aliernfrog) {
    const node = buildPage(parseHTML([
      `<builder>`,
      `<meta title="aliernfrog ${social.label}" icon="${social.icon}" />`,
      `<template name="redirect" redirect="${social.url}" />`,
      `</builder>`
    ].join("")));
    const finalContent = prettifyHTML(node.toString());
    writeFile(`${DIST_DIR}/${social.label.toLowerCase()}/index.html`, finalContent);
    console.log(`Created redirect page for social: ${social.label}`);
  }

  let copiedStaticFiles = 0;
  fsExtra.copySync("./src/static", DIST_DIR, { filter: (src, dst) => {
    if (existsSync(dst) && lstatSync(dst).isFile()) {
      console.error(`${dst} already exists, can't copy static file!`);
      return false;
    }
    copiedStaticFiles++;
    return true;
  } });
  console.log(`Copied ${copiedStaticFiles} static files`);
  
  console.log(`Successfully built at: ${DIST_DIR}`);
}

function buildPage(node, globalCtx) {
  const ctx = { ... globalCtx }
  const builderNode = node.getElementsByTagName("builder")[0];
  const builderConfig = parseBuilderConfig(builderNode);
  builderNode.remove();

  let rawTemplate = builder.templates.get(builderConfig.template?.name);
  if (rawTemplate) {
    rawTemplate = replacePlaceholders(rawTemplate, "config", builderConfig.template);
    const template = parseHTML(rawTemplate).removeWhitespace();
    const templateBuilderNode = template.getElementsByTagName("builder")[0];
    ctx.templateConfig = parseHTMLAttrs(templateBuilderNode);
    templateBuilderNode?.remove();
    const body = template.getElementsByTagName("body")[0];
    body.getElementsByTagName("builder-content")?.forEach?.(
      element => element.replaceWith(node)
    );
    const meta = builderConfig.meta;
    if (meta) {
      const head = template.getElementsByTagName("head")[0];
      head.innerHTML += "\n" + [
        meta.title ? `<title>${meta.title}</title>` : "",
        meta.title ? `<meta name="og:title" content="${meta.title}" />` : "",
        meta.description ? `<meta name="description" content="${meta.description}" />` : "",
        meta.description ? `<meta name="og:description" content="${meta.description}" />` : "",
        meta.icon ? `<meta name="og:image" content="${meta.icon}" />` : "",
        meta.icon ? `<link rel="icon" type="image/gif/png" href="${meta.icon}">` : ""
      ].join("");
    }
    node = template;
  }

  buildNode(node, ctx);
  
  return node;
}

function buildNode(node, ctx) {
  const customComponents = node.getElementsByTagName("builder-component");
  customComponents.forEach(element => {
    const options = parseHTMLAttrs(element.rawAttrs);
    const component = builder.components.get(options.name)?.(options, ctx, element);
    if (!component) console.error(`No component found with name: ${options.name}!`);
    else {
      const componentNode = parseHTML(component);
      buildNode(componentNode, ctx);
      element.replaceWith(componentNode);
    }
  });
}

function replacePlaceholders(str, objName, obj) {
  const regex = new RegExp(`{{${objName}\\.(.*?)}}`, "g");
  const matches = str.matchAll(regex);
  for (const match of matches) {
    const varName = match[1];
    const replacement = obj[varName];
    if (!replacement) console.warn(`No such property: ${varName}`);
    else str = str.replaceAll(match[0], replacement);
  }
  return str;
}

function normalizeName(name, prefix, suffix) {
  if (name.startsWith(prefix)) name = name.replace(prefix, "");
  if (name.endsWith(suffix)) name = name.slice(0, -suffix.length);
  return name;
}

init();