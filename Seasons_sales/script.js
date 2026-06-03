document.addEventListener('DOMContentLoaded', () => {
    // Check if target time exists in localStorage, otherwise set a new one
    // Target is exactly 27 days, 12 hours, 47 minutes, and 13 seconds from the first load
    let targetTime = localStorage.getItem('seasons_sale_target');
    if (!targetTime) {
        const countdownDuration = 
            (27 * 24 * 60 * 60 * 1000) + // 27 days
            (12 * 60 * 60 * 1000) +      // 12 hours
            (47 * 60 * 1000) +           // 47 minutes
            (13 * 1000);                 // 13 seconds
        
        targetTime = Date.now() + countdownDuration;
        localStorage.setItem('seasons_sale_target', targetTime);
    } else {
        targetTime = parseInt(targetTime, 10);
    }

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = Date.now();
        const difference = targetTime - now;

        if (difference <= 0) {
            // Reset countdown target to simulate a loop if it expires
            const resetDuration = 
                (27 * 24 * 60 * 60 * 1000) +
                (12 * 60 * 60 * 1000) +
                (47 * 60 * 1000) +
                (13 * 1000);
            const newTarget = Date.now() + resetDuration;
            localStorage.setItem('seasons_sale_target', newTarget);
            location.reload();
            return;
        }

        // Calculations for days, hours, minutes, and seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Format numbers to always show two digits (e.g. 05 instead of 5)
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Run immediately on load and then every second
    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    // Simple interaction logs for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const label = card.querySelector('.category-label').textContent;
            console.log(`Navigating to category: ${label}`);
        });
    });
});
