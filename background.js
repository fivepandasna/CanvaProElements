let inspecting = false;

// Toggle inspecting mode
chrome.browserAction.onClicked.addListener((tab) => {
  inspecting = !inspecting;
  chrome.tabs.sendMessage(tab.id, { inspecting: inspecting });
});
