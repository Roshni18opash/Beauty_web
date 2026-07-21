/**
 * Daily Essentials - Carousel Slider Control
 * - Handles smooth scrolling using prev/next buttons
 * - Links scroll position to progress bar thumb
 * - Disables buttons at start/end of scroll track
 * - Fully responsive on resize
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Get DOM Elements
    var track = document.getElementById('productsTrack');
    var thumb = document.getElementById('scrollThumb');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');

    // 2. Constants & Settings
    var GAP_BETWEEN_CARDS = 16; // Gap in pixels (must match the gap in CSS)

    // 3. Helper Functions

    /**
     * Calculates the width of a single card plus the gap.
     * This ensures we scroll exactly by one card at a time.
     */
    function getScrollStep() {
        var firstCard = track.querySelector('.product-card, .banner-card');
        if (firstCard) {
            // offsetWidth returns the element width including borders and padding
            return firstCard.offsetWidth + GAP_BETWEEN_CARDS;
        }
        return 250 + GAP_BETWEEN_CARDS; // Fallback value
    }

    /**
     * Updates the progress bar thumb WIDTH (it grows from left — left is always 0).
     * Also enables/disables navigation buttons.
     */
    function updateScrollState() {
        if (!track || !thumb) return;

        // Maximum scrollable distance
        var maxScrollLeft = track.scrollWidth - track.clientWidth;
        // Current scroll position from left
        var scrollLeft = track.scrollLeft;

        // A. Grow the thumb width based on how far user has scrolled
        //    - At start (scrollLeft=0)         → minimum width (e.g. 15%)
        //    - At end   (scrollLeft=maxScroll) → full width (100%)
        var minWidth = 15;  // % — thumb at start position
        var maxWidth = 100; // % — thumb at end position (fully scrolled)

        var growPercent;
        if (maxScrollLeft <= 0) {
            // No scrollable content — show full bar
            growPercent = maxWidth;
        } else {
            var scrollRatio = scrollLeft / maxScrollLeft; // 0 at start, 1 at end
            growPercent = minWidth + scrollRatio * (maxWidth - minWidth);
        }

        // thumb.style.left stays '0' always — the line grows from the left
        thumb.style.width = growPercent + '%';

        // B. Disable/Enable Prev and Next Buttons based on scroll boundaries
        // 2px buffer handles subpixel rendering differences across browsers
        prevBtn.disabled = scrollLeft <= 2;
        nextBtn.disabled = scrollLeft >= maxScrollLeft - 2;
    }

    // 4. Button Click Event Handlers

    // Scroll to the left (previous)
    prevBtn.addEventListener('click', function () {
        var step = getScrollStep();
        track.scrollBy({
            left: -step,
            behavior: 'smooth'
        });
    });

    // Scroll to the right (next)
    nextBtn.addEventListener('click', function () {
        var step = getScrollStep();
        track.scrollBy({
            left: step,
            behavior: 'smooth'
        });
    });

    // 5. Event Listeners for Scroll and Window Resize
    
    // Update progress bar & button states as the user scrolls
    track.addEventListener('scroll', updateScrollState);

    // Recalculate layout & values if the user resizes the browser
    window.addEventListener('resize', updateScrollState);

    // 6. Run initial update to set progress bar and buttons on page load
    updateScrollState();
});
