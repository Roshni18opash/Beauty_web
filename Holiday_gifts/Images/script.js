// ══════════════════════════════════════════════════════
// GIFT CARDS DATA ARRAY
// ══════════════════════════════════════════════════════
// To add more cards, just copy one object and paste it below.
// If total cards > 2, the slider automatically activates.
// You can change "cardsPerView" in the slider config below.
const giftsData = [
    {
        category: "Holiday Gifts",      // Small italic label top-left
        heading: "Cleansing Set For Sensitive Skin",
        savePercent: "40%",             // Badge text
        img: "Images/s-c-image-card-5.webp",
        imgAlt: "Cleansing oil dropper bottle",
        shopLink: "#"
    },
    {
        category: "Holiday Gifts",
        heading: "Shower & Body Ritual Set",
        savePercent: "30%",
        img: "Images/s-c-image-card-6.webp",
        imgAlt: "Body lotion and soap bottles",
        shopLink: "#"
    }
    // ── ADD MORE CARDS BELOW ──
    // After adding a 3rd card, the slider turns on automatically!
    // Example:
    // {
    //     category: "Holiday Gifts",
    //     heading: "Glow Serum Bundle",
    //     savePercent: "25%",
    //     img: "Images/your-image.webp",
    //     imgAlt: "Glow serum bottle",
    //     shopLink: "#"
    // },
];

// ══════════════════════════════════════════════════════
// SLIDER CONFIGURATION
// ══════════════════════════════════════════════════════
// cardsPerView = how many cards are visible at once in slider mode.
// User can change this number (e.g. 2, 3, or 4).
// The layout adjusts automatically.
const sliderConfig = {
    cardsPerView: 2,        // How many cards show at once on desktop
    cardsPerViewTablet: 2,  // How many on tablets (768px–991px)
    cardsPerViewMobile: 1,  // How many on mobile (< 768px)
    gap: 20,                // Gap in px between cards (must match CSS gap)
    sliderThreshold: 2      // Slider activates when cards > this number
};

// ══════════════════════════════════════════════════════
// DOM REFERENCES
// ══════════════════════════════════════════════════════
const giftsTrack    = document.getElementById('gifts-track');
const giftTemplate  = document.getElementById('gift-card-template');
const sliderWrapper = giftsTrack.closest('.gifts-slider-wrapper');
const prevBtn       = document.getElementById('slider-prev');
const nextBtn       = document.getElementById('slider-next');
const dotsContainer = document.getElementById('slider-dots');

// ══════════════════════════════════════════════════════
// SLIDER STATE
// ══════════════════════════════════════════════════════
let currentIndex    = 0;   // Which slide is currently first visible
let isSliderActive  = false;
let totalSlides     = 0;   // Total number of "pages" in the slider
let activeCPV       = sliderConfig.cardsPerView; // active cardsPerView

// ══════════════════════════════════════════════════════
// STEP 1: BUILD CARD HTML
// Creates the HTML string for one gift card
// ══════════════════════════════════════════════════════
function createGiftCard(gift) {
    var card = giftTemplate.content.firstElementChild.cloneNode(true);
    var image = card.querySelector('.gift-card__img');
    var badge = card.querySelector('.gift-card__badge');
    var shopLink = card.querySelector('.shop-now-btn');

    image.src = gift.img;
    image.alt = gift.imgAlt;
    card.querySelector('.gift-card__category').textContent = gift.category;
    card.querySelector('.gift-card__badge-pct').textContent = gift.savePercent;
    card.querySelector('.gift-card__heading').textContent = gift.heading;

    badge.setAttribute('aria-label', 'Save ' + gift.savePercent);
    shopLink.href = gift.shopLink;
    shopLink.setAttribute('aria-label', 'Shop ' + gift.heading);

    return card;
}

// ══════════════════════════════════════════════════════
// STEP 2: RENDER ALL CARDS INTO THE TRACK
// ══════════════════════════════════════════════════════
function renderCards() {
    // Clear the track first
    giftsTrack.innerHTML = '';

    // Create each card and append to track
    giftsData.forEach(function(gift) {
        giftsTrack.appendChild(createGiftCard(gift));
    });
}

// ══════════════════════════════════════════════════════
// STEP 3: GET HOW MANY CARDS PER VIEW (responsive)
// Returns the right cardsPerView based on screen width
// ══════════════════════════════════════════════════════
function getCardsPerView() {
    var width = window.innerWidth;
    if (width < 768) {
        return sliderConfig.cardsPerViewMobile;   // Mobile: 1 card
    } else if (width < 992) {
        return sliderConfig.cardsPerViewTablet;   // Tablet: 2 cards
    } else {
        return sliderConfig.cardsPerView;         // Desktop: 2 (or 3/4)
    }
}

// ══════════════════════════════════════════════════════
// STEP 4: SET UP OR RESET THE SLIDER
// Called on page load and on window resize
// ══════════════════════════════════════════════════════
function setupSlider() {
    var totalCards = giftsData.length;

    // Is slider needed? Only if cards > threshold
    isSliderActive = totalCards > sliderConfig.sliderThreshold;

    if (isSliderActive) {
        // ── SLIDER MODE ──
        activeCPV = getCardsPerView();

        // How many total "steps" can we slide?
        // totalSlides = last valid index (so last CPV cards are visible)
        totalSlides = Math.max(0, totalCards - activeCPV);

        // Make sure currentIndex is still valid after resize
        if (currentIndex > totalSlides) {
            currentIndex = totalSlides;
        }

        // Calculate card width as a percentage of the track's container
        // Formula: (containerWidth - gaps) / cardsPerView
        var containerWidth = giftsTrack.parentElement.offsetWidth;
        var totalGaps = sliderConfig.gap * (activeCPV - 1);
        var cardWidth = (containerWidth - totalGaps) / activeCPV;

        // Set card width and gap on the track
        giftsTrack.style.gap = sliderConfig.gap + 'px';

        // Apply card width to every card
        var allCards = giftsTrack.querySelectorAll('.gift-card');
        allCards.forEach(function(card) {
            card.style.flex = '0 0 ' + cardWidth + 'px';
            card.style.width = cardWidth + 'px';
        });

        // Add slider-active class to show arrows
        giftsTrack.classList.add('slider-active');
        sliderWrapper.classList.add('slider-active');
        dotsContainer.classList.add('slider-active');

        // Build dots
        buildDots(totalCards, activeCPV);

        // Go to current index (re-applies transform after resize)
        goToSlide(currentIndex, false);  // false = no animation on resize

    } else {
        // ── STATIC LAYOUT MODE (2 or fewer cards) ──
        // Reset everything — just a normal flex row
        giftsTrack.classList.remove('slider-active');
        sliderWrapper.classList.remove('slider-active');
        dotsContainer.classList.remove('slider-active');
        dotsContainer.innerHTML = '';

        // Reset inline styles on cards so CSS takes over
        var allCards = giftsTrack.querySelectorAll('.gift-card');
        allCards.forEach(function(card) {
            card.style.flex = '';
            card.style.width = '';
        });

        // Reset track position
        giftsTrack.style.transform = 'translateX(0)';
        giftsTrack.style.gap = '20px';

        currentIndex = 0;
    }
}

// ══════════════════════════════════════════════════════
// STEP 5: BUILD DOT INDICATORS
// One dot per "page" (slide position)
// ══════════════════════════════════════════════════════
function buildDots(totalCards, cpv) {
    dotsContainer.innerHTML = '';

    // Number of dot positions = totalCards - cpv + 1
    var dotCount = totalCards - cpv + 1;

    for (var i = 0; i <= totalSlides; i++) {
        var dot = document.createElement('button');
        dot.className = 'dot';
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));

        // Make first dot active
        if (i === currentIndex) {
            dot.classList.add('dot--active');
        }

        // Dot click: go to that slide
        (function(index) {
            dot.addEventListener('click', function() {
                goToSlide(index, true);
            });
        })(i);

        dotsContainer.appendChild(dot);
    }
}

// ══════════════════════════════════════════════════════
// STEP 6: GO TO A SPECIFIC SLIDE INDEX
// Translates the track and updates arrows + dots
// ══════════════════════════════════════════════════════
function goToSlide(index, animate) {
    // Clamp index between 0 and totalSlides
    if (index < 0) index = 0;
    if (index > totalSlides) index = totalSlides;

    currentIndex = index;

    // Calculate how far to move the track
    // Each step moves one card width + one gap
    var allCards = giftsTrack.querySelectorAll('.gift-card');
    var cardWidth = 0;
    if (allCards.length > 0) {
        cardWidth = allCards[0].offsetWidth;
    }
    var moveAmount = index * (cardWidth + sliderConfig.gap);

    // Apply the slide animation (or instant if animate = false)
    if (!animate) {
        giftsTrack.style.transition = 'none';
        giftsTrack.style.transform = 'translateX(-' + moveAmount + 'px)';
        // Re-enable transition after a tiny repaint
        requestAnimationFrame(function() {
            giftsTrack.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    } else {
        giftsTrack.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        giftsTrack.style.transform = 'translateX(-' + moveAmount + 'px)';
    }

    // Update prev/next button disabled state
    prevBtn.disabled = (currentIndex === 0);
    nextBtn.disabled = (currentIndex === totalSlides);

    // Update active dot
    var dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach(function(dot, i) {
        dot.classList.toggle('dot--active', i === currentIndex);
    });
}

// ══════════════════════════════════════════════════════
// STEP 7: ARROW BUTTON EVENTS
// ══════════════════════════════════════════════════════
prevBtn.addEventListener('click', function() {
    goToSlide(currentIndex - 1, true);
});

nextBtn.addEventListener('click', function() {
    goToSlide(currentIndex + 1, true);
});

// ══════════════════════════════════════════════════════
// STEP 8: RESIZE HANDLER
// Re-calculates card widths and slider state on resize
// ══════════════════════════════════════════════════════
var resizeTimer;
window.addEventListener('resize', function() {
    // Debounce: wait until resize stops before recalculating
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        setupSlider();
    }, 150);
});

// ══════════════════════════════════════════════════════
// INITIALIZE ON PAGE LOAD
// ══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
    renderCards();   // Step 1: Put cards in the DOM
    setupSlider();   // Step 2: Set up slider if needed
});
