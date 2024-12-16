const highlightToggle = document.getElementById("highlightToggle");
const copyHTMLToggle = document.getElementById("copyHTMLToggle");
const downloadImageToggle = document.getElementById("downloadImageToggle");

// Restore saved toggles from local storage
browser.storage.local.get(["toggles"]).then((data) => {
  const toggles = data.toggles || {};
  highlightToggle.checked = toggles.highlight || false;
  copyHTMLToggle.checked = toggles.copyHTML || false;
  downloadImageToggle.checked = toggles.downloadImage || false;
});

// Save toggles and notify content script
function updateToggles() {
  const toggles = {
    highlight: highlightToggle.checked,
    copyHTML: copyHTMLToggle.checked,
    downloadImage: downloadImageToggle.checked,
  };

  // Save toggles in local storage
  browser.storage.local.set({ toggles });

  // Notify the background script to update the content script
  browser.runtime.sendMessage({ action: "updateToggles", toggles });
}

// Add event listeners for the checkboxes
highlightToggle.addEventListener("change", updateToggles);
copyHTMLToggle.addEventListener("change", updateToggles);
downloadImageToggle.addEventListener("change", updateToggles);
