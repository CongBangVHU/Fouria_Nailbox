// Import dữ liệu sản phẩm Hot2025
import { products__hot2025 } from './products.js';

// Hiển thị danh sách sản phẩm
const productList = document.getElementById('product-list');

products__hot2025.forEach((product, index) => {
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

