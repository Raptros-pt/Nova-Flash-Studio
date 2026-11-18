let cartCount = 0;

function addToCart() {
    cartCount++;
    const badge = document.getElementById('cartCount');
    badge.textContent = cartCount;
    
    // Quick micro-interaction animation
    badge.style.transform = 'scale(1.3)';
    setTimeout(() => {
        badge.style.transform = 'scale(1)';
    }, 200);
}