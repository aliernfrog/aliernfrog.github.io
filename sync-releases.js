import { existsSync, writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";

const repos = [
  {
    repo: "aliernfrog/lac-tool",
    jsonPath: "lactool/latest.json"
  },
  {
    repo: "aliernfrog/pf-tool",
    jsonPath: "pftool/latest.json",
    body: [
      "• Shizuku support",
      "• Full support for scoped storage & folder configuration",
      "• New map list with searching and sorting options",
      "• Multi-selection and batch actions for maps",
      "• Show thumbnail of chosen map",
      "• Quickly open/download maps from .zip files and URLs",
      "• Improved UI for wide screens and RTL layouts",
      "• Various UI improvements",
      "• Various bug fixes",
      "• Monochrome icon"
    ].join("\n")
  },
  {
    repo: "aliernfrog/ensi-manager",
    jsonPath: "ensimanager/latest.json"
  }
];

async function main() {
  for (const repo of repos) {
    console.log(`Generating release info for ${repo.repo}`);
    const info = await generateReleasesInfo(repo);
    const jsonPath = `./src/static/${repo.jsonPath}`;
    const parent = dirname(jsonPath);
    if (!existsSync(parent)) mkdirSync(parent);
    writeFileSync(jsonPath, JSON.stringify(info, null, 2));
    console.log(`Wrote info for ${repo.repo} to ${jsonPath}`);
  }
}

main();

async function generateReleasesInfo(repo) {
  const releases = await (await fetch(`https://api.github.com/repos/${repo.repo}/releases`)).json();
  const alpha = releases[0];
  const alphaObject = await generateReleaseInfo(repo, alpha);
  let stable = alpha;
  let stableObject = alphaObject;
  if (stable.prerelease) {
    const latestStable = releases.find(r => !r.prerelease);
    if (latestStable) {
      stable = latestStable;
      stableObject = await generateReleaseInfo(repo, stable);
    }
  }
  return {
    stable: stableObject,
    preRelease: alphaObject
  };
}

async function generateReleaseInfo(repo, release) {
  const apkFile = release.assets.find(a => a.name.endsWith(".apk"));
  if (!apkFile) return {};
  const versionCode = await getVersionCode(repo, release);
  const bodyMarkdown = release.body
    .replaceAll(":boom:", "💥") // breaking changes
    .replaceAll(":sparkles:", "✨") // feat
    .replaceAll(":bug:", "🐛") // fix
    .replaceAll(":recycle:", "♻️"); // refactor
  const obj = {
    versionCode: versionCode,
    versionName: release.name.toString(),
    preRelease: release.prerelease,
    body: repo.body ?? bodyMarkdown,
    bodyMarkdown: bodyMarkdown,
    htmlUrl: release.html_url,
    downloadUrl: apkFile.browser_download_url.toString()
  }
  if (!repo.body) delete obj.bodyMarkdown;
  return obj;
}

async function getVersionCode(repo, release) {
  const tagInt = tryParseInt(release.tag_name);
  if (tagInt) return tagInt;
  try {
    const gradleFileResponse = await fetch(`https://raw.githubusercontent.com/${repo.repo}/${release.tag_name}/app/build.gradle.kts`);
    const gradleFileLines = (await gradleFileResponse.text()).split("\n");
    const versCodeLine = gradleFileLines.find(l => l.includes("versionCode = "));
    const versCode = tryParseInt(versCodeLine.trim().replace("versionCode = ", ""));
    return versCode ?? 0;
  } catch (e) {
    return 0;
  }
}

function tryParseInt(str) {
  try {
    return parseInt(str);
  } catch (e) {
    return null;
  }
}
