import { getAllProducts } from "./backend.js";
import "./cart.js";

const grids = {
    gaming: document.getElementById("gamingGrid"),
    audio: document.getElementById("audioGrid"),
    tv: document.getElementById("tvGrid"),
    kitchen: document.getElementById("kitchenGrid"),
    home: document.getElementById("homeGrid")
};

function createProductCard(product) {
    const imageUrl = (product.media[0]);
    const productId = product._id;
    const price = product.price;
    const oldPrice = product.oldPrice;

    const count = window.cart ? window.cart.getItemCount(productId) : 0;

    let buttonHtml;

    if (count > 0) {
        buttonHtml = `
            <div class="cart-counter" onclick="event.stopPropagation()">
                <button class="counter-btn" onclick="decreaseItem('${productId}')">-</button>
                <span class="counter-value">${count}</span>
                <button class="counter-btn" onclick="increaseItem('${productId}', '${product.title}', ${price}, '${imageUrl}')">+</button>
            </div>
        `;
    } else {
        buttonHtml = `
            <button class="add-to-cart" 
                    onclick="event.stopPropagation(); handleAddToCart(event)"
                    data-id="${productId}"
                    data-title="${product.title}"
                    data-price="${price}"
                    data-image="${imageUrl}">
                <img src="/public/icons/shopping-bag.svg" class="icon-small">
            </button>
        `;
    }

    return `
    <div class="product-card" data-id="${productId}" onclick="goToProduct('${productId}')" style="cursor:pointer"> 
        <div class="card-image-container">
            <img src="${imageUrl}" alt="${product.title}">
            <button class="wishlist-btn" onclick="event.stopPropagation(); toggleFavorite(this)">
                <svg width="20" height="20" viewBox="0 0 24 24" stroke-width="2" class="favorite-icon">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </div>
        
        <div class="card-info">
            <p class="product-title">${product.title}</p>
            <div class="rating">
                <img src="/public/images/Без названия.png" class="rating-star-icon">
                <span>${product.rating || 0}</span>
                <span class="reviews-count">(${product.reviews || 0} отзывов)</span>
            </div> 

            <div class="price-wrapper">
                <div class="price-block">
                    <p class="old-price">${oldPrice.toLocaleString()} сум</p>
                    <p class="current-price">${price.toLocaleString()} сум</p>
                </div>
                ${buttonHtml}
            </div>
        </div>
    </div>`;
}

window.handleAddToCart = function (event) {
    console.log('handleAddToCart clicked');
    const btn = event.currentTarget;
    const imageUrl = btn.dataset.image;
    const product = {
        _id: btn.dataset.id,
        title: btn.dataset.title,
        price: Number(btn.dataset.price),
        media: imageUrl && imageUrl !== "undefined" ? [imageUrl] : []
    };
    window.cart.addToCart(product);
};

window.increaseItem = function (id, title, price, image) {
    const product = {
        _id: id,
        title: title,
        price: price,
        media: [image]
    };
    window.cart.addToCart(product);
};

window.decreaseItem = function (id) {
    window.cart.decreaseItem(id);
};


window.addEventListener('cartUpdated', () => {
    renderProducts();
});

async function renderProducts() {
    try {
        const response = await getAllProducts();
        const products = response.data || response;

        if (!products || !Array.isArray(products)) return;
        const priceMultiplier = 100;

        const fillGrid = (gridElement, categoryType) => {
            if (!gridElement) return;
            const filtered = products.filter(p => p.type === categoryType);

            if (filtered.length === 0) {
                gridElement.closest('section').style.display = 'none';
                return;
            }

            gridElement.innerHTML = filtered.map(product => {
                const realisticPrice = product.price * priceMultiplier;
                return createProductCard({
                    ...product,
                    price: realisticPrice,
                    oldPrice: realisticPrice * 1.3
                });
            }).join('');
        };

        fillGrid(grids.gaming, "PC");
        fillGrid(grids.kitchen, "kitchen");
        fillGrid(grids.tv, "TV");
        fillGrid(grids.home, "furniture");
        fillGrid(grids.audio, "audio");

    } catch (error) {
        console.error("Ошибка:", error);
    }
}

renderProducts();

document.addEventListener('DOMContentLoaded', () => {
    const catalogBtn = document.querySelector('.catalogBtn');
    const catalogDropdown = document.getElementById('catalogDropdown');

    if (catalogBtn && catalogDropdown) {
        catalogBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            catalogDropdown.classList.toggle('active');
        });
        document.addEventListener('click', () => {
            catalogDropdown.classList.remove('active');

        });
    }
})

