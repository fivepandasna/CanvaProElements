let isHighlighting = false;
let isCopyHTML = false;
let isDownloadImages = false;

// Function to highlight the clicked element
function highlightElement(event) {
  if (isHighlighting) {
    event.target.style.outline = "3px solid yellow"; // Apply the highlight style
  }
}

// Function to copy element HTML to clipboard
function copyElementHTML(event) {
  if (isCopyHTML) {
    const elementHTML = event.target.outerHTML;
    navigator.clipboard.writeText(elementHTML).then(
      () => console.log("HTML copied to clipboard"),
      (err) => console.error("Failed to copy HTML", err)
    );
  }
}

// Function to download clicked images
function downloadImage(event) {
  if (isDownloadImages && event.target.tagName === "IMG") {
    const imageURL = event.target.src;
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "downloaded-image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("Image downloaded: " + imageURL);
  }
}

// Function to toggle features
function toggleFeature(feature) {
  switch (feature) {
    case "highlighting":
      isHighlighting = !isHighlighting;
      console.log("Highlighting toggled: " + isHighlighting);
      break;
    case "copyHTML":
      isCopyHTML = !isCopyHTML;
      console.log("Copy HTML toggled: " + isCopyHTML);
      break;
    case "downloadImages":
      isDownloadImages = !isDownloadImages;
      console.log("Download Images toggled: " + isDownloadImages);
      break;
  }
}

// Function to handle element interactions
function handleElementClick(event) {
  if (isHighlighting) {
    highlightElement(event);
  }
  if (isCopyHTML) {
    copyElementHTML(event);
  }
  if (isDownloadImages) {
    downloadImage(event);
  }
}

// Listen for messages from the background script
browser.runtime.onMessage.addListener(function (message) {
  if (message.action === "startHighlighting") {
    toggleFeature("highlighting");
  }
  if (message.action === "toggleCopyHTML") {
    toggleFeature("copyHTML");
  }
  if (message.action === "toggleDownloadImages") {
    toggleFeature("downloadImages");
  }
});

// Add event listener for clicks
if (!document.hasClickListener) {
  document.addEventListener("click", handleElementClick, true);
  document.hasClickListener = true;
}