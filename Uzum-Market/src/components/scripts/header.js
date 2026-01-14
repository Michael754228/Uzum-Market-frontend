const header = document.getElementById("header")

header.innerHTML = `
 <div class="container">
    <div class="headerTop">
      <div class="logoContainer">
         <img src="/public/icons/logo.svg" alt="" class="mainLogo">
      </div>

      <button class="catalogBtn">
          <img src="/icons/menu.svg" alt="" class=catalogIcon">
          <span>Каталог</span>
      </button>

      <div id="catalogDropdown" class="catalogDropdown" >
           <a href="" data-category="electronics">Смартфоны и гаджеты</a>
           <a href="" data-category="accessories">Аксессуары</a>
           <a href="" data-category="laptops">Ноутбуки</a>
      </div>

      <div class="searchWrapper">
          <input type="text" class="searchInput" placeholder="Искать товары...">
          <button class="searchBtn">
              <img src="/icons/search.svg" alt="" class="icon">
          </button>
      </div>

      <div class="userActions">
        <div class="actionItem">
            <img src="/icons/user.svg" alt="" class="icon">
            <span>Войти</span>
        </div>
          <div class="actionItem">
           <img src="/icons/heart.svg" alt="" class="icon">
           <span>Избранное</span>
          </div>
          <div class="actionItem">
           <img src="/icons/shopping-cart.svg" alt="" class="icon">
           <span>Корзина</span>
          </div>
      </div>
    </div>
  </div>
  `