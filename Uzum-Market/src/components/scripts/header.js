const header = document.getElementById("header");

if (header) {
    header.innerHTML = `
 <div class="container">
    <div class="headerTop">
      <div class="logoContainer">
         <img src="/public/icons/logo.svg" alt="Uzum" class="mainLogo">
      </div>

      <button class="catalogBtn">
          <img src="/public/icons/menu.svg" alt="" class="catalogIcon">
          <span>Каталог</span>
      </button>

      <div id="catalogDropdown" class="catalogDropdown">
           <a href="#" data-category="gaming">Компьютеры и гейминг</a>
           <a href="#" data-category="audio">Аудио и аксессуары</a>
           <a href="#" data-category="tv">Телевизоры</a>
           <a href="#" data-category="kitchen">Бытовая техника</a>
           <a href="#" data-category="home">Мебель и комфорт</a>
      </div>

      <div class="searchWrapper">
          <input type="text" class="searchInput" placeholder="Искать товары...">
          <button class="searchBtn">
              <img src="/public/icons/search.svg" alt="" class="icon">
          </button>
      </div>

      <div class="userActions">
        <div class="actionItem">
            <img src="/public/icons/user.svg" alt="" class="icon">
            <span>Войти</span>
        </div>
          <div class="actionItem">
           <img src="/public/icons/heart.svg" alt="" class="icon">
           <span>Избранное</span>
          </div>
          <div class="actionItem">
           <img src="/public/icons/shopping-cart.svg" alt="" class="icon">
           <span>Корзина</span>
          </div>
      </div>
    </div>
  </div>
  `;
}