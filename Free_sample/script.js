/* ══════════════════════════════════════════════════════
   script.js — Free Makeup Samples Promo Banner
   Simple, beginner-friendly JavaScript
   ══════════════════════════════════════════════════════ */

// ── Wait until the page (HTML) is fully loaded before running JS ──
document.addEventListener('DOMContentLoaded', function () {

    // ════════════════════════════════════════════════════
    // STEP 1: Grab the "Shop Now" button from the page
    // ════════════════════════════════════════════════════
    var shopNowBtn = document.getElementById('promo-shop-now-btn');

    // Safety check: only run if the button exists on the page
    if (!shopNowBtn) return;


    // ════════════════════════════════════════════════════
    // STEP 2: Check if the user is on a TOUCH device (mobile/tablet)
    // On touch devices → NO hover effects applied
    // ════════════════════════════════════════════════════

    /*
     * HOW THIS WORKS:
     * window.matchMedia('(hover: hover)') checks if the device
     * supports true hover (mouse pointer). Mobile/touch devices
     * return false, so we skip all hover logic for them.
     */
    var isHoverDevice = window.matchMedia('(hover: hover)').matches;


    // ════════════════════════════════════════════════════
    // STEP 3: Button click action
    // When user clicks "Shop Now" → you can change this
    // to navigate to any page or open a modal
    // ════════════════════════════════════════════════════
    shopNowBtn.addEventListener('click', function () {
        // Example: alert a message (replace with your actual action)
        // You could use: window.location.href = '/shop';
        console.log('Shop Now button clicked!');
        // Uncomment below line to navigate:
        // window.location.href = '/shop';
    });


    // ════════════════════════════════════════════════════
    // STEP 4: Hover animation — DESKTOP ONLY
    // Left-to-right background sweep on hover
    // This JS part is a safety layer; main animation is CSS
    // ════════════════════════════════════════════════════

    /*
     * NOTE: The CSS already handles the hover animation using
     * @media (hover: hover) and the ::before pseudo-element.
     * This JS block adds an extra class-based control as backup.
     */

    if (isHoverDevice) {
        // Mouse enters the button → start the animation
        shopNowBtn.addEventListener('mouseenter', function () {
            shopNowBtn.classList.add('btn-hovered');
        });

        // Mouse leaves the button → reverse the animation
        shopNowBtn.addEventListener('mouseleave', function () {
            shopNowBtn.classList.remove('btn-hovered');
        });
    }

    // ════════════════════════════════════════════════════
    // All done! No complex logic needed for this section.
    // ════════════════════════════════════════════════════
});
