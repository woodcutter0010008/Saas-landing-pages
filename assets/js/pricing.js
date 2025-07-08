/**
 * Pricing Page JavaScript
 * Handles billing toggle and pricing animations
 */

document.addEventListener('DOMContentLoaded', function() {
    initializePricingPage();
});

/**
 * Initialize pricing page functionality
 */
function initializePricingPage() {
    setupBillingToggle();
    setupPricingAnimations();
    setupAccordion();
}

/**
 * Setup billing toggle functionality
 */
function setupBillingToggle() {
    const billingToggle = document.getElementById('billingToggle');
    const priceAmounts = document.querySelectorAll('.amount');
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            
            priceAmounts.forEach(amount => {
                const monthlyPrice = amount.dataset.monthly;
                const annualPrice = amount.dataset.annual;
                const newPrice = isAnnual ? annualPrice : monthlyPrice;
                
                // Animate price change
                gsap.to(amount, {
                    duration: 0.3,
                    scale: 1.1,
                    ease: 'power2.out',
                    onComplete: function() {
                        amount.textContent = newPrice;
                        gsap.to(amount, {
                            duration: 0.3,
                            scale: 1,
                            ease: 'power2.out'
                        });
                    }
                });
            });
            
            // Update period text
            const periods = document.querySelectorAll('.period');
            periods.forEach(period => {
                period.textContent = isAnnual ? '/year' : '/month';
            });
        });
    }
}

/**
 * Setup pricing card animations
 */
function setupPricingAnimations() {
    // Animate pricing cards on scroll
    gsap.from('.pricing-card', {
        scrollTrigger: {
            trigger: '.pricing-section',
            start: 'top 80%'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    // Animate comparison table
    gsap.from('.comparison-table', {
        scrollTrigger: {
            trigger: '.comparison-section',
            start: 'top 80%'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    });
    
    // Pricing card hover effects
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('popular')) {
                gsap.to(this, {
                    duration: 0.3,
                    y: -10,
                    scale: 1.02,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                gsap.to(this, {
                    duration: 0.3,
                    y: 0,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Popular card special animation
    const popularCard = document.querySelector('.pricing-card.popular');
    if (popularCard) {
        gsap.to(popularCard, {
            duration: 2,
            y: -5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

/**
 * Setup accordion animations
 */
function setupAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-bs-target'));
            
            if (target) {
                // Animate accordion content
                if (target.classList.contains('show')) {
                    gsap.to(target, {
                        duration: 0.3,
                        height: 0,
                        ease: 'power2.out'
                    });
                } else {
                    gsap.fromTo(target, 
                        { height: 0 },
                        { 
                            duration: 0.3,
                            height: 'auto',
                            ease: 'power2.out'
                        }
                    );
                }
            }
        });
    });
}

// Add pricing-specific styles
const pricingStyles = `
    .billing-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-top: 2rem;
        padding: 1rem 2rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 50px;
        border: 1px solid var(--border-color);
        backdrop-filter: blur(10px);
        display: inline-flex;
    }
    
    .toggle-label {
        color: var(--light-text);
        font-weight: 500;
    }
    
    .discount-badge {
        background: var(--gradient-secondary);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-left: 0.5rem;
    }
    
    .pricing-section {
        background: var(--dark-bg);
    }
    
    .pricing-card {
        padding: 2.5rem 2rem;
        text-align: center;
        height: 100%;
        position: relative;
        transition: var(--transition-smooth);
    }
    
    .pricing-card.popular {
        transform: scale(1.05);
        border: 2px solid var(--primary-color);
    }
    
    .popular-badge {
        position: absolute;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--gradient-primary);
        color: white;
        padding: 0.5rem 1.5rem;
        border-radius: 25px;
        font-size: 0.875rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .plan-header {
        margin-bottom: 2rem;
    }
    
    .plan-icon {
        width: 80px;
        height: 80px;
        background: var(--gradient-primary);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: white;
        margin: 0 auto 1.5rem;
    }
    
    .plan-header h3 {
        color: var(--light-text);
        margin-bottom: 0.5rem;
    }
    
    .plan-header p {
        color: var(--gray-text);
        margin: 0;
    }
    
    .plan-price {
        margin-bottom: 2rem;
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: 0.25rem;
    }
    
    .currency {
        font-size: 1.5rem;
        color: var(--primary-color);
        font-weight: 600;
    }
    
    .amount {
        font-size: 4rem;
        font-weight: 800;
        color: var(--primary-color);
        line-height: 1;
    }
    
    .period {
        font-size: 1.125rem;
        color: var(--gray-text);
        font-weight: 500;
    }
    
    .plan-features {
        margin-bottom: 2rem;
        text-align: left;
    }
    
    .feature-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .feature-item:last-child {
        border-bottom: none;
    }
    
    .feature-item i {
        width: 20px;
        text-align: center;
        color: var(--primary-color);
    }
    
    .feature-item.disabled i {
        color: var(--gray-text);
    }
    
    .feature-item.disabled span {
        color: var(--gray-text);
        text-decoration: line-through;
    }
    
    .feature-item span {
        color: var(--light-text);
        font-weight: 500;
    }
    
    .comparison-section {
        background: var(--dark-surface);
    }
    
    .comparison-table-container {
        overflow-x: auto;
    }
    
    .comparison-table {
        padding: 2rem;
        border-radius: 20px;
    }
    
    .comparison-table table {
        margin: 0;
        color: var(--light-text);
    }
    
    .comparison-table th {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border-color);
        padding: 1rem;
        font-weight: 600;
        text-align: center;
    }
    
    .comparison-table td {
        border: 1px solid var(--border-color);
        padding: 1rem;
        text-align: center;
    }
    
    .faq-section {
        background: var(--dark-bg);
    }
    
    .accordion-item {
        background: transparent;
        border: none;
        border-radius: 16px !important;
        margin-bottom: 1rem;
    }
    
    .accordion-button {
        background: transparent;
        color: var(--light-text);
        border: none;
        padding: 1.5rem 2rem;
        font-weight: 600;
        border-radius: 16px !important;
    }
    
    .accordion-button:not(.collapsed) {
        background: rgba(255, 255, 255, 0.05);
        color: var(--primary-color);
        box-shadow: none;
    }
    
    .accordion-button:focus {
        box-shadow: none;
        border: none;
    }
    
    .accordion-body {
        padding: 0 2rem 1.5rem;
        color: var(--gray-text);
        line-height: 1.6;
    }
`;

// Inject pricing styles
const styleSheet = document.createElement('style');
styleSheet.textContent = pricingStyles;
document.head.appendChild(styleSheet);
