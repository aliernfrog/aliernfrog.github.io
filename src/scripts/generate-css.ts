import CssFilterConverter from "css-filter-converter";
import { writeFile } from "node:fs/promises";
import colors from "../lib/values/colors.ts";

async function generateCss() {
  const vars = {}
  
  for (const [name, hex] of Object.entries(colors)) {
    vars[`--${name}`] = hex;
    const converted = CssFilterConverter.hexToFilter(hex);
    vars[`--${name}-filter`] = converted.color;
  }
  
  let cssString = ":root {\n";
  for (const [name, value] of Object.entries(vars)) {
    cssString += `\t${name}: ${value};\n`;
  }
  cssString += "}";
  
  await writeFile(
    "./src/lib/styles/colors.css",
    cssString
  );
  
  console.log("Generated colors.css");
}

generateCss();