const cart = {
    getCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart = cart.filter(item => item && typeof item === 'object');
        cart = cart.map(item => {
            if (!item.media || !Array.isArray(item.media)) {
                item.media = [];
            }
            return item;
        });

        return cart;
    },

    saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateBadge();
        window.dispatchEvent(new Event('cartUpdated'));
    },

    addToCart(product) {
        if (!product || !product.media) {
            console.error('Предпринята попытка добавить недопустимый товар:', product);
            return;
        }

        const cart = this.getCart();
        const existingItem = cart.find(item => String(item._id) === String(product._id));

        if (existingItem) {
            existingItem.count++;
        } else {
            cart.push({ ...product, count: 1, checked: true });
        }

        this.saveCart(cart);
    },

    decreaseItem(productId) {
        const cart = this.getCart();
        const existingItem = cart.find(item => String(item._id) === String(productId));

        if (existingItem) {
            existingItem.count--;
            if (existingItem.count <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart(cart);
            }
        }
    },

    removeFromCart(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => String(item._id) !== String(productId));
        this.saveCart(cart);
    },

    updateBadge() {
        const cart = this.getCart();
        const count = cart.reduce((acc, item) => acc + item.count, 0);
        const badge = document.getElementById('cart-badge');

        if (badge) {
            if (count > 0) {
                badge.innerText = count;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
    },

    getItemCount(productId) {
        const item = this.getCart().find(i => String(i._id) === String(productId));
        return item ? item.count : 0;
    }
};

window.cart = cart;

export function initCart() {
    cart.updateBadge();

    if (window.location.pathname.includes('cart.html') || document.getElementById('cart-items')) {
        renderCartPage();
    }
}

function renderCartPage() {
    const cartItems = cart.getCart();
    const emptyCart = document.getElementById('empty-cart');
    const fullCart = document.getElementById('full-cart');

    if (cartItems.length === 0) {
        if (emptyCart) emptyCart.style.display = 'flex';
        if (fullCart) fullCart.style.display = 'none';

        const title = document.getElementById('cart-title');
        if (title) title.innerText = `Ваша корзина, 0 товаров`;
        return;
    }

    if (emptyCart) emptyCart.style.display = 'none';
    if (fullCart) fullCart.style.display = 'grid';

    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cartItems.map(item => {
            const totalPrice = item.price * item.count;
            const oldPrice = item.oldPrice ? item.oldPrice * item.count : (item.price * 1.3) * item.count;
            const imageUrl = (item.media && item.media.length > 0) ? item.media[0] : '/public/images/placeholder.png';


            return `
            <div class="cart-item">
                <div class="item-checkbox">
                     <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleItemCheck('${item._id}')">
                </div>
                <div class="item-image">
                    <img src="${imageUrl}" alt="${item.title}">
                </div>
                <div class="item-details">
                    <div>
                        <div class="item-title">${item.title}</div>
                        <div class="seller-info">Продавец: Uzum Market</div>
                    </div>
                    <div class="item-actions">
                        <div class="cart-counter">
                            <button class="counter-btn" onclick="decreaseItem('${item._id}')">-</button>
                            <span class="counter-value">${item.count}</span>
                            <button class="counter-btn" onclick="increaseItem('${item._id}', '${item.title}', ${item.price}, '${imageUrl}')">+</button>
                        </div>
                        <div class="price-block-cart">
                            <span class="cart-price">${totalPrice.toLocaleString()} сум</span>
                            <span class="cart-old-price">${oldPrice.toLocaleString()} сум</span>
                        </div>
                    </div>
                </div>
                <button class="delete-btn" onclick="deleteItem('${item._id}')">
                    <img src="/public/icons/trash.svg" width="16" height="16" style="display:none"> 
                    <span>Удалить</span>
                </button>
            </div>
            `;
        }).join('');
    }


    const totalCount = cartItems.reduce((acc, item) => acc + item.count, 0);
    const title = document.getElementById('cart-title');
    if (title) title.innerText = `Ваша корзина, ${totalCount} товар${getEnding(totalCount)}`;
    updateSummary(cartItems);
}

function updateSummary(cart) {
    const checkedItems = cart.filter(item => item.checked);
    const totalCount = checkedItems.reduce((acc, item) => acc + item.count, 0);
    const totalPrice = checkedItems.reduce((acc, item) => acc + (item.price * item.count), 0);

    const totalOldPrice = checkedItems.reduce((acc, item) => {
        const oldP = item.oldPrice ? item.oldPrice : item.price * 1.3;
        return acc + (oldP * item.count);
    }, 0);
    const savings = totalOldPrice - totalPrice;

    const summaryCount = document.getElementById('summary-count');
    const summaryPrice = document.getElementById('summary-price');
    const totalEl = document.getElementById('total-price');
    const savingsEl = document.getElementById('savings');

    if (summaryCount) summaryCount.innerText = `Товары (${totalCount}):`;
    if (summaryPrice) summaryPrice.innerText = `${totalOldPrice.toLocaleString()} сум`;
    if (totalEl) totalEl.innerText = `${totalPrice.toLocaleString()} сум`;
    if (savingsEl) savingsEl.innerText = `Вы экономите: ${savings.toLocaleString()} сум`;
}

function getEnding(number) {
    const last = number % 10;
    if (number > 10 && number < 20) return 'ов';
    if (last === 1) return '';
    if (last > 1 && last < 5) return 'а';
    return 'ов';
}

window.toggleItemCheck = function (id) {
    const cartItems = cart.getCart();
    const item = cartItems.find(i => String(i._id) === String(id));
    if (item) {
        item.checked = !item.checked;
        cart.saveCart(cartItems);
        renderCartPage();
    }
};

window.deleteItem = function (id) {
    cart.removeFromCart(id);
    renderCartPage();
};

window.addEventListener('cartUpdated', () => {
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }
});

window.increaseItem = function (id, title, price, image) {
    const product = {
        _id: id,
        title: title,
        price: price,
        media: image && image !== "undefined" ? [image] : []
    };
    cart.addToCart(product);
};

window.decreaseItem = function (id) {
    cart.decreaseItem(id);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initCart();

        const selectAllDetails = document.getElementById('select-all');
        if (selectAllDetails) {
            selectAllDetails.addEventListener('change', (e) => {
                const checked = e.target.checked;
                const cartItems = cart.getCart();
                cartItems.forEach(item => item.checked = checked);
                cart.saveCart(cartItems);
                renderCartPage();
            });
        }
    });
} else {

    initCart();

    const selectAllDetails = document.getElementById('select-all');
    if (selectAllDetails) {
        selectAllDetails.addEventListener('change', (e) => {
            const checked = e.target.checked;
            const cartItems = cart.getCart();
            cartItems.forEach(item => item.checked = checked);
            cart.saveCart(cartItems);
            renderCartPage();
        });
    }
}