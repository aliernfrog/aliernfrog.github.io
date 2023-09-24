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
import { readdirRecursively } from "./src/utils/FileUtil.js";
import { parseBuilderConfig, parseHTMLAttrs } from "./src/utils/HTMLParserUtil.js";
import projects from "./src/values/projects.json" assert { type: "json" }

const DIST_DIR = "./dist";
const PROJECT_TEMPLATE_FILE = "./src/misc/project_template.html";

const builder = {
  components: new Map(),
  templates: new Map()
}

async function init() {
  console.log("Building..");

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
    const content = readFileSync(file).toString().replaceAll("\n","");
    const node = buildPage(parseHTML(content).removeWhitespace(), ctx);
    writeFileSync(`${DIST_DIR}/${route}`, prettifyHTML(node.toString()));
    console.log(`Successfully built: ${route}`);
  }

  const projectTemplate = readFileSync(PROJECT_TEMPLATE_FILE).toString();
  for (const project of projects) {
    // TODO maybe there is a better way to do this?
    const node = buildPage(
      parseHTML(
        projectTemplate
          .replaceAll("{{PROJECT.NAME}}", project.name)
          .replaceAll("{{PROJECT.DESCRIPTION}}", project.description)
          .replaceAll("{{PROJECT.ICON}}", project.icon)
          .replaceAll("{{PROJECT.AMBIENT_COLOR}}", project.ambientColor)
          .replaceAll("{{PROJECT.README}}", project.readme)
      ),
      ctx
    );
    const parentPath = `${DIST_DIR}/${project.url}`;
    mkdirSync(parentPath);
    const path = `${parentPath}/index.html`;
    writeFileSync(path, prettifyHTML(node.toString()));
    console.log(`Succesfully built project: ${project.name} > ${path}`);
  }

  fsExtra.copySync("./src/static", DIST_DIR, { filter: (src, dst) => {
    if (existsSync(dst) && lstatSync(dst).isFile()) {
      console.error(`${dst} already exists, can't copy static file!`);
      return false;
    }
    console.log(`Copying static file.. - ${src} > ${dst}`);
    return true;
  } });
  
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
    const component = builder.components.get(options.name)?.(options, ctx);
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