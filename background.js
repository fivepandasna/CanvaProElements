// Listen for messages from content script
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "download" && message.url) {
    browser.downloads.download({
      url: message.url,
      filename: `canva-element-${Date.now()}.png`, // You can customize this
      conflictAction: "uniquify"
    });
  }
});
