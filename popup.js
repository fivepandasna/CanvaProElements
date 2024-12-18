const highlightToggle = document.getElementById("highlightToggle");

// Restore saved toggles from local storage
browser.storage.local.get(["toggles"]).then((data) => {
  const toggles = data.toggles || {};
  highlightToggle.checked = toggles.highlight || false;
});

// Save toggles and notify content script
function updateToggles() {
  const toggles = {
    highlight: highlightToggle.checked,
  };

  // Save toggles in local storage
  browser.storage.local.set({ toggles });

  // Notify the background script to update the content script
  browser.runtime.sendMessage({ action: "updateToggles", toggles });
}

// Add event listener for the checkbox
highlightToggle.addEventListener("change", updateToggles);
