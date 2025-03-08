// Import dữ liệu sản phẩm
import { products } from './products.js';

// Hiển thị danh sách sản phẩm
const productList = document.getElementById('product-list');

products.forEach((product, index) => {
    if (index % 4 === 0) {
        const row = document.createElement('div');
        row.className = 'grid__row';
        productList.appendChild(row);
    }

    const productCard = document.createElement('div');
    productCard.className = 'grid__column-2-4';

    // Tạo một ID duy nhất cho mỗi carousel
    const carouselId = `carousel-${product.id}`;

    productCard.innerHTML = `
        <div class="product-card"> 
            <div class="carousel" id="${carouselId}">
                <div class="carousel-inner">
                    ${product.images.map((img, i) => `
                        <div class="carousel-item ${i === 0 ? 'active' : ''}" data-index="${i}">
                            <img src="${img}" alt="${product.name}" class="product-card__img">
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-control-prev">&#10094;</button>
                <button class="carousel-control-next">&#10095;</button>
            </div>
            <h4 class="product-card__name">${product.name}</h4>
            <p class="product-card__price">${product.price}</p>
            <button class="product-card__btn">Xem chi tiết</button>
        </div>
    `;

    // Thêm sự kiện cho nút xem chi tiết
    productCard.querySelector('.product-card__btn').addEventListener('click', function () {
        window.location.href = `product-detail.html?id=${product.id}`;
    });

    // Thêm sự kiện cho nút prev/next
    const carousel = productCard.querySelector(`#${carouselId}`);
    const prevButton = carousel.querySelector('.carousel-control-prev');
    const nextButton = carousel.querySelector('.carousel-control-next');

    prevButton.addEventListener('click', () => prevSlide(carousel));
    nextButton.addEventListener('click', () => nextSlide(carousel));

    productList.lastChild.appendChild(productCard);
});

// Cập nhật hàm prevSlide và nextSlide
function prevSlide(carousel) {
    const items = carousel.querySelectorAll('.carousel-item');
    let activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));

    items[activeIndex].classList.remove('active');
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    items[activeIndex].classList.add('active');
}

function nextSlide(carousel) {
    const items = carousel.querySelectorAll('.carousel-item');
    let activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));

    items[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % items.length;
    items[activeIndex].classList.add('active');
}

// Banner Slideshow
function initBanner() {
    const banner = document.querySelector('.banner');
    const slides = banner.querySelectorAll('.banner__slide');
    const dotsContainer = banner.querySelector('.banner__dots');
    let currentSlide = 0;
    let slideInterval;

    // Tạo dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('banner__dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Hàm chuyển slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dotsContainer.children[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dotsContainer.children[currentSlide].classList.add('active');
    }

    // Hàm chuyển slide tiếp theo
    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    // Hàm chuyển slide trước
    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    // Auto play
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners
    banner.querySelector('.banner__btn--next').addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });

    banner.querySelector('.banner__btn--prev').addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });

    // Dừng autoplay khi hover vào banner
    banner.addEventListener('mouseenter', stopSlideShow);
    banner.addEventListener('mouseleave', startSlideShow);

    // Bắt đầu slideshow
    startSlideShow();
}

// Khởi tạo banner khi trang tải xong
document.addEventListener('DOMContentLoaded', initBanner);

// Xử lý sự kiện cho modal đăng nhập
document.getElementById('login-btn').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('login-modal').style.display = 'block';
});

document.getElementById('close-btn').addEventListener('click', function () {
    document.getElementById('login-modal').style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target == document.getElementById('login-modal')) {
        document.getElementById('login-modal').style.display = 'none';
    }
});

document.getElementById('navbar-toggle').addEventListener('click', function () {
    document.getElementById('navbar-list').classList.toggle('active');
});

// Add this code to your existing main.js

document.addEventListener('DOMContentLoaded', function () {
    const modalTabs = document.querySelectorAll('.modal-tab');
    const formSections = document.querySelectorAll('.form-section');

    modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            modalTabs.forEach(t => t.classList.remove('active'));
            formSections.forEach(f => f.classList.remove('active'));

            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            const formId = `${tab.dataset.tab}-form`;
            document.getElementById(formId).classList.add('active');
        });
    });
});

// Add registration button click handler
document.getElementById('register-btn').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('login-modal').style.display = 'block';

    // Switch to registration tab
    const modalTabs = document.querySelectorAll('.modal-tab');
    const formSections = document.querySelectorAll('.form-section');

    modalTabs.forEach(t => t.classList.remove('active'));
    formSections.forEach(f => f.classList.remove('active'));

    document.querySelector('[data-tab="register"]').classList.add('active');
    document.getElementById('register-form').classList.add('active');
});
