var config = {};

function loadConfig() {
  fetch("/assets/config.json").then(async response => {
    config = await response.json();
    onConfigLoaded();
  });
}

function setBgRounded(div, bgColor, hoverEffects) {
  div.style.borderRadius = "25px";
  div.style.padding = "8px"
  div.style.backgroundColor = bgColor;
  if (hoverEffects) {
    div.style.transitionDuration = "0.1s";
    div.onmouseover = () => div.style.transform = "scale(0.9)";
    div.onmouseout = () => div.style.transform = "scale(1)";
  }
}

function setLinkColors(linkColor, exclude) {
  let as = document.getElementsByTagName("a");
  for (i = 0; i < as.length; i++) {
    as[i].style.textDecoration = "none";
    if (!exclude.includes(as[i])) as[i].style.color = linkColor;
  }
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