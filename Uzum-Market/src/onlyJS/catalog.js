import { products } from './data.js'; 

const grid = document.getElementById('productGrid');

function renderProducts() {
  if (!grid) {
    return;
  }  

   grid.innerHTML = products.map(product => `
    <div class="product-card">
        <div class="card-image-container">
            <img src="${product.image}" alt="${product.title}">
            <button class="wishlist-btn">
                <img src="/icons/heart.svg" class="icon-small">
            </button>
        </div>
        
        <div class="card-info">
            <p class="product-title">${product.title}</p>
            <p class="rating"><img src="/images/Без названия.png">< ${product.rating}</p> 
            <div class="price-wrapper">
                <div class="price-block">
                    <p class="old-price">${product.oldPrice.toLocaleString()} сум</p>
                    <p class="current-price">${product.price.toLocaleString()} сум</p>
                </div>
                <button class="add-to-cart">
                    <img src="/icons/shopping-bag.svg" class="icon-small">
                </button>
            </div>
        </div>
    </div>
    `
    ).join('');
}

renderProducts();