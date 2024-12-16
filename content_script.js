let toggles = {
  highlight: false,
  copyHTML: false,
  downloadImage: false,
};

function highlightElement(event) {
  if (toggles.highlight) {
    event.target.style.outline = "3px solid yellow"; // Highlight the element
  }
  if (toggles.copyHTML) {
    copyToClipboard(event.target.outerHTML); // Copy element's HTML
  }
  if (toggles.downloadImage && event.target.tagName.toLowerCase() === "img") {
    downloadImage(event.target.src); // Download the image
  }
}

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  console.log("HTML copied to clipboard!");
}

function downloadImage(imageUrl) {
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "downloaded_image";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  console.log("Image downloaded!");
}

function toggleListeners(enable) {
  if (enable) {
    document.addEventListener("click", highlightElement, true);
  } else {
    document.removeEventListener("click", highlightElement, true);
  }
}

// Listen for messages from the background or popup
browser.runtime.onMessage.addListener(function(message) {
  if (message.action === "updateToggles") {
    toggles = message.toggles; // Update toggles
    toggleListeners(toggles.highlight || toggles.copyHTML || toggles.downloadImage);
  }
});