document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('trending-products-grid');
  const showMoreBtn = document.getElementById('btn-show-more');
  
  // Show More / Show Less Toggle for Mobile
  if (showMoreBtn && grid) {
    showMoreBtn.addEventListener('click', () => {
      const isExpanded = grid.classList.contains('mobile-expanded');
      
      if (isExpanded) {
        // Collapse
        grid.classList.remove('mobile-expanded');
        grid.classList.add('mobile-collapsed');
        showMoreBtn.textContent = 'Show More';
        showMoreBtn.setAttribute('aria-expanded', 'false');
        
        // Scroll grid back into view smoothly
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Expand
        grid.classList.remove('mobile-collapsed');
        grid.classList.add('mobile-expanded');
        showMoreBtn.textContent = 'Show Less';
        showMoreBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // Premium Toast Notification System
  const createToastContainer = () => {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      
      // Inject CSS styles for toast container dynamically if not present
      const style = document.createElement('style');
      style.textContent = `
        #toast-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: none;
        }
        .toast {
          background-color: #0d2a38;
          color: #ffffff;
          padding: 14px 24px;
          border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 0 10px 30px rgba(13, 42, 56, 0.2);
          display: flex;
          align-items: center;
          gap: 12px;
          pointer-events: auto;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-left: 3px solid #d25d38;
        }
        .toast.show {
          transform: translateY(0);
          opacity: 1;
        }
        .toast-close {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          font-size: 1.1rem;
          padding: 0;
          line-height: 1;
          transition: color 0.2s;
        }
        .toast-close:hover {
          color: #ffffff;
        }
        @media (max-width: 768px) {
          #toast-container {
            left: 16px;
            right: 16px;
            bottom: 16px;
          }
          .toast {
            width: 100%;
          }
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(container);
    }
    return container;
  };

  const showToast = (message) => {
    const container = createToastContainer();
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    toast.innerHTML = `
      <span>${message}</span>
      <button class="toast-close" aria-label="Close notification">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // Trigger transition
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Auto remove
    const removeTimer = setTimeout(() => {
      dismissToast(toast);
    }, 3500);
    
    // Close button click
    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(removeTimer);
      dismissToast(toast);
    });
  };

  const dismissToast = (toast) => {
    toast.classList.remove('show');
    toast.style.transform = 'translateY(10px)';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 4000);
  };

  // Attach card click handlers for prototyping demo
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const productName = card.querySelector('.product-name').textContent;
      const productPrice = card.querySelector('.price-current').textContent;
      showToast(`Selected <strong>${productName}</strong> (${productPrice})`);
    });
  });

  // Shop all products click handler
  const shopAllLink = document.getElementById('link-shop-all');
  if (shopAllLink) {
    shopAllLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Redirecting to all premium collections...');
    });
  }
});
