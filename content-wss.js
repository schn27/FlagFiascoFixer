const whiteFlagUrl = "https://upload.wikimedia.org/wikipedia/commons/a/ac/White_flag_of_surrender.svg";
const russianFlagUrl = "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg";

function fixWhiteFlag(image) {
  if (image.src == whiteFlagUrl) {
    image.src = russianFlagUrl;
  }
}

const observer = new MutationObserver(mutations => {
  for (let mutation of mutations) {
    for (let node of mutation.addedNodes) {
      if (node.nodeName == "IMG") {
        fixWhiteFlag(node);
      }
    }
  }
});

observer.observe(document, { childList: true, subtree: true });
