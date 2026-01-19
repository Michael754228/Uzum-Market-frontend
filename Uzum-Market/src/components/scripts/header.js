const header = document.getElementById("header");

if (header) {
  header.innerHTML = `
 <div class="container">
    <div class="headerTop">
      <div class="logoContainer">
         <a href="/">
            <img src="/icons/logo.svg" alt="" class="mainLogo">
         </a>
      </div>

      <button class="catalogBtn">
          <img src="/icons/menu.svg" alt="" class="catalogIcon">
          <span>Каталог</span>
      </button>

      <div id="catalogDropdown" class="catalogDropdown">
           <a href="" data-category="gaming">Компьютеры и гейминг</a>
           <a href="" data-category="audio">Аудио и аксессуары</a>
           <a href="" data-category="tv">Телевизоры</a>
           <a href="" data-category="kitchen">Бытовая техника</a>
           <a href="" data-category="home">Мебель и комфорт</a>
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
             <span><button type="button" class="EMERGENCY_LOGIN" id="loginBtn" style="all: unset; cursor: pointer; color: inherit;">Войти</button></span>
        </div>
        <div class="actionItem">
          <img src="/icons/heart.svg" alt="" class="icon">
          <span><a href="/src/onlyHTML/favorites.html" style="text-decoration: none; color: inherit;">Избранное</a></span>
        </div>
        <div class="actionItem">
          <a href="/src/onlyHTML/cart.html"
            style="text-decoration: none; color: inherit; position: relative; display: flex; flex-direction: column; align-items: center;">
            <img src="/icons/shopping-cart.svg" alt="" class="icon">
            <span>Корзина</span>
            <span id="cart-badge" class="cart-badge"></span>
          </a>
        </div>
      </div>
    </div>
  </div>
  `;
}