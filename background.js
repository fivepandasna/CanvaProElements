// Add this at the very top to confirm the script is active
console.log("Background script loaded and running");

// Listener for messages from the content script
browser.runtime.onMessage.addListener((message) => {
  console.log("Message received in background script:", message);

  if (message.action === "download" && message.url) {
    console.log("Initiating download for URL:", message.url);

    browser.downloads.download({
      url: message.url,
      filename: `canva-element-${Date.now()}.png`, // Generate a unique filename
      conflictAction: "uniquify"
    }).then(() => {
      console.log("Download started successfully");
    }).catch((err) => {
      console.error("Download failed:", err);
    });
  }
});
