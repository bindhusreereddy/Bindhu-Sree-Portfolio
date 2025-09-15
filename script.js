document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- Typed.js Animation for Home Section ---
    if (document.querySelector('.typed-text')) {
        const typed = new Typed('.typed-text', {
            strings: ["Masters Student at University of Florida","Software Engineer","Full Stack Developer", "AI Enthusiast", "Curious Learner", "Problem Solver"],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 2000,
        });
    }

    // --- RE-ENABLED: Smooth Scroll for Sidebar Links ---
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 0.05, // You can adjust this speed
                    scrollTo: { y: target, offsetY: 0 },
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // --- RE-ENABLED: Animate Sections on Scroll ---
    gsap.utils.toArray('.section').forEach(section => {
        gsap.fromTo(section,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    end: "bottom top",
                    toggleActions: "play none none reverse",
                }
            }
        );
    });

    // --- RE-ENABLED: Intersection Observer for Active Sidebar Link Highlighting ---
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 // Section is "active" when 40% is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Get the id of the intersecting section
                const id = entry.target.getAttribute('id');

                // Find the corresponding nav link and add active class
                const activeLink = document.querySelector(`.sidebar-nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

});