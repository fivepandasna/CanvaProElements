// Listen for clicks on the page
document.addEventListener("click", (event) => {
  // Check if the clicked element is part of Canva's element selector
  const clickedElement = event.target;

  // Use developer tools to identify the correct selector for Canva images
  if (clickedElement.matches(".element-selector-class")) { 
    const imageUrl = clickedElement.getAttribute("src"); // Adjust based on Canva's structure

    if (imageUrl) {
      // Send the image URL to the background script
      browser.runtime.sendMessage({ action: "download", url: imageUrl });
    }
  }
});
