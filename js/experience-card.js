document.addEventListener('DOMContentLoaded', () => {
    initializeTimeline();
});

document.querySelectorAll('.experience-card').forEach((card, index) => {
    card.style.setProperty('--card-index', index);
});

function initializeTimeline() {
    const timeButtons = document.querySelectorAll('.time-btn');
    const cards = document.querySelectorAll('.timeline_content');
    
    // show all cards initially
    cards.forEach(card => card.classList.add('active'));
    timeButtons.forEach(btn => btn.classList.remove('active'));
    
    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const year = button.dataset.year;
            
            if (button.classList.contains('active')) {
                // if clicking active button, show all cards
                button.classList.remove('active');
                cards.forEach(card => {
                    card.classList.add('active');
                    resetAnimation(card);
                });
            } else {
                // otherwise filter by year
                timeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterByYear(year);
            }
        });
    });
    
    function filterByYear(year) {
        cards.forEach(card => {
            if (card.dataset.year === year) {
                card.classList.add('active');
                resetAnimation(card);
            } else {
                card.classList.remove('active');
            }
        });
    }
    
    function resetAnimation(card) {
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = null;
    }

}

function debounce(func, wait = 10) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element

        // Calculate rotation based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = -((x - centerX) / centerX) * 10; // Max 5deg rotation
        const rotateX = ((y - centerY) / centerY) * 10; // Max 5deg rotation

        // Apply the transformation
        card.style.transform = `perspective(1000px) 
                                rotateX(${rotateX}deg) 
                                rotateY(${rotateY}deg) 
                                translateZ(30px)`;
    });

    card.addEventListener('mouseleave', () => {
        // Reset the transformation when mouse leaves the card
        card.style.transform = 'none';
    });
});