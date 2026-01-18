import { getAllProducts } from "./backend.js";
import { createProductCard } from "./catalog.js";

class FavoritesManager {
    constructor() {
        this.STORAGE_KEY = 'uzum_favorites';
        this.favorites = this.getFavorites();
        this.init();
    }

    init() {
        window.toggleFavorite = (btn) => this.handleToggle(btn);

        if (window.location.pathname.includes('favorites.html')) {
            this.renderFavoritesPage();
        }

        this.updateHeaderHeart();
    }

    getFavorites() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    saveFavorites() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favorites));
        this.updateHeaderHeart();
    }

    handleToggle(btn) {

        const card = btn.closest('.product-card');
        if (!card) return;

        const id = card.dataset.id;
        const index = this.favorites.indexOf(id);

        if (index === -1) {
            this.favorites.push(id);
            btn.classList.add('active');

            const path = btn.querySelector('path');
            if (path) path.style.fill = '#7000ff';
            if (path) path.style.stroke = '#7000ff';
        } else {
            this.favorites.splice(index, 1);
            btn.classList.remove('active');
            const path = btn.querySelector('path');
            if (path) path.style.fill = 'none';
            if (path) path.style.stroke = 'currentColor';
            if (window.location.pathname.includes('favorites.html')) {
                card.remove();
                if (this.favorites.length === 0) {
                    this.renderEmptyState();
                }
            }
        }
        this.saveFavorites();
    }

    isFavorite(id) {
        return this.favorites.includes(id);
    }

    updateHeaderHeart() {

    }

    async renderFavoritesPage() {
        const container = document.getElementById('favorites-container');
        const title = document.querySelector('.favorites-title');
        if (!container) return;

        if (this.favorites.length === 0) {
            this.renderEmptyState();
            return;
        }

        try {
            const allProducts = await getAllProducts();
            const products = allProducts.data || allProducts;

            const favoriteProducts = products.filter(p => this.favorites.includes(p._id));

            if (favoriteProducts.length === 0) {
                this.renderEmptyState();
                return;
            }

            if (title) title.style.display = 'block';

            container.innerHTML = `
                <div class="productGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 20px;">
                    ${favoriteProducts.map(p => {
                const priceMultiplier = 100;
                const realisticPrice = p.price * priceMultiplier;
                return createProductCard({
                    ...p,
                    price: realisticPrice,
                    oldPrice: realisticPrice * 1.3
                })
            }).join('')}
                </div>
            `;

            favoriteProducts.forEach(p => {
                const card = container.querySelector(`.product-card[data-id="${p._id}"]`);
                if (card) {
                    const btn = card.querySelector('.wishlist-btn');
                    if (btn) {
                        btn.classList.add('active');
                        const path = btn.querySelector('path');
                        if (path) path.style.fill = '#7000ff';
                        if (path) path.style.stroke = '#7000ff';
                    }
                }
            })

        } catch (error) {
            console.error("Error loading favorites:", error);
            container.innerHTML = '<p>Ошибка загрузки избранного</p>';
        }
    }

    renderEmptyState() {
        const container = document.getElementById('favorites-container');
        const title = document.querySelector('.favorites-title');
        if (container) {
            if (title) title.style.display = 'none';
            container.innerHTML = `
                <div class="empty-state">
                    <img src="/public/images/hearts.cf414be.png" alt="Empty Favorites">
                    <h3>Здесь сохраним ваши любимые товары</h3>
                    <p>Нажмите ♡ в товарах, которые обычно заказываете<br>или хотите купить позже</p>
                </div>
            `;
        }
    }
}

window.favoritesManager = new FavoritesManager();
