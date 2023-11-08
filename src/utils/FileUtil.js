import { readdirSync, statSync } from "fs";

export function getParentFilePath(path) {
  const split = path.split("/");
  split.pop();
  return split.join("/");
}

export function readdirRecursively(path) {
  let files = [];
  readdirSync(path).forEach(file => {
    const absolute = `${path}/${file}`;
    const isDir = statSync(absolute).isDirectory();
    if (statSync(absolute).isDirectory()) files = files.concat(
      readdirRecursively(absolute)
    );
    else files.push(absolute);
  });
  return files;
}