// Simple JavaScript file for adding interactive behaviors and micro-interactions
document.addEventListener('DOMContentLoaded', () => {
    // Select all shop buttons
    const shopButtons = document.querySelectorAll('.shop-btn');
    
    shopButtons.forEach(button => {
        // Prevent default hash jump and simulate redirection
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productTitle = button.closest('.beauty-card').querySelector('.product-title').textContent;
            console.log(`Product Selected: ${productTitle}. Opening shop page...`);
            
            // Add a subtle click visual feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Make the entire card body clickable to direct users to the respective card section
    const beautyCards = document.querySelectorAll('.beauty-card');
    beautyCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // If the user clicks on the shop button specifically, ignore this event listener
            if (event.target.closest('.shop-btn')) return;
            
            const category = card.querySelector('.card-subtitle').textContent;
            const conceptName = card.querySelector('.card-title').textContent;
            console.log(`Clicked on category section: ${category} - "${conceptName}"`);
        });
    });
});
