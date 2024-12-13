let isHighlighting = false;

// Function to highlight the clicked element
function highlightElement(event) {
  if (isHighlighting) {
    event.target.style.outline = "3px solid yellow"; // Apply the highlight style
  }
}

// Function to toggle highlighting mode
function toggleHighlighting() {
  isHighlighting = !isHighlighting;

  if (isHighlighting) {
    document.addEventListener("click", highlightElement, true);
    console.log("Highlighting activated");
  } else {
    document.removeEventListener("click", highlightElement, true);
    console.log("Highlighting deactivated");
  }
}

// Listen for messages from the background script
browser.runtime.onMessage.addListener(function(message) {
  if (message.action === "startHighlighting") {
    toggleHighlighting();
  }
});
