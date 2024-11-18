function isWhiteFlag(image) {
  const whiteFlag = "assets/svg-country-flags/svg/ru.svg";
  return image.src.endsWith(whiteFlag);
}

function isCdn(image) {
  const сdn = "https://flagcdn.com";
  return image.src.startsWith(сdn);
}

function getAltFlag(country) {
  const altFlags = "https://purecatamphetamine.github.io/country-flag-icons/3x2/";
  return altFlags + country.slice(0, 2).toUpperCase() + ".svg";
}

function fixFlag(image) {
  if (isWhiteFlag(image)) {
    image.src = getAltFlag("ru");

  } else if (isCdn(image)) {
    const t = image.src.split('/');
    const country = t[t.length - 1].split('.')[0];
    image.src = getAltFlag(country);
  }
}

function fixErasedFlagInTable(table) {
  table.querySelectorAll(":scope tr").forEach(row => {
    const attributeName = Object.values(row.attributes).map(e => e.name).find(e => e.startsWith("_ngcontent"));
    const cells = row.querySelectorAll(":scope td");

    const flagColumn = 1;

    if (cells.length > flagColumn && cells[flagColumn].children.length == 0) {
      const flagImg = document.createElement("img");
      flagImg.setAttribute(attributeName, "");
      flagImg.className = "driverflag ng-star-inserted";
      flagImg.id = "countryflag";
      flagImg.src = getAltFlag("ru");
      cells[flagColumn].appendChild(flagImg);
    }
  });
}

const observer = new MutationObserver(mutations => {
  for (let mutation of mutations) {
    if (mutation.type == "childList") {
      for (let node of mutation.addedNodes) {
        if (node.nodeName == "IMG") {
          fixFlag(node)
        } else if (node.nodeType == Node.ELEMENT_NODE) {
          node.querySelectorAll(":scope table.resulttable").forEach(fixErasedFlagInTable);
          node.querySelectorAll(":scope img").forEach(fixFlag);
        }
      }
    } else if (mutation.type == "attributes" && mutation.attributeName == "src") {
      fixFlag(mutation.target);
    }
  }
});

observer.observe(document, { attributes: true, childList: true, subtree: true });
