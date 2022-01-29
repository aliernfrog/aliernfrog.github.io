function readRawFile(url) {
  fetch(url).then(async response => {
    let rawFile = await response.text();
    onRawFileRead(rawFile);
  });
}

function getDescriptionFromReadme(rawFile) {
  let split = rawFile.split("\n");
  let description = "";
  for (i = 0; i < split.length; i++) {
    if (split[i].startsWith("#")) {
      description = split[i+1];
      break;
    }
  }
  return description;
}

function getPartsFromReadme(rawFile, ignore) {
  let split = rawFile.split("\n\n");
  let data = [];
  for (i = 0; i < split.length; i++) {
    let part = split[i];
    let partSplit = part.split("\n");
    let titleStr = partSplit[0];
    let descStr = partSplit.slice(1).join("<br>");
    if (titleStr.startsWith("#") && descStr != null && descStr != "" && !ignore.includes(titleStr)) {
      let title = titleStr.replace("# ","");
      let description = descStr;
      data.push({title: title, description: description});
    }
  }
  return data;
}

function loadPartsFromReadme(rawFile, partsRoot, ignore) {
  let parts = getPartsFromReadme(rawFile, ignore)
  let finalParts = [];
  for (i = 0; i < parts.length; i++) {
    let part = parts[i];
    let partId = part.title.toLowerCase().replaceAll(" ", "-");
    finalParts.push(`<div id="${partId}" class="${partId}" style="text-align:center;color:${config.colorText}"><h3>${part.title}</h3><p1>${part.description}</p1></div>`);
  }
  partsRoot.innerHTML = finalParts.join("<br>");
  let divs = partsRoot.getElementsByTagName("div");
  for (i = 0; i < divs.length; i++) {
    setBgRounded(divs[i], config.colorBgPrimary, false);
  }
}