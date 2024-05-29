const whiteFlagUrl = "assets/svg-country-flags/svg/ru.svg";
const russianFlagUrl = "https://flagcdn.com/h40/ru.png";

function fixWhiteFlag(image) {
  if (image.src.endsWith(whiteFlagUrl)) {
    image.src = russianFlagUrl;
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
      flagImg.src = russianFlagUrl;
      cells[flagColumn].appendChild(flagImg);
    }
  });
}

const observer = new MutationObserver(mutations => {
  for (let mutation of mutations) {
    if (mutation.type == "childList") {
      for (let node of mutation.addedNodes) {
        if (node.nodeName == "IMG") {
          fixWhiteFlag(node);
        } else if (node.nodeType == Node.ELEMENT_NODE) {
          node.querySelectorAll(":scope table.resulttable").forEach(fixErasedFlagInTable);
        }
      }
    } else if (mutation.type == "attributes" && mutation.attributeName == "src") {
      fixWhiteFlag(mutation.target);
    }
  }
});

observer.observe(document, { attributes: true, childList: true, subtree: true });
