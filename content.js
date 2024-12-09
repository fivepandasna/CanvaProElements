// content.js

// Find all images on the page and return their src URLs
function getImageUrls() {
  const images = document.querySelectorAll('img');
  const imageUrls = [];
  images.forEach((img) => {
    const src = img.src;
    if (src) {
      imageUrls.push(src);
    }
  });
  return imageUrls;
}

// Send message back to popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getImages') {
    sendResponse({ images: getImageUrls() });
  }
});
