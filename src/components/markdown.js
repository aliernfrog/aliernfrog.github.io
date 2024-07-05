import { readFileSync } from "fs";
import { parse as parseMarkdown } from "marked";

export default function({
  fromFile
}, {}, element) {
  const raw = fromFile ? readFileSync(fromFile).toString() : element.childNodes[0]._rawText;

  // Remove indentation and leading/trailing whitespace
  const readable = raw.trim().replace(/^\s+/gm, "").replaceAll("\\n","<br>");
  return parseMarkdown(readable);
}