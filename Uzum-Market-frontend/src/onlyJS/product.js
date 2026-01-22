import { getAllProducts } from "./backend.js";
import { initCart } from "./cart.js";
import "./favorites.js";
import "../components/scripts/header.js";

function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function renderProductImages(images) {
    const mainImage = document.getElementById('mainImage');
    const thumbnailContainer = document.getElementById('thumbnailContainer');

    if (!images || images.length === 0) {
        mainImage.src = '/public/images/placeholder.png';
        return;
    }

    mainImage.src = images[0];
    mainImage.alt = 'Product Image';
    thumbnailContainer.innerHTML = '';

    if (images.length > 1) {
        images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail-item ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${image}" alt="Thumbnail ${index + 1}">`;

            thumbnail.addEventListener('click', () => {
                document.querySelectorAll('.thumbnail-item').forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            });

            thumbnailContainer.appendChild(thumbnail);
        });
    }
}

function renderProductInfo(product) {
    const priceMultiplier = 100;
    const realisticPrice = product.price * priceMultiplier;
    const oldPrice = realisticPrice * 1.3;

    document.title = `${product.title} - Uzum Market`;

    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('ratingValue').textContent = product.rating || 0;
    document.getElementById('reviewsCount').textContent = `(${product.reviews || 0} отзывов)`;
    document.getElementById('oldPrice').textContent = `${oldPrice.toLocaleString()} сум`;
    document.getElementById('currentPrice').textContent = `${realisticPrice.toLocaleString()} сум`;
    document.getElementById('productDescription').textContent = product.description || 'Описание отсутствует';

    const categoryMap = {
        'PC': 'Компьютеры и гейминг',
        'TV': 'Телевизоры',
        'audio': 'Аудио и аксессуары',
        'kitchen': 'Бытовая техника',
        'furniture': 'Мебель и комфорт'
    };

    document.getElementById('productCategory').textContent = categoryMap[product.type] || product.type || 'Без категории';

    renderProductImages(product.media);

    window.currentProduct = {
        _id: product._id,
        title: product.title,
        price: realisticPrice,
        media: product.media
    };

    if (window.favoritesManager && window.favoritesManager.isFavorite(product._id)) {
        const favoriteBtn = document.getElementById('addToFavoriteBtn');
        favoriteBtn.classList.add('active');
    }
}

function setupCartButton() {
    const addToCartBtn = document.getElementById('addToCartBtn');

    addToCartBtn.addEventListener('click', () => {
        if (window.cart && window.currentProduct) {
            window.cart.addToCart(window.currentProduct);

            addToCartBtn.textContent = 'Добавлено!';
            addToCartBtn.style.background = '#4caf50';

            setTimeout(() => {
                addToCartBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    Добавить в корзину
                `;
                addToCartBtn.style.background = '#7000ff';
            }, 1500);
        }
    });
}

function setupFavoriteButton() {
    const addToFavoriteBtn = document.getElementById('addToFavoriteBtn');

    addToFavoriteBtn.addEventListener('click', () => {
        if (window.favoritesManager && window.currentProduct) {
            const productId = window.currentProduct._id;
            const isFavorite = window.favoritesManager.isFavorite(productId);

            if (isFavorite) {
                const index = window.favoritesManager.favorites.indexOf(productId);
                if (index > -1) {
                    window.favoritesManager.favorites.splice(index, 1);
                    window.favoritesManager.saveFavorites();
                    addToFavoriteBtn.classList.remove('active');
                }
            } else {
                window.favoritesManager.favorites.push(productId);
                window.favoritesManager.saveFavorites();
                addToFavoriteBtn.classList.add('active');
            }
        }
    });
}

async function loadProductData() {
    const productId = getProductIdFromURL();

    if (!productId) {
        console.error('Product ID not found in URL');
        document.querySelector('.product-container').innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2>Товар не найден</h2>
                <p>Пожалуйста, вернитесь на главную страницу</p>
                <button class="back-button" onclick="window.location.href='/'">На главную</button>
            </div>
        `;
        return;
    }

    try {
        const response = await getAllProducts();
        const products = response.data || response;
        const product = products.find(p => p._id === productId);

        if (!product) {
            throw new Error('Product not found');
        }

        renderProductInfo(product);
        setupCartButton();
        setupFavoriteButton();

    } catch (error) {
        console.error('Error loading product:', error);
        document.querySelector('.product-container').innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2>Ошибка загрузки товара</h2>
                <p>Пожалуйста, попробуйте позже</p>
                <button class="back-button" onclick="window.history.back()">Назад</button>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCart();
    loadProductData();
});
