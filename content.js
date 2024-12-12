console.log("Content script loaded");

// Listen for clicks on the page
document.addEventListener("click", (event) => {
  const clickedElement = event.target;

  // Check if the clicked element is the "button" role div
  if (clickedElement.matches('div[role="button"][aria-label="Add this graphic to the canvas"]')) {
    console.log("Clicked on a Canva button element");

    // Look for the <img> tag two levels above
    const imgElement = clickedElement.closest('div').querySelector('img');
    if (imgElement) {
      const imageUrl = imgElement.src;
      console.log("Image URL:", imageUrl);

      // Send the image URL to the background script
      browser.runtime.sendMessage({ action: "download", url: imageUrl })
        .then(() => console.log("Message sent to background script"))
        .catch((err) => console.error("Failed to send message:", err));
    } else {
      console.error("No image element found above the clicked button.");
    }
  }
});
