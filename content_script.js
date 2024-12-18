let toggles = {
  highlight: false,
};

function highlightElement(event) {
  if (toggles.highlight) {
    event.target.style.outline = "3px solid yellow"; // Highlight the element
  }
}

function toggleListeners(enable) {
  if (enable) {
    document.addEventListener("click", highlightElement, true);
  } else {
    document.removeEventListener("click", highlightElement, true);
  }
}

// Handle image download
function downloadImage(imageUrl) {
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "downloaded_image";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  console.log("Image downloaded!");
}

// Listen for messages from the background script
browser.runtime.onMessage.addListener(function(message) {
  if (message.action === "updateToggles") {
    toggles = message.toggles; // Update toggles
    toggleListeners(toggles.highlight);
  } else if (message.action === "downloadImage") {
    downloadImage(message.src); // Download the image
  }
});
