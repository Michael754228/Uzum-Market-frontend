import { products } from './data.js';

const grid = document.getElementById('productGrid');

function renderProducts() {
   grid.innerHTML = products.map(product => `
       <div class="productCard">
         <div class="cardImage">
            <img src="${product.image}" />
            <button class="favoriteBtn">
                <img src="/icons/heart.svg" class="iconSmall">
            </button>
         </div>
  
         <div class="cardInfo">
           <p class="title">${product.title}</p>
           
           <div class="ratingBlock">
             <img src="/public/icons/Без названия.png" class="">
             <span class="ratingText">${product.rating} (${product.reviews} отзывов)</span>
           </div>

           <div class="priceBlock">
             <div class="priceContainer">
                <p class="oldPrice">${product.oldPrice.toLocaleString()} сум</p>
                <p class="price">${product.price.toLocaleString()} сум</p>
             </div>
             <button class="addToCartBtn" data-id="${product.id}">
                <img src="/public/icons/shopping-bag.svg" class="iconSmall">
             </button>
           </div>
         </div>
      </div>
      `    
    ).join('');
}
renderProducts()