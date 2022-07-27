var config = {};
var projectConfig = {};

document.documentElement.style.scrollBehavior = "smooth";
document.body.style.marginLeft = "24px";
document.body.style.marginRight = "24px";

function loadConfig() {
  fetch("/assets/values/config.json").then(async response => {
    config = await response.json();
    onConfigLoaded();
  });
}

function loadProjectConfig(_id) {
  fetch("/assets/values/projects.json").then(async response => {
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
  if (hoverEffects) addHoverEffects(div);
}

function addHoverEffects(div) {
  div.style.transitionDuration = "0.3s";
  div.onmouseover = () => div.style.opacity = "0.5";
  div.ontouchstart = () => div.style.opacity = "0.5";
  div.onmouseout = () => div.style.opacity = "1";
  div.ontouchend = () => div.style.opacity = "1";
  div.ontouchcancel = () => div.style.opacity = "1";
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
  fetch("/assets/values/socials.json").then(async response => {
    let socials = await response.json();
    let finalSocials = [];
    for (i = 0; i < socials.length; i++) {
      let social = socials[i];
      finalSocials.push(`<a href="${social.url}" style="text-decoration:none;margin-left:8px;margin-right:8px;"><img src="${social.icon}" alt="${social.name}" style="width:32px;height:32px;"</a>`);
    }
    div.innerHTML = finalSocials.join("");
    const elements = div.getElementsByTagName("img");
    for (i = 0; i < elements.length; i++) {
      addHoverEffects(elements[i]);
    }
  });
}

function randomize(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

loadConfig();