document.addEventListener('DOMContentLoaded', () => {
  const brandsGrid = document.getElementById('brands-grid');
  
  // Layout Toggle Buttons
  const btnGrid = document.getElementById('btn-grid');
  const btnSlider = document.getElementById('btn-slider');

  // Design Sliders & Color Pickers
  const rangeRadius = document.getElementById('range-radius');
  const radiusVal = document.getElementById('radius-val');
  const rangeHeight = document.getElementById('range-height');
  const heightVal = document.getElementById('height-val');
  const colorBorder = document.getElementById('color-border');
  const colorCellBg = document.getElementById('color-cell-bg');

  // Brand Form Elements
  const brandForm = document.getElementById('brand-form');
  const inputBrandName = document.getElementById('brand-name');
  const selectBrandLogo = document.getElementById('brand-logo-select');

  // Auto-scrolling state variables
  let scrollInterval = null;
  let isHovered = false;

  /**
   * Starts the continuous marquee scrolling effect when in slider mode.
   * Scrolls 1px at a time for smooth movement, pausing on hover.
   */
  function startAutoScroll() {
    stopAutoScroll();
    if (!brandsGrid.classList.contains('slider-mode')) return;

    scrollInterval = setInterval(() => {
      if (isHovered) return;

      brandsGrid.scrollLeft += 1;

      // Wrap back to the beginning when reaching the end of the scroll width
      const maxScrollLeft = brandsGrid.scrollWidth - brandsGrid.clientWidth;
      if (brandsGrid.scrollLeft >= maxScrollLeft - 1) {
        brandsGrid.scrollLeft = 0;
      }
    }, 25); // 25ms interval provides a smooth movement speed
  }

  /**
   * Clears the active auto-scroll timer.
   */
  function stopAutoScroll() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  }

  // Hover detection to pause scrolling
  brandsGrid.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  brandsGrid.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // Switch to Grid View
  btnGrid.addEventListener('click', () => {
    btnGrid.classList.add('active');
    btnGrid.setAttribute('aria-pressed', 'true');
    btnSlider.classList.remove('active');
    btnSlider.setAttribute('aria-pressed', 'false');
    
    brandsGrid.classList.remove('slider-mode');
    brandsGrid.scrollLeft = 0; // Reset scroll position
    stopAutoScroll();
  });

  // Switch to Slider View
  btnSlider.addEventListener('click', () => {
    btnSlider.classList.add('active');
    btnSlider.setAttribute('aria-pressed', 'true');
    btnGrid.classList.remove('active');
    btnGrid.setAttribute('aria-pressed', 'false');
    
    brandsGrid.classList.add('slider-mode');
    brandsGrid.scrollLeft = 0; // Reset scroll position
    startAutoScroll();
  });

  // ==========================================================================
  // Design Schema Customization using simple, plain JS inline styles
  // ==========================================================================

  // Update Border Radius
  rangeRadius.addEventListener('input', (e) => {
    const value = e.target.value + 'px';
    radiusVal.textContent = value;
    brandsGrid.style.borderRadius = value;
  });

  // Update Cell Height
  rangeHeight.addEventListener('input', (e) => {
    const value = e.target.value + 'px';
    heightVal.textContent = value;
    document.querySelectorAll('.brand-item').forEach(item => {
      item.style.height = value;
    });
  });

  // Update Border Color
  colorBorder.addEventListener('input', (e) => {
    const color = e.target.value;
    brandsGrid.style.borderColor = color;
    brandsGrid.style.backgroundColor = color; // Also updates the grid lines
  });

  // Update Cell Background Color
  colorCellBg.addEventListener('input', (e) => {
    const color = e.target.value;
    document.querySelectorAll('.brand-item').forEach(item => {
      item.style.backgroundColor = color;
    });
  });

  // ==========================================================================
  // Dynamic Brand Addition
  // ==========================================================================
  brandForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = inputBrandName.value.trim();
    const logoFile = selectBrandLogo.value;

    if (!name) return;

    // Create item container
    const newBrandItem = document.createElement('a');
    newBrandItem.href = '#';
    newBrandItem.className = 'brand-item';
    newBrandItem.id = `brand-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    newBrandItem.setAttribute('aria-label', `Shop ${name} products`);

    // Apply the currently active customized styles directly to the new cell
    newBrandItem.style.height = rangeHeight.value + 'px';
    newBrandItem.style.backgroundColor = colorCellBg.value;

    // Create logo image
    const newBrandImg = document.createElement('img');
    newBrandImg.src = logoFile;
    newBrandImg.alt = `${name} Logo`;
    newBrandImg.loading = 'lazy';

    newBrandItem.appendChild(newBrandImg);
    brandsGrid.appendChild(newBrandItem);

    // Reset inputs
    inputBrandName.value = '';
    
    // Restart slider auto-scroll to account for the new element length
    if (brandsGrid.classList.contains('slider-mode')) {
      startAutoScroll();
    }
  });
});
