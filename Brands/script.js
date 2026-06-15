document.addEventListener('DOMContentLoaded', () => {
  const swiperContainer = document.getElementById('brands-swiper');
  let swiperInstance = null;

  /**
   * Initializes Swiper if the container has 'layout-slider' class.
   * If it has 'layout-grid', CSS grid handles the layout natively.
   */
  function initSwiper() {
    if (!swiperContainer) return;
    
    // Destroy existing instance to clear inline styles/classes before re-evaluating
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }

    // Initialize Swiper only in layout-slider mode
    if (swiperContainer.classList.contains('layout-slider')) {
      swiperInstance = new Swiper('#brands-swiper', {
        slidesPerView: 2,
        spaceBetween: 1,
        loop: false,
        grabCursor: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // Responsive breakpoints matching the column grids
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 1
          },
          576: {
            slidesPerView: 3,
            spaceBetween: 1
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 1
          },
          992: {
            slidesPerView: 5,
            spaceBetween: 1
          }
        }
      });
    }
  }

  // Initial call on page load
  initSwiper();

  /**
   * Helper function exposed to window.
   * Safely adds a brand item dynamically without breaking the UI.
   * If Swiper is active, it updates the slides list.
   * 
   * Example: addBrandItem("Glow Care", "images/s-brand-logo-1.avif")
   */
  window.addBrandItem = function(name, imgUrl) {
    const wrapper = swiperContainer.querySelector('.swiper-wrapper');
    if (!wrapper) return;

    const slide = document.createElement('a');
    slide.href = '#';
    slide.className = 'swiper-slide brand-item';
    slide.id = `brand-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    slide.setAttribute('aria-label', `Shop ${name} products`);

    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = `${name} Logo`;
    img.loading = 'lazy';

    slide.appendChild(img);
    wrapper.appendChild(slide);

    // Update Swiper instance if active
    if (swiperInstance) {
      swiperInstance.update();
    }
  };
});
