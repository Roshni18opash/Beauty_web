// Function to update the announcement message when country changes
document.addEventListener('DOMContentLoaded', function () {
  var select = document.getElementById('country-select');
  var message = document.querySelector('.ann-center .message');

  if (select && message) {
    select.addEventListener('change', function () {
      var v = select.value;
      if (v === 'us') {
        message.textContent = 'Free Express Shipping on orders $120!';
      } else if (v === 'ca') {
        message.textContent = 'Free Express Shipping on orders CAD $160!';
      } else if (v === 'uk') {
        message.textContent = 'Free Express Shipping on orders £90!';
      }
    });
  }

  // Smooth scroll sticky header controls
  var header = document.getElementById("site-header");
  var announceBar = document.getElementById("announce-bar");
  
  if (header && announceBar) {
    // Dynamic measurement of header heights
    function updateHeaderDimensions() {
      var annHeight = announceBar.offsetHeight;
      document.documentElement.style.setProperty('--announce-height', annHeight + 'px');
      
      // Update body padding or spacer dynamically so the content starts below the fixed header
      var headerHeight = header.offsetHeight;
      var spacer = document.getElementById("site-header-spacer");
      if (spacer) {
        // If not currently collapsed, set normal spacer height
        if (!header.classList.contains("header-collapsed")) {
          spacer.style.height = headerHeight + "px";
        }
      }
    }

    // Initialize dimensions
    window.addEventListener("load", updateHeaderDimensions);
    window.addEventListener("resize", updateHeaderDimensions);
    
    // Call immediately to avoid initial gap
    updateHeaderDimensions();
    setTimeout(updateHeaderDimensions, 100); // safety fallback

    // Scroll Direction and Collapse handler
    var lastScrollY = window.scrollY;
    var scrollThreshold = 10; // px threshold before collapsing/expanding

    window.addEventListener("scroll", function () {
      var currentScrollY = window.scrollY;
      var announceHeight = announceBar.offsetHeight;

      // Always expand at the very top
      if (currentScrollY <= announceHeight) {
        header.classList.remove("header-collapsed");
        lastScrollY = currentScrollY;
        return;
      }

      var diff = currentScrollY - lastScrollY;
      if (Math.abs(diff) < scrollThreshold) return;

      if (diff > 0) {
        // Scrolling down -> Collapse announcement and category bar
        header.classList.add("header-collapsed");
      } else {
        // Scrolling up -> Expand and show all bars
        header.classList.remove("header-collapsed");
      }

      lastScrollY = currentScrollY;
    });
  }

  // ── MEGA MENU: Custom toggle (no Bootstrap dropdown) ─────────────────────
  var megaToggleBtn = document.getElementById('mega-toggle-btn');
  var megaMenu      = document.getElementById('mega-menu-panel');
  var mainNavbar    = document.getElementById('main-navbar');
  var catItems      = document.querySelectorAll('.mega-cat-item');
  var productPanels = document.querySelectorAll('.mega-product-grid');
  var isOpen        = false;

  // ── Position mega menu directly below the navbar ──
  function positionMegaMenu() {
    if (!mainNavbar || !megaMenu) return;
    var rect = mainNavbar.getBoundingClientRect();
    megaMenu.style.top = rect.bottom + 'px';
  }

  // ── Open mega menu ──
  function openMega() {
    positionMegaMenu();
    megaMenu.classList.add('mega-open');
    megaToggleBtn.setAttribute('aria-expanded', 'true');
    isOpen = true;
  }

  // ── Close mega menu ──
  function closeMega() {
    megaMenu.classList.remove('mega-open');
    megaToggleBtn.setAttribute('aria-expanded', 'false');
    isOpen = false;
  }

  // ── Toggle on button click ──
  if (megaToggleBtn && megaMenu) {
    megaToggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation(); // stop this click from immediately closing via document listener
      if (isOpen) {
        closeMega();
      } else {
        openMega();
      }
    });

    // ── Close when clicking anywhere outside the mega menu ──
    document.addEventListener('click', function(e) {
      if (isOpen && !megaMenu.contains(e.target) && e.target !== megaToggleBtn) {
        closeMega();
      }
    });

    // ── Close on Escape key ──
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) {
        closeMega();
        megaToggleBtn.focus();
      }
    });

    // ── Reposition on scroll/resize (header moves when sticky collapses) ──
    window.addEventListener('scroll', function() {
      if (isOpen) positionMegaMenu();
    });
    window.addEventListener('resize', function() {
      if (isOpen) positionMegaMenu();
    });
  }

  // ── Category hover switching ──
  function switchPanel(cat) {
    catItems.forEach(function(item) {
      item.classList.toggle('active', item.dataset.cat === cat);
    });
    productPanels.forEach(function(panel) {
      if (panel.dataset.panel === cat) {
        panel.style.display = 'grid';
        panel.style.animation = 'none';
        panel.offsetHeight; // force reflow
        panel.style.animation = '';
      } else {
        panel.style.display = 'none';
      }
    });
  }

  catItems.forEach(function(item) {
    item.addEventListener('mouseenter', function() {
      switchPanel(item.dataset.cat);
    });
    item.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation(); // don't bubble to document close listener
      switchPanel(item.dataset.cat);
    });
  });

});
