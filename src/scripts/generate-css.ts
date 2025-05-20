import CssFilterConverter from "css-filter-converter";
import { writeFile } from "node:fs/promises";

const colors = {
  surface: "#200019",
  onSurface: "#fa9df4",
  surfaceContainer: "#300029",
  primary: "#ff97cd",
  onPrimary: "#593347"
}

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