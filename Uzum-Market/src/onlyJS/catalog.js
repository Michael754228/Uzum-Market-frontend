import { products } from './data.js'; 

function renderProducts() {

    const smartphonesAndGadgetsGrid = document.getElementById("smartphonesAndGadgetsGrid");
    const accessoriesGrid = document.getElementById("accessoriesGrid");
    const laptopsGrid = document.getElementById("productGrid"); 
    const createCardHTML = (product) => `
       <div class="product-card" data-id="${product.id}"> 
        <div class="card-image-container">
            <img src="${product.image}" alt="${product.title}">
            <button class="wishlist-btn" data-id="${product.id}">
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
            <div class="installment-badge">
                ${Math.round(product.price / 12).toLocaleString()} сум/мес
            </div>
            <div class="price-wrapper">
                <div class="price-block">
                    <p class="old-price">${product.oldPrice ? product.oldPrice.toLocaleString() + ' сум' : ''}</p>
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
    `;

    if (smartphonesAndGadgetsGrid) {
        const smartphones = products.filter(p => p.category === 'electronics');
        smartphonesAndGadgetsGrid.innerHTML = smartphones.map(createCardHTML).join('');
    } if (accessoriesGrid) {
        const accessories = products.filter(p => p.category === 'accessories');
        accessoriesGrid.innerHTML = accessories.map(createCardHTML).join('');
    } if (laptopsGrid) {
        const laptops = products.filter(p => p.category === 'laptops');
        laptopsGrid.innerHTML = laptops.map(createCardHTML).join(''); 
    }

  
}

renderProducts();

document.addEventListener('DOMContentLoaded', function() {
    const catalogBtn = document.querySelector('.catalogBtn');
    const catalogDropdown = document.getElementById('catalogDropdown');
    
    if (catalogBtn && catalogDropdown) {
        catalogBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (catalogDropdown.style.display === 'block') {
                catalogDropdown.style.display = 'none';
                catalogBtn.style.backgroundColor = '#f0e8ff';
            } else {
                catalogDropdown.style.display = 'block';
                catalogBtn.style.backgroundColor = '#e5d8ff';
            }
        });
        
        document.addEventListener('click', function(e) {
            if (!catalogBtn.contains(e.target) && !catalogDropdown.contains(e.target)) {
                catalogDropdown.style.display = 'none';
                catalogBtn.style.backgroundColor = '#f0e8ff';
            }
        });
    }
});

async function getAllProducts() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/main/products`
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Internal Server Error", error);
  }
}
getAllProducts();