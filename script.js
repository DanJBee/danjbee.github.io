// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a class to enable animations once JavaScript is available
    document.body.classList.add('js-animation-ready');
    
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Add scroll animation for elements
    const revealElements = document.querySelectorAll('.expertise-card, .portfolio-item, .contact-card');

    // Assign staggered delays per grid so reveal order remains stable as cards change.
    const staggerConfig = [
        { grid: '.expertise-grid', card: '.expertise-card' },
        { grid: '.portfolio-grid', card: '.portfolio-item' },
        { grid: '.contact-grid', card: '.contact-card' }
    ];

    const delayStep = 0.08;
    const maxDelay = 0.64;

    staggerConfig.forEach(({ grid, card }) => {
        const gridElement = document.querySelector(grid);

        if (!gridElement) {
            return;
        }

        const cards = gridElement.querySelectorAll(card);
        cards.forEach((element, index) => {
            const delay = Math.min(index * delayStep, maxDelay);
            element.style.setProperty('--reveal-delay', `${delay.toFixed(2)}s`);
        });
    });
    
    function checkScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check scroll position on initial load
    checkScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', checkScroll);
});
