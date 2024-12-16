// Listen for a click on the extension icon
browser.browserAction.onClicked.addListener(function() {
  // Open the popup interface
  browser.runtime.openOptionsPage();
});

// Listen for messages from the popup or content scripts
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Broadcast toggles to the content script
  if (request.action === "updateToggles") {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        action: "updateToggles",
        toggles: request.toggles,
      });
    });
  }
});