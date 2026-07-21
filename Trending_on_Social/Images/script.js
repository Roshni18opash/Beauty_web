/* ============================================================
   WHAT TRENDING ON SOCIAL — script.js
   Slider logic: EXACT same structure as provided .fire template.
   Extra: video play/pause toggle per card.
   ============================================================ */

(function () {
    'use strict';

    /* ── Slider References (same variable names as .fire template) ── */
    const track   = document.getElementById('productsTrack');
    const thumb   = document.getElementById('scrollThumb');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const footer  = document.querySelector('.slider-footer');

    if (!track || !thumb || !prevBtn || !nextBtn) return;

    /* ── Constants ─────────────────────────────────────────── */
    const GAP_BETWEEN_CARDS = 16;
    const MIN_THUMB_WIDTH_PERCENT = 30;
    const MAX_THUMB_WIDTH_PERCENT = 100;
    const CARD_SELECTOR = '.social-card, .product_card';

    // Set initial position
    thumb.style.width = MIN_THUMB_WIDTH_PERCENT + '%';
    thumb.style.left  = '0%';

    /* ── Get visible card width ────────────────────────────── */
    function getVisibleCardWidth() {
        const visibleCard = track.querySelector(CARD_SELECTOR);
        return visibleCard
            ? visibleCard.offsetWidth + GAP_BETWEEN_CARDS
            : 220 + GAP_BETWEEN_CARDS;
    }

    function syncScrollbar() {
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (maxScroll <= 0) {
            if (footer) footer.style.display = 'none';
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        } else {
            if (footer) footer.style.display = 'flex';
        }

        prevBtn.disabled = track.scrollLeft <= 1;
        nextBtn.disabled = track.scrollLeft >= maxScroll - 1;

        const scrollRatio = Math.max(0, Math.min(1, track.scrollLeft / maxScroll));
        const thumbWidthPercent = MIN_THUMB_WIDTH_PERCENT + (scrollRatio * (MAX_THUMB_WIDTH_PERCENT - MIN_THUMB_WIDTH_PERCENT));

        thumb.style.width = thumbWidthPercent + '%';
        thumb.style.left = '0%';
    }

    prevBtn.onclick = function () {
        const cardWidth = getVisibleCardWidth();
        const remainder = track.scrollLeft % cardWidth;
        let targetScroll = track.scrollLeft - cardWidth;
        if (remainder > 5) {
            targetScroll = track.scrollLeft - remainder;
        }
        track.scrollTo({ left: targetScroll, behavior: 'smooth' });
    };

    nextBtn.onclick = function () {
        const cardWidth = getVisibleCardWidth();
        const remainder = track.scrollLeft % cardWidth;
        let targetScroll = track.scrollLeft + cardWidth;
        if (remainder > 5) {
            targetScroll = track.scrollLeft + (cardWidth - remainder);
        }
        track.scrollTo({ left: targetScroll, behavior: 'smooth' });
    };

    track.addEventListener('scroll', syncScrollbar);
    window.addEventListener('resize', syncScrollbar);
    
    // Initial check
    setTimeout(syncScrollbar, 100);

    /* ════════════════════════════════════════════════════════
       VIDEO PLAY / PAUSE — per card toggle
       Click play button → play video, button fades out
       Click again (card hover shows it) → pause
       ════════════════════════════════════════════════════════ */
    const cards = track.querySelectorAll(CARD_SELECTOR);

    cards.forEach(function (card) {
        const video    = card.querySelector('.card-video');
        const playBtn  = card.querySelector('.play-btn');
        const iconPlay = playBtn ? playBtn.querySelector('.icon-play') : null;
        const iconPause = playBtn ? playBtn.querySelector('.icon-pause') : null;

        if (!video || !playBtn) return;

        /* Toggle play/pause on button click */
        playBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (video.paused) {
                /* Pause all other videos first */
                cards.forEach(function (otherCard) {
                    const otherVid = otherCard.querySelector('.card-video');
                    const otherBtn = otherCard.querySelector('.play-btn');
                    if (otherVid && otherVid !== video && !otherVid.paused) {
                        otherVid.pause();
                        if (otherBtn) {
                            otherBtn.classList.remove('playing');
                            const oPlay  = otherBtn.querySelector('.icon-play');
                            const oPause = otherBtn.querySelector('.icon-pause');
                            if (oPlay)  oPlay.style.display  = '';
                            if (oPause) oPause.style.display = 'none';
                        }
                    }
                });

                video.play().then(function () {
                    playBtn.classList.add('playing');
                    if (iconPlay)  iconPlay.style.display  = 'none';
                    if (iconPause) iconPause.style.display = '';
                    playBtn.setAttribute('aria-label', 'Pause video');
                }).catch(function () { /* Autoplay blocked — ignore */ });
            } else {
                video.pause();
                playBtn.classList.remove('playing');
                if (iconPlay)  iconPlay.style.display  = '';
                if (iconPause) iconPause.style.display = 'none';
                playBtn.setAttribute('aria-label', 'Play video');
            }
        });

        /* When video ends (non-loop case) — reset button */
        video.addEventListener('ended', function () {
            playBtn.classList.remove('playing');
            if (iconPlay)  iconPlay.style.display  = '';
            if (iconPause) iconPause.style.display = 'none';
            playBtn.setAttribute('aria-label', 'Play video');
        });
    });

    /* ════════════════════════════════════════════════════════
       INTERSECTION OBSERVER — pause video when card scrolls off
       ════════════════════════════════════════════════════════ */
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    const vid = entry.target.querySelector('.card-video');
                    const btn = entry.target.querySelector('.play-btn');
                    if (vid && !vid.paused) {
                        vid.pause();
                        if (btn) {
                            btn.classList.remove('playing');
                            const pl = btn.querySelector('.icon-play');
                            const pa = btn.querySelector('.icon-pause');
                            if (pl) pl.style.display = '';
                            if (pa) pa.style.display = 'none';
                        }
                    }
                }
            });
        }, { threshold: 0.3 });

        cards.forEach(function (card) {
            observer.observe(card);
        });
    }

})();
