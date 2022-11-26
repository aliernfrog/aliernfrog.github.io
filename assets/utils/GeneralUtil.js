var config = {};
var projectConfig = {};

document.documentElement.style.scrollBehavior = "smooth";
document.body.style["-webkit-tap-highlight-color"] = "transparent";

function loadConfig() {
  fetch("/assets/values/config.json").then(async response => {
    config = await response.json();
    onConfigLoaded();
  });
}

function loadProjectConfig(id) {
  fetch("/assets/values/projects.json").then(async response => {
    let json = await response.json();
    let arr = json.filter(project => project.id === id);
    projectConfig = arr[0];
    if (projectConfig.ambientColor) setAmbientColor(projectConfig.ambientColor);
    onProjectConfigLoaded();
  });
}

function addHomeButton(url) {
  if (!url) url = "/";
  const topbar = document.getElementById("topbar");
  const homeButtonHtml = `<a class="ignore-link" href=${url}>`+
  `<div id="home" style="height:20px;display:inline-block;text-decoration:none;color:${config.colorText}">`+
  `<img src="${config.homeIcon}" style="width:20px;vertical-align:middle;"> `+
  `<p1 style="vertical-align:middle;"><b>aliernfrog</b></p1>`+
  `</div>`+
  `</a>`;
  topbar.innerHTML = "\n"+homeButtonHtml+"<br>"+topbar.innerHTML;
  setBgRounded(document.getElementById("home"), config.colorBgPrimary);
}

function setAmbientColor(color) {
  const topbar = document.getElementById("topbar");
  document.body.style.backgroundImage = `linear-gradient(${color}, ${config.colorBody} ${topbar.offsetHeight*3}px)`;
  document.body.style.backgroundRepeat = "no-repeat";
}

function setHeaderStyle(id = "header") {
  const header = document.getElementById(id);
  header.style.fontSize = "30px";
  header.style.fontWeight = "bold";
}

function setBgRounded(div, bgColor, hoverEffects) {
  div.style.borderRadius = "25px";
  div.style.padding = "8px";
  div.style.margin = "8px";
  div.style.backgroundColor = bgColor;
  if (hoverEffects) addHoverEffects(div);
}

function addHoverEffects(div) {
  div.style.transitionDuration = "0.2s";
  div.onmouseover = () => div.style.opacity = "0.3";
  div.ontouchstart = () => div.style.opacity = "0.3";
  div.onmouseout = () => div.style.opacity = "1";
  div.ontouchend = () => div.style.opacity = "1";
  div.ontouchcancel = () => div.style.opacity = "1";
  div.onclick = () => {
    div.style.opacity = "0.3";
    setTimeout(() => div.style.opacity = "1", 200);
  }
}

function setLinkColors(linkColor) {
  let as = document.getElementsByTagName("a");
  for (i = 0; i < as.length; i++) {
    const element = as[i];
    element.style.textDecoration = "none";
    element.style.fontWeight = "bold";
    addHoverEffects(element);
    if (element.className !== "ignore-link") element.style.color = linkColor;
  }
}

function getActionButtons(root) {
  const actionsArr = projectConfig.actions;
  if (actionsArr.length === 0) return;
  const finalActions = [];
  for (i = 0; i < actionsArr.length; i++) {
    const action = actionsArr[i];
    finalActions.push([
      `<a href="${action.url}">`,
      `<div style="text-align:center;color:${config.colorText};">`,
      `<p><b>${action.title}</b></p>`,
      `</div></a>`
    ].join(""));
  }
  root.innerHTML = finalActions.join("");
  const divs = root.getElementsByTagName("div");
  for (i = 0; i < divs.length; i++) {
    let div = divs[i];
    let actionColor = actionsArr[i].color;
    let color = config.colorBgSecondary;
    if (actionColor === "blue") color = config.colorBlue;
    setBgRounded(div, color, true);
  }
  setBgRounded(root, config.colorBgPrimary);
}

function getSocials(div) {
  fetch("/assets/values/socials.json").then(async response => {
    let socials = await response.json();
    let finalSocials = [];
    for (i = 0; i < socials.length; i++) {
      let social = socials[i];
      finalSocials.push(`<a href="${social.url}" style="text-decoration:none;padding:8px;"><div style="display:inline-block;padding:8px;margin:16px 0px 16px 0px;"><img src="${social.icon}" alt="${social.name}" style="width:30px;height:30px;vertical-align:middle;"></div></a>`);
    }
    div.innerHTML = finalSocials.join(" ");
    const elements = div.getElementsByTagName("div");
    for (i = 0; i < elements.length; i++) {
      const element = elements[i];
      element.style.borderRadius = "25px";
      element.style.backgroundColor = config.colorBgPrimary;
      addHoverEffects(element);
    }
  });
}

function randomize(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

loadConfig();