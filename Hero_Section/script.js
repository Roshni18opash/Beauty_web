const slides = [
    {
        title: "Getting Your<br>Natural Beauty",
        image: "images/h1.webp"
    },
    {
        title: "Finding Your<br>Unique Style",
        image: "images/h2.webp"
    },
    {
        title: "Discover Your<br>Creative Spirit",
        image: "images/h3.webp"
    }
];

let currentSlide = 0;
const slideDuration = 5000; // 5 seconds
let slideInterval;

const titleElement = document.getElementById('hero-title');
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

    // Add fade out classes
    titleElement.classList.add('fade-out');
    imageElement.classList.add('image-fade-out');

    // Wait for fade out to complete
    setTimeout(() => {
        // Update content
        titleElement.innerHTML = slides[currentSlide].title;
        imageElement.src = slides[currentSlide].image;

        // Remove fade out, add fade in
        titleElement.classList.remove('fade-out');
        imageElement.classList.remove('image-fade-out');
        titleElement.classList.add('fade-in');
        imageElement.classList.add('image-fade-in');

        // Clean up fade in classes after animation completes
        setTimeout(() => {
            titleElement.classList.remove('fade-in');
            imageElement.classList.remove('image-fade-in');
        }, 400); // 400ms matches css transition duration

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
