import {
  lstatSync,
  readdirSync,
  readFileSync
} from "fs";
import { readdirRecursively } from "../utils/FileUtil.js";

export default async function() {
  const projectsRoot = readdirSync("./src/projects")
    .filter(f => lstatSync(`./src/projects/${f}`).isDirectory());

  const data = [];

  for (const root of projectsRoot) {
    const meta = await import(`./${root}/meta.json`, { with: { type: "json" } });
    const filePaths = readdirRecursively(`./src/projects/${root}/files`);
    const project = { ...meta.default }
    project.files = filePaths.map(path => ({
      path: path.replace(`./src/projects/${root}/files/`, ""),
      content: readFileSync(path).toString()
    }));
    data.push(project);
  };

  return data;
}