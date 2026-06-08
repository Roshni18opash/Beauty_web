// ─────────────────────────────────────────
// Add All To Cart — Button Interaction
// ─────────────────────────────────────────

const addCartBtn = document.getElementById('add-cart-btn');

if (addCartBtn) {
    addCartBtn.addEventListener('click', function () {
        // Visual feedback: change text temporarily
        const originalText = addCartBtn.textContent;
        addCartBtn.textContent = 'Added to Cart!';
        addCartBtn.style.backgroundColor = '#2a6b4f';

        setTimeout(function () {
            addCartBtn.textContent = originalText;
            addCartBtn.style.backgroundColor = '';
        }, 2000);
    });
}

// ─────────────────────────────────────────
// Card Click — Highlight selected card
// ─────────────────────────────────────────

const bundleCards = document.querySelectorAll('.bundle-card');

bundleCards.forEach(function (card) {
    card.addEventListener('click', function () {
        bundleCards.forEach(function (c) {
            c.classList.remove('card-selected');
        });
        card.classList.add('card-selected');
    });
});
