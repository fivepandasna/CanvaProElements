let isInspecting = false;

chrome.runtime.onMessage.addListener((message) => {
  if (message.inspecting) {
    isInspecting = true;
    document.body.style.cursor = "crosshair";
    document.addEventListener("click", handleClick, true);
  } else {
    isInspecting = false;
    document.body.style.cursor = "";
    document.removeEventListener("click", handleClick, true);
  }
});

function handleClick(event) {
  if (!isInspecting) return;

  event.preventDefault();
  event.stopPropagation();

  const element = event.target;
  const elementHTML = element.outerHTML;

  // Show a simple pop-up displaying the HTML
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "10px";
  overlay.style.right = "10px";
  overlay.style.backgroundColor = "white";
  overlay.style.border = "1px solid #ddd";
  overlay.style.padding = "10px";
  overlay.style.zIndex = "9999";
  overlay.style.maxWidth = "400px";
  overlay.style.maxHeight = "400px";
  overlay.style.overflowY = "auto";
  overlay.style.boxShadow = "0px 2px 4px rgba(0,0,0,0.2)";
  overlay.innerHTML = `<pre>${escapeHTML(elementHTML)}</pre>`;
  document.body.appendChild(overlay);

  // Add a close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.marginTop = "10px";
  closeButton.onclick = () => document.body.removeChild(overlay);
  overlay.appendChild(closeButton);

  // Stop inspecting
  isInspecting = false;
  document.body.style.cursor = "";
  document.removeEventListener("click", handleClick, true);
}

function escapeHTML(html) {
  return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
