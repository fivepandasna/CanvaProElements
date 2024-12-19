document.addEventListener('DOMContentLoaded', function () {
    // Check if the current page is a Canva page
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0].url;

        // If the page is not a Canva page, show the warning and center it
        if (!url.includes('canva.com')) {
            document.getElementById('container').innerHTML = "<div id='warning'><p>This extension only works on Canva pages.</p></div>";
            document.getElementById('warning').style.textAlign = 'center'; // Center align the warning
            return;
        }

        // If on Canva page, proceed with the normal behavior
        document.getElementById('download-button').addEventListener('click', downloadSelectedImages);

        loadImages();

        function loadImages() {
            browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                browser.tabs.sendMessage(tabs[0].id, { action: "scanImages" });
            });
        }

        browser.runtime.onMessage.addListener(function (message) {
            if (message.action === "imagesScanned") {
                displayImages(message.data);
            }
        });

        function displayImages(imageData) {
            const imageList = document.getElementById('image-list');
            imageList.innerHTML = '';

            imageData.forEach((img, index) => {
                const item = document.createElement('div');
                item.className = 'image-item';

                const image = document.createElement('img');
                image.src = img.dataUrl || img.src;

                const sizeLabel = document.createElement('span');
                sizeLabel.className = 'image-size';
                sizeLabel.textContent = `${img.width}x${img.height}`;

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = JSON.stringify(img);
                checkbox.addEventListener('change', updateSelectedCount);

                item.appendChild(image);
                item.appendChild(sizeLabel);
                item.appendChild(checkbox);

                imageList.appendChild(item);
            });

            updateSelectedCount();
        }

        function updateSelectedCount() {
            const selectedCount = document.querySelectorAll('#image-list input[type="checkbox"]:checked').length;
            const visibleCount = document.querySelectorAll('#image-list .image-item').length;
            document.getElementById('selected-count').textContent = selectedCount;
            document.getElementById('total-count').textContent = visibleCount;
        }

        function downloadSelectedImages() {
            const selectedImages = document.querySelectorAll('#image-list input[type="checkbox"]:checked');
            const imageName = document.getElementById('image-name').value || 'image';

            selectedImages.forEach((checkbox, index) => {
                const imgData = JSON.parse(checkbox.value);
                const fileName = `${imageName}_${index + 1}.jpg`;
                if (imgData.dataUrl) {
                    downloadDataUrlImage(imgData.dataUrl, fileName);
                } else {
                    downloadImage(imgData.src, fileName);
                }
            });
        }

        function downloadDataUrlImage(dataUrl, fileName) {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function downloadImage(url, fileName) {
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const a = document.createElement('a');
                    const blobUrl = URL.createObjectURL(blob);
                    a.href = blobUrl;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(blobUrl);
                })
                .catch(error => console.error('Error downloading the image:', error));
        }
    });
});
