function setBgRounded(div, bgColor) {
  div.style.borderRadius = "25px";
  div.style.padding = "8px"
  div.style.backgroundColor = bgColor;
}

function setLinkColors(linkColor, exclude) {
  let as = document.getElementsByTagName("a");
  for (i = 0; i < as.length; i++) {
    if (!exclude.includes(as[i])) as[i].style.color = linkColor;
  }
}