document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('carousel-container');
    const zoomOverlay = document.getElementById('zoom-overlay');
    const zoomImage = document.getElementById('zoom-image');

    // Handle click on carousel image
    container.addEventListener('click', function (e) {
        const activeSlide = container.querySelector('.carousel-slide.active img');
        if (activeSlide) {
            zoomImage.src = activeSlide.src;
            zoomOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when zoomed
        }
    });

    // Close zoom overlay when clicking outside the image
    zoomOverlay.addEventListener('click', function (e) {
        if (e.target === zoomOverlay) {
            closeZoom();
        }
    });

    // Close zoom on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeZoom();
        }
    });

    function closeZoom() {
        zoomOverlay.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
});
