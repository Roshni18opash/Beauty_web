/* ============================================================
   BLOG POST SECTION — script.js
   Dynamic slider / grid toggle.
   - GRID mode  : default for ≤3 cards or desktop
   - SLIDER mode: auto-enabled when cards > GRID_THRESHOLD
                  OR user's screen is ≤768px with many cards
   To switch manually, call: BlogPosts.setMode('slider') or 'grid'
   ============================================================ */

(function () {
    'use strict';

    /* ── Configuration ─────────────────────────────────────── */
    const CONFIG = {
        // Cards per view in slider mode by breakpoint
        CARDS_PER_VIEW: {
            DESKTOP: 3,    // ≥992px
            TABLET: 2,     // 576–991px
            MOBILE: 1      // <576px
        },
        // Auto-switch to slider when card count exceeds this
        GRID_THRESHOLD: 3,
        // Scroll duration in ms
        SCROLL_DURATION: 400
    };

    /* ── DOM References ────────────────────────────────────── */
    const section   = document.getElementById('blog-section');
    const track     = document.getElementById('blog-cards-track');
    const prevBtn   = document.getElementById('blog-slider-prev');
    const nextBtn   = document.getElementById('blog-slider-next');
    const dotsWrap  = document.getElementById('blog-dots');

    if (!section || !track) return;  // Guard: section not on page

    /* ── State ─────────────────────────────────────────────── */
    let currentIndex = 0;
    let totalSlides  = 0;
    let mode         = 'grid';    // 'grid' | 'slider'
    let isAnimating  = false;

    /* ── Utility: get cards per view based on viewport ──────── */
    function getCardsPerView() {
        const w = window.innerWidth;
        if (w >= 992) return CONFIG.CARDS_PER_VIEW.DESKTOP;
        if (w >= 576) return CONFIG.CARDS_PER_VIEW.TABLET;
        return CONFIG.CARDS_PER_VIEW.MOBILE;
    }

    /* ── Utility: get all blog cards ───────────────────────── */
    function getCards() {
        return Array.from(track.querySelectorAll('.blog-card'));
    }

    /* ── Build Dots ────────────────────────────────────────── */
    function buildDots(count) {
        dotsWrap.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const btn = document.createElement('button');
            btn.className = 'blog-dot' + (i === 0 ? ' active' : '');
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
            btn.dataset.index = i;
            btn.addEventListener('click', function () {
                goTo(parseInt(this.dataset.index, 10));
            });
            dotsWrap.appendChild(btn);
        }
    }

    /* ── Update Active Dot ──────────────────────────────────── */
    function updateDots(index) {
        const dots = dotsWrap.querySelectorAll('.blog-dot');
        dots.forEach(function (d, i) {
            d.classList.toggle('active', i === index);
            d.setAttribute('aria-selected', i === index ? 'true' : 'false');
        });
    }

    /* ── Go To Slide ────────────────────────────────────────── */
    function goTo(index) {
        if (mode !== 'slider' || isAnimating) return;
        const cards = getCards();
        if (!cards.length) return;

        const perView = getCardsPerView();
        const maxIndex = Math.max(0, totalSlides - perView);
        index = Math.max(0, Math.min(index, maxIndex));

        currentIndex = index;
        const cardWidth = cards[0].offsetWidth;
        const gap = 24; // matches CSS gap
        const scrollLeft = index * (cardWidth + gap);

        isAnimating = true;
        track.scrollTo({ left: scrollLeft, behavior: 'smooth' });

        setTimeout(function () { isAnimating = false; }, CONFIG.SCROLL_DURATION + 50);

        updateDots(index);
        updateNavButtons();
    }

    /* ── Update Nav Button States ──────────────────────────── */
    function updateNavButtons() {
        const perView = getCardsPerView();
        const maxIndex = Math.max(0, totalSlides - perView);
        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        prevBtn.style.opacity = prevBtn.disabled ? '0.35' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.35' : '1';
    }

    /* ── Set Mode: 'grid' or 'slider' ──────────────────────── */
    function setMode(newMode) {
        mode = newMode;
        if (newMode === 'slider') {
            section.classList.add('slider-mode');
            totalSlides = getCards().length;
            const perView = getCardsPerView();
            const dotsCount = Math.max(1, totalSlides - perView + 1);
            buildDots(dotsCount);
            currentIndex = 0;
            track.scrollLeft = 0;
            updateNavButtons();
        } else {
            section.classList.remove('slider-mode');
            currentIndex = 0;
            dotsWrap.innerHTML = '';
        }
    }

    /* ── Auto-decide mode based on card count + viewport ─────── */
    function autoDecideMode() {
        const cards = getCards();
        const count = cards.length;
        const perView = getCardsPerView();

        // Switch to slider if more cards than fit in grid, or if
        // user is on mobile/tablet with >1 card
        if (count > CONFIG.GRID_THRESHOLD || (window.innerWidth < 768 && count > 1)) {
            setMode('slider');
        } else {
            setMode('grid');
        }
    }

    /* ── Sync dot on scroll (without snapping conflicts) ────── */
    let scrollTimer;
    track.addEventListener('scroll', function () {
        if (mode !== 'slider') return;
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
            const cards = getCards();
            if (!cards.length) return;
            const cardWidth = cards[0].offsetWidth;
            const gap = 24;
            const approxIndex = Math.round(track.scrollLeft / (cardWidth + gap));
            if (approxIndex !== currentIndex) {
                currentIndex = approxIndex;
                updateDots(currentIndex);
                updateNavButtons();
            }
        }, 80);
    });

    /* ── Button Events ──────────────────────────────────────── */
    prevBtn.addEventListener('click', function () {
        goTo(currentIndex - 1);
    });

    nextBtn.addEventListener('click', function () {
        goTo(currentIndex + 1);
    });

    /* ── Touch/Swipe Support ────────────────────────────────── */
    let touchStartX = 0;
    let touchEndX   = 0;

    track.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
        if (mode !== 'slider') return;
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
        }
    }, { passive: true });

    /* ── Keyboard Accessibility ────────────────────────────── */
    track.addEventListener('keydown', function (e) {
        if (mode !== 'slider') return;
        if (e.key === 'ArrowLeft')  goTo(currentIndex - 1);
        if (e.key === 'ArrowRight') goTo(currentIndex + 1);
    });

    /* ── Resize Handler ─────────────────────────────────────── */
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            autoDecideMode();
        }, 200);
    });

    /* ── Init ───────────────────────────────────────────────── */
    autoDecideMode();

    /* ── Public API (optional manual control) ───────────────── */
    window.BlogPosts = {
        setMode: setMode,
        goTo: goTo,
        refresh: autoDecideMode
    };

})();
