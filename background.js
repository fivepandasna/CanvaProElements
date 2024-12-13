// Listen for a click on the extension icon
browser.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the content script to activate element highlighting
  browser.tabs.sendMessage(tab.id, { action: "startHighlighting" });
});
