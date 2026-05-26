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
        btnText: "Shop Cosmetics",
        btnLink: "#",
        image: "images/h3.webp"
    }
];

let currentSlide = 0;
const slideDuration = 5000; // 5 seconds
let slideInterval;

const subHeadingElement = document.querySelector('.sub-heading');
const titleElement = document.getElementById('hero-title');
const descriptionElement = document.querySelector('.description');
const shopBtnElement = document.querySelector('.shop-btn');
const imageElement = document.getElementById('hero-image');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function updateSlide(index) {
    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    // Add exit classes to trigger fade-out animation
    subHeadingElement.classList.add('slide-exit');
    titleElement.classList.add('slide-exit');
    descriptionElement.classList.add('slide-exit');
    shopBtnElement.classList.add('slide-exit');
    imageElement.classList.add('image-fade-out');

    // Wait for fade out to complete (400ms matches exit animation duration)
    setTimeout(() => {
        // Update content
        subHeadingElement.textContent = slides[currentSlide].subHeading;
        titleElement.innerHTML = slides[currentSlide].title;
        descriptionElement.innerHTML = slides[currentSlide].description;
        shopBtnElement.textContent = slides[currentSlide].btnText;
        shopBtnElement.setAttribute('href', slides[currentSlide].btnLink);
        imageElement.src = slides[currentSlide].image;

        // Remove exit classes and add enter classes
        subHeadingElement.classList.remove('slide-exit');
        titleElement.classList.remove('slide-exit');
        descriptionElement.classList.remove('slide-exit');
        shopBtnElement.classList.remove('slide-exit');
        imageElement.classList.remove('image-fade-out');

        subHeadingElement.classList.add('slide-enter');
        titleElement.classList.add('slide-enter');
        descriptionElement.classList.add('slide-enter');
        shopBtnElement.classList.add('slide-enter');
        imageElement.classList.add('image-fade-in');

        // Clean up enter classes after all animations complete (600ms duration + 240ms max delay = 840ms)
        setTimeout(() => {
            subHeadingElement.classList.remove('slide-enter');
            titleElement.classList.remove('slide-enter');
            descriptionElement.classList.remove('slide-enter');
            shopBtnElement.classList.remove('slide-enter');
            imageElement.classList.remove('image-fade-in');
        }, 900);

    }, 400);

    // Update dots and progress animation
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
