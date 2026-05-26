const slides = [
    {
        subHeading: "Grab The Deals",
        title: "Getting Your<br>Natural Beauty",
        description:
            "Our industry leading standards for product safety give<br>you the power to make better.",
        btnText: "Shop Skincare",
        btnLink: "#",
        image: "images/h1.webp"
    },

    {
        subHeading: "Take The Chance",
        title: "Finding Your<br>Unique Style",
        description:
            "Our industry leading standards for product safety give<br>you the power to make better.",
        btnText: "Shop Body",
        btnLink: "#",
        image: "images/h2.webp"
    },

    {
        subHeading: "New Arrivals",
        title: "Nurturing Your<br>Creative Spirit",
        description:
            "Elevate your makeup game with our professional range of<br>cruelty-free cosmetics.",
        btnText: "Shop Makeup",
        btnLink: "#",
        image: "images/h3.webp"
    }
];

let currentSlide = 0;
let interval;

/* Elements */

const subHeading = document.querySelector(".sub-heading");
const title = document.getElementById("hero-title");
const description = document.querySelector(".description");
const button = document.querySelector(".shop-btn");
const image = document.getElementById("hero-image");

const dots = document.querySelectorAll(".dot");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

/* Render Slide */

function renderSlide() {

    const slide = slides[currentSlide];

    subHeading.innerHTML = slide.subHeading;
    title.innerHTML = slide.title;
    description.innerHTML = slide.description;

    button.innerHTML = slide.btnText;
    button.href = slide.btnLink;

    image.src = slide.image;

    animateContent();

    updateDots();
}

/* Animation */

function animateContent() {

    const elements = [
        subHeading,
        title,
        description,
        button,
        image
    ];

    elements.forEach(el => {

        el.classList.remove("fade-in");

        void el.offsetWidth;

        el.classList.add("fade-in");
    });
}

/* Dots */

function updateDots() {

    dots.forEach((dot, index) => {

        dot.classList.remove("active", "animate");

        if (index === currentSlide) {

            dot.classList.add("active");

            setTimeout(() => {
                dot.classList.add("animate");
            }, 10);
        }
    });
}

/* Next */

function nextSlide() {

    currentSlide =
        (currentSlide + 1) % slides.length;

    renderSlide();

    resetInterval();
}

/* Previous */

function prevSlide() {

    currentSlide =
        (currentSlide - 1 + slides.length) %
        slides.length;

    renderSlide();

    resetInterval();
}

/* Auto Slide */

function startSlider() {

    interval = setInterval(nextSlide, 5000);
}

function resetInterval() {

    clearInterval(interval);

    startSlider();
}

/* Events */

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", prevSlide);

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentSlide = index;

        renderSlide();

        resetInterval();
    });
});

/* Init */

renderSlide();

startSlider();