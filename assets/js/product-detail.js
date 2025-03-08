import { products } from './products.js';

document.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo biến toàn cục
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 5000; // Thời gian chuyển slide (5 giây)

    // Lấy thông tin sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    // Cập nhật thông tin sản phẩm cơ bản
    document.title = `${product.name} - Fouria Nailbox`;
    document.querySelector('.product-detail__name').textContent = product.name;
    document.querySelector('.product-detail__price').textContent = product.price;

    // Khởi tạo carousel
    const carouselContainer = document.getElementById('carousel-container');
    const thumbnailsContainer = document.getElementById('thumbnails-container');

    // Tạo các slide hình ảnh
    product.images.forEach((image, index) => {
        // Tạo slide
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${image}" alt="${product.name} - Ảnh ${index + 1}">`;
        carouselContainer.appendChild(slide);

        // Tạo thumbnails điều hướng
        const thumbnail = document.createElement('div');
        thumbnail.className = `carousel-thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="${product.name} - Thumbnail ${index + 1}">`;
        thumbnail.addEventListener('click', () => goToSlide(index));
        thumbnailsContainer.appendChild(thumbnail);
    });

    // Hàm chuyển đến slide cụ thể
    function goToSlide(index) {
        // Cập nhật slide hiện tại
        currentSlide = index;
        updateSlides();
        resetInterval();
    }

    // Hàm cập nhật hiển thị slides
    function updateSlides() {
        // Cập nhật các slide
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) slide.classList.add('active');
        });

        // Cập nhật thumbnails
        const thumbnails = document.querySelectorAll('.carousel-thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.remove('active');
            if (index === currentSlide) thumbnail.classList.add('active');
        });
    }

    // Hàm chuyển đến slide tiếp theo
    function nextSlide() {
        currentSlide = (currentSlide + 1) % product.images.length;
        updateSlides();
    }

    // Hàm chuyển đến slide trước
    function prevSlide() {
        currentSlide = (currentSlide - 1 + product.images.length) % product.images.length;
        updateSlides();
    }

    // Khởi tạo interval tự động chuyển slide
    function startInterval() {
        slideInterval = setInterval(nextSlide, slideDelay);
    }

    // Reset interval khi người dùng tương tác
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Thêm sự kiện cho nút prev/next
    document.getElementById('prev-button').addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    document.getElementById('next-button').addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Bắt đầu tự động chuyển slide
    startInterval();

    // Hàm lấy ngẫu nhiên một số sản phẩm
    function getRandomProducts(productsArray, count, excludeId) {
        // Lọc ra sản phẩm không trùng với sản phẩm hiện tại
        const availableProducts = productsArray.filter(p => p.id !== excludeId);

        // Trộn ngẫu nhiên mảng
        const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());

        // Lấy count sản phẩm đầu tiên
        return shuffled.slice(0, count);
    }

    function renderSuggestedProducts() {
        const suggestedList = document.querySelector('.suggested-products__list');
        const randomProducts = getRandomProducts(products, 4, productId);

        suggestedList.innerHTML = randomProducts.map(product => `
        <a href="product-detail.html?id=${product.id}" class="suggested-product">
            <img src="${product.images[0]}" alt="${product.name}" class="suggested-product__img">
            <h3 class="suggested-product__name">${product.name}</h3>
            <div class="suggested-product__price">${product.price}</div>
        </a>
    `).join('');
    }

    // Gọi hàm renderSuggestedProducts sau khi đã load thông tin sản phẩm
    renderSuggestedProducts();
});

