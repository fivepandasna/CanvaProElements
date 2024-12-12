let listening = false;
let highlightedElement = null;

// Listen for messages from the background script
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "start") {
    listening = true;
    console.log("Click monitoring enabled");
  } else if (message.action === "stop") {
    listening = false;
    console.log("Click monitoring disabled");
    removeHighlight();
  }
});

// Highlight an element
function highlightElement(element) {
  removeHighlight();

  if (element) {
    highlightedElement = element;
    highlightedElement.style.outline = "3px solid red";
  }
}

// Remove any existing highlight
function removeHighlight() {
  if (highlightedElement) {
    highlightedElement.style.outline = "";
    highlightedElement = null;
  }
}

// Handle mouse movement to highlight elements under the cursor
document.addEventListener("mousemove", (event) => {
  if (listening) {
    const elementUnderCursor = event.target;
    highlightElement(elementUnderCursor);
  }
});

// Handle clicks when listening is enabled
document.addEventListener("click", (event) => {
  if (listening) {
    const clickedElement = event.target;

    // Attempt to find an image in the clicked element or its parent
    const imgElement = clickedElement.closest('div')?.querySelector('img');
    if (imgElement) {
      const imageUrl = imgElement.src;
      console.log("Image URL:", imageUrl);

      browser.runtime.sendMessage({ action: "download", url: imageUrl })
        .then(() => console.log("Message sent to background script"))
        .catch((err) => console.error("Failed to send message:", err));
    } else {
      console.log("No image found in clicked element.");
    }

    // Prevent default click behavior
    event.preventDefault();
  }
});
