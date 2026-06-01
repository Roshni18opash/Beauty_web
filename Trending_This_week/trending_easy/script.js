document.addEventListener('DOMContentLoaded', () => {

  // Show More / Show Less
  const grid = document.getElementById('trending-products-grid');
  const btn = document.getElementById('btn-show-more');

  if (btn && grid) {
    btn.addEventListener('click', () => {

      grid.classList.toggle('mobile-expanded');
      grid.classList.toggle('mobile-collapsed');

      btn.textContent =
        grid.classList.contains('mobile-expanded')
          ? 'Show Less'
          : 'Show More';
    });
  }

  // Toast Function
  function showToast(message) {

    const toast = document.createElement('div');

    toast.className = 'toast';
    toast.textContent = message;

    document
      .getElementById('toast-container')
      .appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');

      setTimeout(() => {
        toast.remove();
      }, 400);

    }, 3000);
  }

  // Product Cards
  document.querySelectorAll('.product-card').forEach(card => {

    card.addEventListener('click', (e) => {

      e.preventDefault();

      const name =
        card.querySelector('.product-name').textContent;

      showToast(`${name} selected`);

    });

  });

  // Shop All Link
  const shopAll = document.getElementById('link-shop-all');

  if (shopAll) {

    shopAll.addEventListener('click', (e) => {

      e.preventDefault();

      showToast('Redirecting to all products');

    });

  }

});