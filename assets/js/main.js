/**
 * LegalAI Pro - Main JavaScript File
 * Handles animations, interactions, and dynamic functionality
 */

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollAnimations();
    initializeMicroInteractions();
    initializeNavigation();
    initializeCarousels();
    initializeFormHandlers();
    initializeParallax();
});

/**
 * Initialize basic animations
 */
function initializeAnimations() {
    // Hero title animation
    gsap.timeline()
        .from('.hero-title', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-cta .btn', {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        }, '-=0.3')
        .from('.hero-stats .stat-item', {
            duration: 0.5,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.2');

    // Compliance badges animation
    gsap.from('.compliance-badges .badge-item', {
        duration: 0.8,
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 0.5
    });

    // Document preview animation
    gsap.from('.document-preview', {
        duration: 1.2,
        x: 100,
        opacity: 0,
        rotation: 10,
        ease: 'power3.out',
        delay: 0.8
    });

    // Floating icons animation
    gsap.from('.floating-icon', {
        duration: 1,
        scale: 0,
        opacity: 0,
        stagger: 0.3,
        ease: 'back.out(1.7)',
        delay: 1.5
    });
}

/**
 * Initialize scroll-triggered animations
 */
function initializeScrollAnimations() {
    // Fade in elements on scroll
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        });
    });

    // Slide in from left
    gsap.utils.toArray('.slide-in-left').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            x: -100,
            opacity: 0,
            ease: 'power2.out'
        });
    });

    // Slide in from right
    gsap.utils.toArray('.slide-in-right').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            x: 100,
            opacity: 0,
            ease: 'power2.out'
        });
    });

    // Bento grid animation
    gsap.from('.bento-item', {
        scrollTrigger: {
            trigger: '.bento-grid',
            start: 'top 80%'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Document cards animation
    gsap.from('.document-card', {
        scrollTrigger: {
            trigger: '.document-types-section',
            start: 'top 80%'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Testimonial cards animation
    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 80%'
        },
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });
}

/**
 * Initialize micro-interactions
 */
function initializeMicroInteractions() {
    // Button hover effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mousedown', function() {
            gsap.to(this, {
                duration: 0.1,
                scale: 0.95,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseup', function() {
            gsap.to(this, {
                duration: 0.2,
                scale: 1.05,
                ease: 'power2.out'
            });
        });
    });

    // Card hover effects
    document.querySelectorAll('.neumorphism, .document-card, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -10,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                ease: 'power2.out'
            });
        });
    });

    // Feature icon hover effects
    document.querySelectorAll('.feature-icon, .document-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                rotation: 10,
                scale: 1.1,
                ease: 'power2.out'
            });
        });

        icon.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                rotation: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Floating icons continuous animation
    document.querySelectorAll('.floating-icon').forEach((icon, index) => {
        gsap.to(icon, {
            duration: 3 + index,
            y: -20,
            rotation: 360,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.5
        });
    });

    // Neural network animation
    document.querySelectorAll('.node').forEach((node, index) => {
        gsap.to(node, {
            duration: 2,
            scale: 1.5,
            opacity: 1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3
        });
    });
}

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    // Navbar scroll behavior
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
            gsap.to(navbar, {
                duration: 0.3,
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                ease: 'power2.out'
            });
        } else {
            navbar.classList.remove('scrolled');
            gsap.to(navbar, {
                duration: 0.3,
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(20px)',
                ease: 'power2.out'
            });
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            gsap.to(navbar, {
                duration: 0.3,
                y: -100,
                ease: 'power2.out'
            });
        } else {
            // Scrolling up
            gsap.to(navbar, {
                duration: 0.3,
                y: 0,
                ease: 'power2.out'
            });
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: target,
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // Mobile menu toggle animation
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                gsap.to(navbarCollapse, {
                    duration: 0.3,
                    height: 0,
                    opacity: 0,
                    ease: 'power2.out'
                });
            } else {
                gsap.fromTo(navbarCollapse, 
                    { height: 0, opacity: 0 },
                    { 
                        duration: 0.3,
                        height: 'auto',
                        opacity: 1,
                        ease: 'power2.out'
                    }
                );
            }
        });
    }
}

/**
 * Initialize carousel functionality
 */
function initializeCarousels() {
    // Logo carousel
    const logoTrack = document.querySelector('.logo-track');
    if (logoTrack) {
        // Clone logos for seamless loop
        const logos = logoTrack.innerHTML;
        logoTrack.innerHTML += logos;
        
        gsap.to(logoTrack, {
            duration: 30,
            x: '-50%',
            repeat: -1,
            ease: 'none'
        });
    }

    // Testimonial carousel
    const testimonialTrack = document.querySelector('.testimonial-track');
    if (testimonialTrack) {
        // Clone testimonials for seamless loop
        const testimonials = testimonialTrack.innerHTML;
        testimonialTrack.innerHTML += testimonials;
        
        gsap.to(testimonialTrack, {
            duration: 40,
            x: '-50%',
            repeat: -1,
            ease: 'none'
        });

        // Pause on hover
        testimonialTrack.addEventListener('mouseenter', function() {
            gsap.globalTimeline.pause();
        });

        testimonialTrack.addEventListener('mouseleave', function() {
            gsap.globalTimeline.resume();
        });
    }
}

/**
 * Initialize form handlers
 */
function initializeFormHandlers() {
    // Newsletter signup
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate API call
            showNotification('Thank you for subscribing!', 'success');
            this.reset();
        });
    }

    // Contact form
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="loading-spinner"></div> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Input focus animations
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.02,
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                boxShadow: 'none',
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Initialize parallax effects
 */
function initializeParallax() {
    // Background parallax
    gsap.to('.animated-background', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -200,
        ease: 'none'
    });

    // Floating elements parallax
    document.querySelectorAll('.floating-icon').forEach((icon, index) => {
        gsap.to(icon, {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -100 * (index + 1),
            rotation: 180 * (index + 1),
            ease: 'none'
        });
    });

    // Document preview parallax
    gsap.to('.document-preview', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -150,
        rotation: -5,
        ease: 'none'
    });
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--gradient-success)' : 'var(--gradient-primary)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    gsap.to(notification, {
        duration: 0.3,
        x: -400,
        ease: 'power2.out'
    });

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', function() {
        gsap.to(notification, {
            duration: 0.3,
            x: 400,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            gsap.to(notification, {
                duration: 0.3,
                x: 400,
                ease: 'power2.in',
                onComplete: () => notification.remove()
            });
        }
    }, 5000);
}

/**
 * Initialize typing animation
 */
function initializeTypingAnimation(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

/**
 * Initialize counter animation
 */
function animateCounter(element, target, duration = 2000) {
    const obj = { value: 0 };
    
    gsap.to(obj, {
        duration: duration / 1000,
        value: target,
        ease: 'power2.out',
        onUpdate: function() {
            element.textContent = Math.round(obj.value).toLocaleString();
        }
    });
}

/**
 * Initialize counters when they come into view
 */
function initializeCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => animateCounter(counter, target)
        });
    });
}

/**
 * Initialize page transitions
 */
function initializePageTransitions() {
    // Page load animation
    gsap.from('body', {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.out'
    });

    // Link click transitions
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            gsap.to('body', {
                duration: 0.3,
                opacity: 0,
                ease: 'power2.in',
                onComplete: () => {
                    window.location.href = href;
                }
            });
        });
    });
}

/**
 * Initialize scroll progress indicator
 */
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Initialize lazy loading for images
 */
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Initialize theme switcher (if needed)
 */
function initializeThemeSwitcher() {
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
    initializePageTransitions();
    initializeScrollProgress();
    initializeLazyLoading();
    initializeThemeSwitcher();
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
const optimizedScrollHandler = debounce(function() {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
