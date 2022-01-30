var config = {};
var projectConfig = {};

document.body.style.marginLeft = "24px";
document.body.style.marginRight = "24px";

function loadConfig() {
  fetch("/assets/config.json").then(async response => {
    config = await response.json();
    onConfigLoaded();
  });
}

function loadProjectConfig(_id) {
  fetch("/assets/projects.json").then(async response => {
    let json = await response.json();
    let arr = json.filter(project => project._id === _id);
    projectConfig = arr[0];
    onProjectConfigLoaded();
  });
}

function addHomeButton(url) {
  if (!url) url = "/";
  let bodyHtml = document.body.innerHTML;
  let homeButtonHtml = `<a href="${url}"><img src="${config.homeIcon}" alt="Home" style="width:25px;height:25px;"></a>`;
  document.body.innerHTML = "\n"+homeButtonHtml+"<br>"+bodyHtml;
}

function setBgRounded(div, bgColor, hoverEffects) {
  div.style.borderRadius = "25px";
  div.style.padding = "8px";
  div.style.margin = "8px";
  div.style.backgroundColor = bgColor;
  if (hoverEffects) {
    div.style.transitionDuration = "0.1s";
    div.onmouseover = () => div.style.transform = "scale(0.9)";
    div.ontouchstart = () => div.style.transform = "scale(0.9)";
    div.onmouseout = () => div.style.transform = "scale(1)";
    div.ontouchend = () => div.style.transform = "scale(1)";
    div.ontouchcancel = () => div.style.transform = "scale(1)";
  }
}

function setLinkColors(linkColor, exclude) {
  let as = document.getElementsByTagName("a");
  for (i = 0; i < as.length; i++) {
    as[i].style.textDecoration = "none";
    if (!exclude.includes(as[i])) as[i].style.color = linkColor;
  }
}

function getActionButtons(root) {
  let actionsArr = projectConfig.actions;
  if (actionsArr.length === 0) return;
  let finalActions = [];
  for (i = 0; i < actionsArr.length; i++) {
    let action = actionsArr[i];
    let title = action.title;
    let hNumber = action.hNumber;
    let url = action.url;
    finalActions.push(`<a href="${url}"><div style="text-align:center;color:${config.colorText}"><h3>${title}</h3></div></a>`);
  }
  root.innerHTML = finalActions.join("<br>");
  let divs = root.getElementsByTagName("div");
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
  fetch("/assets/socials.json").then(async response => {
    let socials = await response.json();
    let finalSocials = [];
    for (i = 0; i < socials.length; i++) {
      let social = socials[i];
      finalSocials.push(`<a href="${social.url}" style="text-decoration:none;margin-left:8px;margin-right:8px;"><img src="${social.icon}" alt="${social.name}" style="width:32px;height:32px;"</a>`);
    }
    div.innerHTML = finalSocials.join("");
  });
}

function randomize(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

loadConfig();