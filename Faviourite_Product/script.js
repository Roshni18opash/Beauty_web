// Slider State
let currentIndex = 0;
const totalSlides = 2;
let isTransitioning = false;

// Background colors for the left panel corresponding to each slide
const bgColors = ["#dcebe8", "#e5e0f7"];

// DOM Elements
const leftPanel = document.getElementById('left-panel');
const textSliderTrack = document.getElementById('text-slider-track');
const bgSliderTrack = document.getElementById('bg-slider-track');
const sliderCounter = document.getElementById('slider-counter');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const textSlides = document.querySelectorAll('.text-slide');
const bgSlides = document.querySelectorAll('.bg-slide');

// Card slides — each positioned absolute for crossfade
const cardSlides = document.querySelectorAll('.card-slide');

// Update Slider Position
function updateSlider(index) {
    const translateVal = `translateX(-${index * 50}%)`;

    // Slide: text track
    if (textSliderTrack) {
        textSliderTrack.style.transform = translateVal;
    }

    // Slide: background track
    if (bgSliderTrack) {
        bgSliderTrack.style.transform = translateVal;
    }

    // Fade: left panel background color
    if (leftPanel) {
        leftPanel.style.backgroundColor = bgColors[index];
    }

    // Update counter
    if (sliderCounter) {
        sliderCounter.textContent = `${index + 1}/${totalSlides}`;
    }

    // Toggle active class for text slides
    if (textSlides && textSlides.length) {
        textSlides.forEach((s, i) => s.classList.toggle('active', i === index));
    }

    // Toggle active class for bg slides
    if (bgSlides && bgSlides.length) {
        bgSlides.forEach((s, i) => s.classList.toggle('active', i === index));
    }

    // CROSSFADE card slides — like hover effect
    if (cardSlides && cardSlides.length) {
        cardSlides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('card-slide-active');
            } else {
                slide.classList.remove('card-slide-active');
            }
        });
    }
}

// Navigation Listeners
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider(currentIndex);

        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider(currentIndex);

        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    });
}

// Initialize
updateSlider(currentIndex);
