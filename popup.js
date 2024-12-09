// popup.js

document.getElementById('downloadBtn').addEventListener('click', () => {
  // Request image URLs from content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getImages' }, (response) => {
      const imageList = document.getElementById('imageList');
      imageList.innerHTML = ''; // Clear previous list

      if (response && response.images.length > 0) {
        response.images.forEach((imageSrc) => {
          const imgDiv = document.createElement('div');
          imgDiv.className = 'image-item';
          const imgElement = document.createElement('img');
          imgElement.src = imageSrc;
          imgDiv.appendChild(imgElement);
          imageList.appendChild(imgDiv);
        });
      } else {
        imageList.innerHTML = 'No images found!';
      }
    });
  });
});
