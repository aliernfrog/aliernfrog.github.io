import { parse as parseMarkdown } from "marked";

export default function({}, {}, element) {
  const raw = element.childNodes[0]._rawText;

  // Remove indentation and leading/trailing whitespace
  const readable = raw.trim().replace(/^\s+/gm, "").replaceAll("\\n","<br>");
  return parseMarkdown(readable);
}