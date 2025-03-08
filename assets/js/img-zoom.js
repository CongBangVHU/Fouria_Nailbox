// Image zoom functionality
const productImages = document.querySelectorAll('.product-image-zoom img');
const zoomOverlay = document.getElementById('zoom-overlay');
const zoomImage = document.getElementById('zoom-image');

productImages.forEach(image => {
    image.addEventListener('click', function () {
        zoomImage.src = this.src;
        zoomOverlay.style.display = 'block';
    });
});

// Close zoom overlay when clicking outside
zoomOverlay.addEventListener('click', function (e) {
    if (e.target === zoomOverlay) {
        zoomOverlay.style.display = 'none';
    }
});

// Close zoom overlay with ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        zoomOverlay.style.display = 'none';
    }
});