export function parseBuilderConfig(builderNode) {
  const result = {};
  builderNode?.childNodes?.filter?.(n => !!n.rawTagName)?.forEach?.(node => {
    result[node.rawTagName] = parseHTMLAttrs(node.rawAttrs);
  });
  return result;
}

export function parseHTMLAttrs(str) {
  const regex = /(\w+)="([^"]+)"/g;
  const result = {};
  let match;
  while ((match = regex.exec(str)) !== null) {
    const option = match[1];
    const value = match[2];
    result[option] = value;
  }
  return result;
}