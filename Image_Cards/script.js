document.addEventListener('DOMContentLoaded', () => {
    const layoutButtons = document.querySelectorAll('.layout-toggle');
    const gridWrapper = document.querySelector('.beauty-cards-grid');
    const sliderWrapper = document.querySelector('.beauty-cards-slider');
    const cardElements = Array.from(document.querySelectorAll('.beauty-card'));
    const swiperContainer = document.querySelector('.beauty-swiper .swiper-wrapper');
    let swiperInstance = null;

    const initSlider = () => {
        if (swiperInstance) return;

        swiperInstance = new Swiper('.beauty-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                600: {
                    slidesPerView: 1,
                },
                900: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
            },
        });
    };

    const destroySlider = () => {
        if (!swiperInstance) return;

        swiperInstance.destroy(true, true);
        swiperInstance = null;
    };

    const buildSliderSlides = () => {
        swiperContainer.innerHTML = '';
        cardElements.forEach(card => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.appendChild(card.cloneNode(true));
            swiperContainer.appendChild(slide);
        });
    };

    const setLayout = (layout) => {
        layoutButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.layout === layout);
        });

        if (layout === 'slider') {
            gridWrapper.classList.add('hidden');
            sliderWrapper.classList.remove('hidden');
            buildSliderSlides();
            initSlider();
        } else {
            sliderWrapper.classList.add('hidden');
            gridWrapper.classList.remove('hidden');
            destroySlider();
        }

        if (layout === 'grid') {
            gridWrapper.style.gridTemplateColumns = 'repeat(4, 1fr)';
        } else if (layout === 'auto') {
            gridWrapper.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
        }
    };

    const shouldStartSlider = () => cardElements.length > 4;
    const defaultLayout = shouldStartSlider() ? 'slider' : 'auto';

    layoutButtons.forEach(button => {
        button.addEventListener('click', () => setLayout(button.dataset.layout));
    });

    setLayout(defaultLayout);

    document.querySelectorAll('.shop-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
        });
    });

    document.querySelectorAll('.beauty-card').forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.closest('.shop-btn')) return;
            const category = card.querySelector('.card-subtitle').textContent;
            const conceptName = card.querySelector('.card-title').textContent;
            console.log(`Clicked on category section: ${category} - "${conceptName}"`);
        });
    });
});
