import { getAllProducts } from "./backend.js";

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

    return `
    <div class="product-card" data-id="${productId}" onclick="goToProduct('${productId}')" style="cursor:pointer"> 
        <div class="card-image-container">
            <img src="${imageUrl}" alt="${product.title}">
            <button class="wishlist-btn" ">
                <img src="/public/icons/heart.svg" class="icon-small">
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
                <button class="add-to-cart" 
                        onclick="event.stopPropagation(); handleAddToCart(event)"
                        data-id="${productId}"
                        data-title="${product.title}"
                        data-price="${price}"
                        data-image="${imageUrl}">
                    <img src="/public/icons/shopping-bag.svg" class="icon-small">
                </button>
            </div>
        </div>
    </div>`;
 }

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
        fillGrid(grids.home,"furniture");      
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
    }})

    