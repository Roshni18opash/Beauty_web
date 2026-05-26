const slides = [
    {
        subHeading: "Grab The Deals",
        title: "Getting Your<br>Natural Beauty",
        description: "Our industry leading standards for product safety give<br>you the power to make better.",
        btnText: "Shop Skincare",
        btnLink: "#",
        image: "images/h1.webp"
    },
    {
        subHeading: "Take The Chance",
        title: "Finding Your<br>Unique Style",
        description: "Our industry leading standards for product safety give<br>you the power to make better.",
        btnText: "Shop Body",
        btnLink: "#",
        image: "images/h2.webp"
    },
    {
        subHeading: "New Arrivals",
        title: "Nurturing Your<br> Creative Spirit",
        description: "Elevate your makeup game with our professional range of<br>cruelty-free cosmetics.",
        btnText: "Shop Makeup",
        btnLink: "#",
        image: "images/h3.webp"
    }
];

let currentSlide = 0;
const slideDuration = 5000; // 5 seconds
let slideInterval;

// DOM Elements
const subHeadingElement = document.querySelector('.sub-heading');
const titleElement = document.getElementById('hero-title');
const descriptionElement = document.querySelector('.description');
const shopBtnElement = document.querySelector('.shop-btn');
const imageElement = document.getElementById('hero-image');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Group text elements to simplify staggered animations
const animatedTextElements = [subHeadingElement, titleElement, descriptionElement, shopBtnElement];

function updateSlide(index) {
    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    // Trigger exit animation for text elements and image
    animatedTextElements.forEach(el => el.classList.add('slide-exit'));
    imageElement.classList.add('image-fade-out');

    // Wait for exit animation to complete (400ms matches CSS exit duration)
    setTimeout(() => {
        // Update slide texts, links, and image source
        subHeadingElement.textContent = slides[currentSlide].subHeading;
        titleElement.innerHTML = slides[currentSlide].title;
        descriptionElement.innerHTML = slides[currentSlide].description;
        shopBtnElement.textContent = slides[currentSlide].btnText;
        shopBtnElement.href = slides[currentSlide].btnLink;
        imageElement.src = slides[currentSlide].image;

        // Transition elements to enter animation state
        animatedTextElements.forEach(el => {
            el.classList.remove('slide-exit');
            el.classList.add('slide-enter');
        });
        imageElement.classList.remove('image-fade-out');

        // Clean up enter classes once animations complete (900ms covers duration + staggered delays)
        setTimeout(() => {
            animatedTextElements.forEach(el => el.classList.remove('slide-enter'));
        }, 900);

    }, 400);

    // Update navigation dots progress indicator
    updateDots();
}

function updateDots() {
    dots.forEach((dot, idx) => {
        dot.classList.remove('active');
        dot.classList.remove('animate-progress');

        if (idx === currentSlide) {
            dot.classList.add('active');

            // Force reflow to restart animation reliably
            void dot.offsetWidth;

            // Add animate-progress class after a tiny delay to ensure transition triggers from 0
            setTimeout(() => {
                dot.classList.add('animate-progress');
            }, 10);
        }
    });

    resetTimer();
}

function nextSlide() {
    updateSlide(currentSlide + 1);
}

function prevSlide() {
    updateSlide(currentSlide - 1);
}

function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideDuration);
}

// Event Listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
        if (currentSlide !== idx) {
            updateSlide(idx);
        }
    });
});

// Initialize first slide progress animation and timer
updateDots();
