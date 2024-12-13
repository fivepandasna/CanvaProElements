document.getElementById("start").addEventListener("click", () => {
  chrome.runtime.getBackgroundPage((backgroundPage) => {
    backgroundPage.inspecting = true;
  });
  window.close();
});
