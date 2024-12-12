let isListening = false;

// Toggle listening state when the toolbar icon is clicked
browser.action.onClicked.addListener((tab) => {
  isListening = !isListening;
  console.log("Listening state:", isListening);

  // Notify the content script to enable/disable click monitoring
  browser.tabs.sendMessage(tab.id, { action: isListening ? "start" : "stop" }).catch((err) => {
    console.error("Failed to send message to content script:", err);
  });
});

// Handle download requests from content script
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "download" && message.url) {
    console.log("Downloading URL:", message.url);

    browser.downloads.download({
      url: message.url,
      filename: `canva-element-${Date.now()}.png`,
      conflictAction: "uniquify"
    }).then(() => {
      console.log("Download initiated");
    }).catch((err) => {
      console.error("Download failed:", err);
    });
  }
