// js/about.js - About Me Page Specific Scripts

document.addEventListener('DOMContentLoaded', () => {
    // Staggered animation for skill list items
    const skillLists = document.querySelectorAll('.skills-grid .skill-category ul.stagger-fade-in');

    skillLists.forEach(ul => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the UL is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(ul.children).forEach((li, index) => {
                        li.style.transitionDelay = `${index * 0.1}s`; // Stagger delay
                        li.classList.add('active'); // Trigger animation
                    });
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        observer.observe(ul);
    });

    // Note: The global scroll animation logic for .animate-on-scroll is handled by main.js
    // Any future interactivity unique to the About Me page would go here.
});
