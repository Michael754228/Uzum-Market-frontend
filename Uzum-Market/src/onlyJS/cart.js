
export function initCart() {
    
    document.addEventListener('click', function(e) {
        const cartBtn = e.target.closest('.add-to-cart');
        if (cartBtn) {
            console.log('Товар добавлен в корзину');
        }
    });
}