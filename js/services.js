// js/services.js - Services Page Specific Scripts

document.addEventListener('DOMContentLoaded', () => {
    // Function to handle staggered fade-in for list items
    const animateListItems = (listElement) => {
        const listItems = listElement.querySelectorAll('li');
        listItems.forEach((item, index) => {
            // Only add 'active' class if the parent list is already active (visible)
            // This prevents animations from firing too early if the parent is off-screen
            if (listElement.classList.contains('active')) {
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 100); // Stagger delay of 100ms per item
            }
        });
    };

    // Observer to trigger animations when elements enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Activate the main element (e.g., service-card, section-title)

                // If the element is a service-card, trigger staggered animation for its features list
                if (entry.target.classList.contains('service-card')) {
                    const serviceFeaturesList = entry.target.querySelector('.service-features');
                    if (serviceFeaturesList) {
                        serviceFeaturesList.classList.add('active'); // Activate the list itself
                        animateListItems(serviceFeaturesList); // Trigger individual list item animation
                    }
                }
                // Stop observing once animated to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    // Observe all elements that should animate on scroll
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Handle staggered fade-in for the service features lists on initial load if already in viewport
    // This catches elements that are visible immediately without scrolling
    document.querySelectorAll('.service-features').forEach(list => {
        const rect = list.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            list.classList.add('active');
            animateListItems(list);
        }
    });
});
