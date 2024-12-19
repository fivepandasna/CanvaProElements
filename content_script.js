function scanForImages() {
    console.log("Scanning for images...");
    const images = Array.from(document.images).map(img => ({
        src: img.src,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height
    }));

    console.log("Found images:", images);

    Promise.all(images.map(processImage))
        .then(processedImages => {
            browser.runtime.sendMessage({
                action: "imagesScanned",
                data: processedImages
            }).then(() => {
                console.log("Message sent successfully");
            }).catch(error => {
                console.error("Error sending message:", error);
            });
        });
}

async function processImage(img) {
    if (img.src.startsWith('blob:')) {
        try {
            const response = await fetch(img.src);
            const blob = await response.blob();
            const dataUrl = await blobToDataURL(blob);
            return { ...img, dataUrl };
        } catch (error) {
            console.error("Error processing blob URL:", error);
            return img;
        }
    }
    return img;
}

function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("Received message in content script:", message);
    if (message.action === "scanImages") {
        scanForImages();
    }
    return true;
});

console.log("Content script loaded");