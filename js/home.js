// js/home.js - Homepage Specific Scripts

document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that should animate on scroll
    // We'll add the 'animate-on-scroll' class to these in HTML.
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    // Create a new Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the element is visible, add the 'active' class to trigger animation
                entry.target.classList.add('active');
                // Stop observing once it's animated (optional, but good for performance)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each animated element
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Handle elements that are already in view on page load
    // This ensures they animate immediately without requiring a scroll
    animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add('active');
            observer.unobserve(element); // Stop observing if already active
        }
    });
});
