// Create the context menu for images
browser.contextMenus.create({
  id: "downloadImage",
  title: "Download with Canva Pro",
  contexts: ["image"],
});

// Handle the context menu click event
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "downloadImage") {
    browser.tabs.sendMessage(tab.id, { action: "downloadImage", src: info.srcUrl });
  }
});

// Listen for messages from the popup to broadcast toggles
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateToggles") {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        action: "updateToggles",
        toggles: request.toggles,
      });
    });
  }
});