import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from "fs";
import fsExtra from "fs-extra";
import { parse as parseHTML } from "node-html-parser";
import prettifyHTML from "pretty";
import socials from "./src/utils/Socials.js";
import { getParentFilePath, readdirRecursively } from "./src/utils/FileUtil.js";
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
    writeFileSync(`${DIST_DIR}/${route}`, prettifyHTML(node.toString()));
    console.log(`Successfully built: ${route}`);
  }

  for (const project of projects) {
    for (const file of project.files) {
      let finalContent = file.content;
      if (file.path.endsWith(".html")) {
        const regex = /{{project\.(.*?)}}/g;
        const matches = finalContent.matchAll(regex);
        
        for (const match of matches) {
          const varName = match[1];
          const replacement = project[varName];
          if (!replacement) console.warn(`[${project.id}] ${file.path}: project has no variable '${varName}'`);
          else finalContent = finalContent.replace(match[0], replacement);
        }
        
        const node = buildPage(
          parseHTML(finalContent),
          ctx
        );
        finalContent = prettifyHTML(node.toString());
      }
      const path = `${DIST_DIR}/${project.url}/${file.path}`;
      const parentPath = getParentFilePath(path);
      mkdirSync(parentPath);
      writeFileSync(path, finalContent);
    }
    if (project.files.length) console.log(`Succesfully built project: ${project.id} (${project.files.length} files)`);
    else console.log(`Project ${project.id} has no files`);
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
  
  console.log("Successfully built!");
}

function buildPage(node, globalCtx) {
  const ctx = { ... globalCtx }
  const builderNode = node.getElementsByTagName("builder")[0];
  const builderConfig = parseBuilderConfig(builderNode);
  builderNode.remove();

  const rawTemplate = builder.templates.get(builderConfig.template?.name);
  if (rawTemplate) {
    const template = parseHTML(rawTemplate).removeWhitespace();
    const templateBuilderNode = template.getElementsByTagName("builder")[0];
    ctx.templateConfig = parseHTMLAttrs(templateBuilderNode);
    templateBuilderNode.remove();
    const body = template.getElementsByTagName("html")[0].getElementsByTagName("body")[0];
    body.getElementsByTagName("builder-content")[0].replaceWith(node);
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

function normalizeName(name, prefix, suffix) {
  if (name.startsWith(prefix)) name = name.replace(prefix, "");
  if (name.endsWith(suffix)) name = name.slice(0, -suffix.length);
  return name;
}

init();