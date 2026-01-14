import { products } from "./data.js";

const grid = document.getElementById('productGrid');

function renderProducts() {
  if (!grid) {
    return;
  }  

  grid.innerHTML = products.map(product => `
    <div class="product-card" data-id="${product.id}"> 
        <div class="card-image-container">
            <img src="${product.image}" alt="${product.title}">
            <button class="wishlist-btn">
                <img src="/icons/heart.svg" class="icon-small">
            </button>
        </div>
        
        <div class="card-info">
            <p class="product-title">${product.title}</p>
            
            <div class="rating">
                <img src="/images/Без названия.png" class="rating-star-icon">
                <span>${product.rating}</span>
                <span class="reviews-count">(${product.reviews || 0} отзывов)</span>
            </div> 

            <div class="price-wrapper">
                <div class="price-block">
                    <p class="old-price">${product.oldPrice.toLocaleString()} сум</p>
                    <p class="current-price">${product.price.toLocaleString()} сум</p>
                </div>
                <button class="add-to-cart" 
                        data-id="${product.id}"
                        data-title="${product.title}"
                        data-price="${product.price}"
                        data-image="${product.image}">
                    <img src="/icons/shopping-bag.svg" class="icon-small">
                </button>
            </div>
        </div>
    </div>
    `
  ).join('');
}

renderProducts();