import {
  existsSync,
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

const DIST_DIR = "./dist";

const builder = {
  components: new Map(),
  templates: new Map()
}

async function init() {
  console.log("Building..");
  
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
    const node = buildPage(parseHTML(content).removeWhitespace());
    writeFileSync(`${DIST_DIR}/${route}`, prettifyHTML(node.toString()));
    console.log(`Successfully built: ${route}`);
  }

  fsExtra.copySync("./src/static", DIST_DIR, { filter: (src, dst) => {
    if (dst == DIST_DIR) return true;
    if (existsSync(dst)) {
      console.error(`${dst} already exists, can't copy static file!`);
      return false;
    }
    console.log(`Copying static file.. - ${src} > ${dst}`);
    return true;
  } });
  
  console.log("Successfully built!");
}

function buildPage(node) {
  const ctx = {
    builder: builder,
    socials: socials
  }
  
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

  const customComponents = node.getElementsByTagName("builder-component");
  customComponents.forEach(element => {
    const options = parseHTMLAttrs(element.rawAttrs);
    const component = builder.components.get(options.name)?.(options, ctx);
    if (!component) console.error(`No component found with name: ${options.name}!`);
    else {
      const componentNode = parseHTML(component);
      element.replaceWith(componentNode);
    }
  });
                                                                                       
  return node;
}

function normalizeName(name, prefix, suffix) {
  if (name.startsWith(prefix)) name = name.replace(prefix, "");
  if (name.endsWith(suffix)) name = name.slice(0, -suffix.length);
  return name;
}

init();