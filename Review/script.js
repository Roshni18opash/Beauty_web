/* ══════════════════════════════════════════════════════════════════
   ██████╗ ███████╗██╗   ██╗██╗███████╗██╗    ██╗███████╗
   ██╔══██╗██╔════╝██║   ██║██║██╔════╝██║    ██║██╔════╝
   ██████╔╝█████╗  ██║   ██║██║█████╗  ██║ █╗ ██║███████╗
   ██╔══██╗██╔══╝  ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║╚════██║
   ██║  ██║███████╗ ╚████╔╝ ██║███████╗╚███╔███╔╝███████║
   ╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚══════╝

   ══════════════════════════════════════════════════════════════════

   HOW TO ADD A NEW REVIEW:
   ─────────────────────────
   1. Open this file (script.js)
   2. Find the `reviews` array below
   3. Copy any existing review object `{ ... }`
   4. Paste it at the end of the array (before the last `]`)
   5. Fill in your details: name, review, product, avatar, productImg
   6. Save — done! The carousel updates automatically.

   ══════════════════════════════════════════════════════════════════ */


// ╔══════════════════════════════════════════════════════╗
// ║         REVIEWS DATA — ADMIN EDITS THIS ONLY        ║
// ╚══════════════════════════════════════════════════════╝
const reviews = [
    {
        name:       "Jenny W.",
        avatar:     "images/author-1.webp",
        review:     '"This was a great way for me to try Osea products for the first time and I highly recommend all of them. They work well and I will be repurchasing."',
        product:    "Balancing Hypotonic",
        productImg: "images/product-1.webp",
        productUrl: "#"
    },
    {
        name:       "Stephanie",
        avatar:     "images/author-2.webp",
        review:     '"I\'ve been using this face wash for a while now, and it\'s been a game-changer for my skin!.."',
        product:    "Blanca Scented Candle",
        productImg: "images/product-2.jpg",
        productUrl: "#"
    },
    {
        name:       "Rachel",
        avatar:     "images/author-3.webp",
        review:     '"I was excited for this product. I love vetiver\'s scent, but this smelled nothing like vetiver. Plus, a very strong fragrance that didn\'t seem natural at all."',
        product:    "Brighten Cleanser",
        productImg: "images/product-3.webp",
        productUrl: "#"
    },
    {
        name:       "Emily A.",
        avatar:     "images/author-4.jpg",
        review:     '"I have always loved the brand Innersense Organic Beauty, but I struggled to find products among their hair baths."',
        product:    "Brow Pencil",
        productImg: "images/product-4.webp",
        productUrl: "#"
    },
    {
        name:       "Cooper",
        avatar:     "images/author-5.webp",
        review:     '"I\'ve been using this face wash for a while now, and it\'s been a game-changer for my skin!.."',
        product:    "Citrus Scrub",
        productImg: "images/product-5.webp",
        productUrl: "#"
    },
    {
        name:       "Kelly D.",
        avatar:     "images/author-6.webp",
        review:     '"After trying this face wash for a while, I can say it has made a significant difference for my complexion!"',
        product:    "Cleansing Oil",
        productImg: "images/product-6.webp",
        productUrl: "#"
    },
    {
        name:       "Sophia M.",
        avatar:     "images/author-1.webp",
        review:     '"This daily acid toner has completely cleared up my blemishes. It\'s gentle yet effective. Will buy again!"',
        product:    "Balancing Hypotonic",
        productImg: "images/product-1.webp",
        productUrl: "#"
    },
    {
        name:       "Liam T.",
        avatar:     "images/author-2.webp",
        review:     '"The candle smells absolutely divine. It fills the entire room within minutes. Highly recommend!"',
        product:    "Blanca Scented Candle",
        productImg: "images/product-2.jpg",
        productUrl: "#"
    },
    {
        name:       "Olivia G.",
        avatar:     "images/author-3.webp",
        review:     '"The best cleansing oil I have ever used. It melts away all my makeup without drying out my skin."',
        product:    "Cleansing Oil",
        productImg: "images/product-6.webp",
        productUrl: "#"
    }

    // ─── ADD MORE REVIEWS HERE ────────────────────────────
    // Just copy the block below, paste above this comment,
    // and fill in your values:
    //
    // ,{
    //     name:       "Customer Name",
    //     avatar:     "images/your-photo.jpg",
    //     review:     '"Your review text here."',
    //     product:    "Product Name",
    //     productImg: "images/your-product.jpg",
    //     productUrl: "#"
    // }
    // ─────────────────────────────────────────────────────
];


// ╔══════════════════════════════════════════════════════╗
// ║        CARD BUILDER — creates one card's HTML       ║
// ╚══════════════════════════════════════════════════════╝

// SVG checkmark icon for "Verified Buyer" badge
const checkIcon = `
    <svg viewBox="0 0 16 16" width="12" height="12" fill="#198754" aria-hidden="true">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022
                 L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0
                 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>`;

/**
 * buildCard(data)
 * Takes one review object and returns an <article> element.
 */
function buildCard(data) {
    // Create the card element
    const card = document.createElement('article');
    card.className = 'review-card';
    card.setAttribute('aria-label', `Review by ${data.name}`);

    // Fill the card with HTML
    card.innerHTML = `
        <!-- Reviewer info at the top -->
        <div>
            <div class="card-header-block">
                <img
                    class="reviewer-avatar"
                    src="${data.avatar}"
                    alt="Photo of ${data.name}"
                    loading="lazy"
                    onerror="this.src='images/author-1.webp'"
                >
                <div class="reviewer-info">
                    <h2 class="reviewer-name">${data.name}</h2>
                    <span class="reviewer-status">
                        ${checkIcon}
                        Verified Buyer
                    </span>
                </div>
            </div>
            <p class="review-text">${data.review}</p>
        </div>

        <!-- Product link at the bottom -->
        <div>
            <div class="card-product-divider"></div>
            <a href="${data.productUrl}" class="product-link" aria-label="View product: ${data.product}">
                <img
                    class="product-icon-img"
                    src="${data.productImg}"
                    alt="${data.product}"
                    onerror="this.style.display='none'"
                >
                <span class="product-name">${data.product}</span>
            </a>
        </div>
    `;

    return card;
}


// ╔══════════════════════════════════════════════════════╗
// ║      CAROUSEL BUILDER — renders & loops the track  ║
// ╚══════════════════════════════════════════════════════╝

/**
 * initCarousel()
 * 1. Renders all cards from the reviews array
 * 2. Clones them for seamless infinite loop
 * 3. Sets the animation speed based on number of cards
 */
function initCarousel() {
    const track = document.getElementById('carousel-track');

    // Safety check — stop if the track element doesn't exist
    if (!track) return;

    // ── Step 1: Build & add original cards ──────────────
    reviews.forEach(data => {
        track.appendChild(buildCard(data));
    });

    // ── Step 2: Clone all cards for the seamless loop ───
    // When the animation scrolls through the originals, the
    // clones continue — at exactly -50% we're back to start.
    const originalCards = Array.from(track.children);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true); // deep copy
        clone.setAttribute('aria-hidden', 'true'); // hide from screen readers
        track.appendChild(clone);
    });

    // ── Step 3: Set scroll speed ─────────────────────────
    // More cards = wider track = slower scroll (stays same visual pace).
    // Tweak the multiplier (6) to make it faster or slower.
    const speedSeconds = reviews.length * 6;
    track.style.setProperty('--scroll-duration', speedSeconds + 's');
    // Also apply directly since CSS var may not inherit from inline style
    track.style.animationDuration = speedSeconds + 's';
}

// ── Run when page is ready ──────────────────────────────
document.addEventListener('DOMContentLoaded', initCarousel);
