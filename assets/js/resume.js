/**
 * Resume Builder JavaScript
 * Handles resume building functionality and interactions
 */

// Resume builder state
let resumeState = {
    currentSection: 'personal',
    formData: {},
    selectedTemplate: 'modern',
    zoomLevel: 100
};

// Initialize resume builder
document.addEventListener('DOMContentLoaded', function() {
    initializeResumeBuilder();
    setupEventListeners();
    setupTemplateFiltering();
    setupFormHandlers();
    setupPreviewUpdates();
});

/**
 * Initialize resume builder
 */
function initializeResumeBuilder() {
    // Animate hero elements
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
        .from('.hero-features .feature-item', {
            duration: 0.5,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.2');

    // Animate resume preview
    gsap.from('.resume-preview', {
        duration: 1.2,
        x: 100,
        opacity: 0,
        rotation: 10,
        ease: 'power3.out',
        delay: 0.8
    });

    // Animate AI suggestions
    gsap.from('.ai-suggestions', {
        duration: 1,
        scale: 0,
        opacity: 0,
        ease: 'back.out(1.7)',
        delay: 1.5
    });
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Section tab navigation
    document.querySelectorAll('.section-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const section = this.dataset.section;
            switchSection(section);
        });
    });

    // Zoom controls
    document.getElementById('zoomIn')?.addEventListener('click', function() {
        adjustZoom(10);
    });

    document.getElementById('zoomOut')?.addEventListener('click', function() {
        adjustZoom(-10);
    });

    // Download and share buttons
    document.querySelectorAll('[data-action="download"]').forEach(btn => {
        btn.addEventListener('click', downloadResume);
    });

    document.querySelectorAll('[data-action="share"]').forEach(btn => {
        btn.addEventListener('click', shareResume);
    });

    // Template selection
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', function() {
            selectTemplate(this.dataset.template);
        });
    });
}

/**
 * Setup template filtering
 */
function setupTemplateFiltering() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const templateCards = document.querySelectorAll('.template-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active tab
            tabBtns.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            
            // Filter templates
            templateCards.forEach(card => {
                const cardCategory = card.dataset.category;
                
                if (category === 'all' || cardCategory === category) {
                    gsap.to(card, {
                        duration: 0.3,
                        opacity: 1,
                        scale: 1,
                        display: 'block',
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(card, {
                        duration: 0.3,
                        opacity: 0,
                        scale: 0.8,
                        ease: 'power2.out',
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    // Template card hover effects
    templateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -10,
                scale: 1.02,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Setup form handlers
 */
function setupFormHandlers() {
    // Form input listeners
    document.addEventListener('input', function(e) {
        if (e.target.matches('input, textarea, select')) {
            saveFormData(e.target);
            updatePreview();
            updateCompletionProgress();
        }
    });

    // Real-time validation
    setupFormValidation();
    
    // Auto-save functionality
    setupAutoSave();
}

/**
 * Setup preview updates
 */
function setupPreviewUpdates() {
    // Initial preview update
    updatePreview();
    
    // Animate preview elements
    gsap.from('.live-resume-preview', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.5
    });
}

/**
 * Switch between form sections
 */
function switchSection(sectionName) {
    // Update active tab
    document.querySelectorAll('.section-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    // Update form section
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`${sectionName}-form`);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Animate section change
        gsap.from(targetSection, {
            duration: 0.5,
            x: 30,
            opacity: 0,
            ease: 'power2.out'
        });
    }
    
    resumeState.currentSection = sectionName;
}

/**
 * Adjust zoom level
 */
function adjustZoom(delta) {
    resumeState.zoomLevel = Math.max(50, Math.min(200, resumeState.zoomLevel + delta));
    
    const preview = document.querySelector('.live-resume-preview');
    const zoomDisplay = document.querySelector('.zoom-level');
    
    if (preview) {
        gsap.to(preview, {
            duration: 0.3,
            scale: resumeState.zoomLevel / 100,
            ease: 'power2.out'
        });
    }
    
    if (zoomDisplay) {
        zoomDisplay.textContent = `${resumeState.zoomLevel}%`;
    }
}

/**
 * Save form data
 */
function saveFormData(input) {
    const value = input.type === 'checkbox' ? input.checked : input.value;
    resumeState.formData[input.name || input.id] = value;
    
    // Save to localStorage
    localStorage.setItem('resumeBuilderState', JSON.stringify(resumeState));
}

/**
 * Update live preview
 */
function updatePreview() {
    const namePreview = document.querySelector('.name-preview');
    const titlePreview = document.querySelector('.title-preview');
    const contactPreview = document.querySelector('.contact-preview');
    const summaryPreview = document.querySelector('.summary-preview');
    
    // Update name
    if (namePreview && resumeState.formData.fullName) {
        namePreview.textContent = resumeState.formData.fullName;
    }
    
    // Update title
    if (titlePreview && resumeState.formData.professionalTitle) {
        titlePreview.textContent = resumeState.formData.professionalTitle;
    }
    
    // Update contact info
    if (contactPreview) {
        const contactInfo = [];
        if (resumeState.formData.email) contactInfo.push(resumeState.formData.email);
        if (resumeState.formData.phone) contactInfo.push(resumeState.formData.phone);
        if (resumeState.formData.location) contactInfo.push(resumeState.formData.location);
        
        contactPreview.innerHTML = contactInfo.map(info => `<span>${info}</span>`).join('');
    }
    
    // Update summary
    if (summaryPreview && resumeState.formData.professionalSummary) {
        summaryPreview.textContent = resumeState.formData.professionalSummary;
    }
    
    // Animate preview update
    gsap.from('.resume-page', {
        duration: 0.3,
        scale: 0.98,
        ease: 'power2.out'
    });
}

/**
 * Update completion progress
 */
function updateCompletionProgress() {
    const sections = {
        personal: ['fullName', 'professionalTitle', 'email', 'phone'],
        experience: ['jobTitle', 'company', 'jobDescription'],
        education: ['degree', 'school'],
        skills: ['skills'],
        projects: ['projectName', 'projectDescription']
    };
    
    Object.keys(sections).forEach(sectionName => {
        const requiredFields = sections[sectionName];
        const completedFields = requiredFields.filter(field => 
            resumeState.formData[field] && resumeState.formData[field].trim()
        );
        
        const percentage = Math.round((completedFields.length / requiredFields.length) * 100);
        
        const progressCircle = document.querySelector(`[data-section="${sectionName}"] .progress-circle span`);
        if (progressCircle) {
            progressCircle.textContent = `${percentage}%`;
            
            // Update circle progress
            const circle = progressCircle.parentElement;
            circle.style.setProperty('--progress', percentage);
        }
    });
}

/**
 * Select template
 */
function selectTemplate(templateName) {
    resumeState.selectedTemplate = templateName;
    
    // Update template selection UI
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    const selectedCard = document.querySelector(`[data-template="${templateName}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        
        // Animate selection
        gsap.to(selectedCard, {
            duration: 0.3,
            scale: 1.05,
            ease: 'back.out(1.7)'
        });
    }
    
    // Update preview with new template
    updatePreviewTemplate();
}

/**
 * Update preview template
 */
function updatePreviewTemplate() {
    const preview = document.querySelector('.live-resume-preview');
    
    // Apply template-specific styling
    const templates = {
        modern: {
            fontFamily: 'Inter, sans-serif',
            primaryColor: '#6366f1',
            headerStyle: 'modern'
        },
        classic: {
            fontFamily: 'Times New Roman, serif',
            primaryColor: '#333',
            headerStyle: 'classic'
        },
        creative: {
            fontFamily: 'Poppins, sans-serif',
            primaryColor: '#f59e0b',
            headerStyle: 'creative'
        }
    };
    
    const template = templates[resumeState.selectedTemplate] || templates.modern;
    
    if (preview) {
        preview.style.fontFamily = template.fontFamily;
        preview.style.setProperty('--template-color', template.primaryColor);
        
        // Animate template change
        gsap.from(preview, {
            duration: 0.5,
            scale: 0.9,
            opacity: 0.5,
            ease: 'power2.out'
        });
    }
}

/**
 * Download resume
 */
function downloadResume() {
    // Simulate PDF generation
    const loadingBtn = event.target;
    const originalText = loadingBtn.innerHTML;
    
    loadingBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    loadingBtn.disabled = true;
    
    setTimeout(() => {
        // Create download link
        const link = document.createElement('a');
        link.href = '#'; // In real implementation, this would be the PDF URL
        link.download = `${resumeState.formData.fullName || 'Resume'}_Resume.pdf`;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset button
        loadingBtn.innerHTML = originalText;
        loadingBtn.disabled = false;
        
        // Show success message
        showNotification('Resume downloaded successfully!', 'success');
    }, 2000);
}

/**
 * Share resume
 */
function shareResume() {
    if (navigator.share) {
        navigator.share({
            title: 'My Resume',
            text: 'Check out my professional resume',
            url: window.location.href
        });
    } else {
        // Fallback: copy link to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Resume link copied to clipboard!', 'success');
        });
    }
}

/**
 * Setup form validation
 */
function setupFormValidation() {
    // Email validation
    document.addEventListener('input', function(e) {
        if (e.target.type === 'email') {
            const email = e.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                e.target.style.borderColor = '#ef4444';
                showValidationError(e.target, 'Please enter a valid email address');
            } else {
                e.target.style.borderColor = '';
                hideValidationError(e.target);
            }
        }
        
        // Phone validation
        if (e.target.type === 'tel') {
            const phone = e.target.value;
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            
            if (phone && !phoneRegex.test(phone.replace(/\D/g, ''))) {
                e.target.style.borderColor = '#ef4444';
                showValidationError(e.target, 'Please enter a valid phone number');
            } else {
                e.target.style.borderColor = '';
                hideValidationError(e.target);
            }
        }
    });
}

/**
 * Show validation error
 */
function showValidationError(input, message) {
    let errorElement = input.parentNode.querySelector('.validation-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'validation-error';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        `;
        input.parentNode.appendChild(errorElement);
    }
    
    errorElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
}

/**
 * Hide validation error
 */
function hideValidationError(input) {
    const errorElement = input.parentNode.querySelector('.validation-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Setup auto-save
 */
function setupAutoSave() {
    setInterval(() => {
        if (Object.keys(resumeState.formData).length > 0) {
            localStorage.setItem('resumeBuilderState', JSON.stringify(resumeState));
        }
    }, 30000); // Auto-save every 30 seconds
}

/**
 * Load saved state
 */
function loadSavedState() {
    const saved = localStorage.getItem('resumeBuilderState');
    if (saved) {
        try {
            const savedState = JSON.parse(saved);
            resumeState = { ...resumeState, ...savedState };
            
            // Restore form data
            Object.keys(resumeState.formData).forEach(key => {
                const input = document.getElementById(key) || document.querySelector(`[name="${key}"]`);
                if (input) {
                    if (input.type === 'checkbox') {
                        input.checked = resumeState.formData[key];
                    } else {
                        input.value = resumeState.formData[key];
                    }
                }
            });
            
            // Update preview and progress
            updatePreview();
            updateCompletionProgress();
            
        } catch (e) {
            console.error('Error loading saved state:', e);
        }
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Use the notification function from main.js if available
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        // Fallback notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#6366f1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 500;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

/**
 * Initialize AI suggestions
 */
function initializeAISuggestions() {
    const suggestions = [
        "Add quantified achievements to your experience",
        "Include relevant keywords for your industry",
        "Keep your summary concise and impactful",
        "Use action verbs to describe your accomplishments",
        "Tailor your skills to the job you're applying for"
    ];
    
    let currentSuggestion = 0;
    
    setInterval(() => {
        const aiMessage = document.querySelector('.ai-message p');
        if (aiMessage) {
            currentSuggestion = (currentSuggestion + 1) % suggestions.length;
            
            gsap.to(aiMessage, {
                duration: 0.3,
                opacity: 0,
                onComplete: () => {
                    aiMessage.innerHTML = `💡 <strong>AI Tip:</strong> ${suggestions[currentSuggestion]}`;
                    gsap.to(aiMessage, {
                        duration: 0.3,
                        opacity: 1
                    });
                }
            });
        }
    }, 10000); // Change suggestion every 10 seconds
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadSavedState();
    initializeAISuggestions();
    
    // Animate scroll-triggered elements
    gsap.from('.template-card', {
        scrollTrigger: {
            trigger: '.templates-section',
            start: 'top 80%'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.resume-features',
            start: 'top 80%'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
});

// Export for use in other files
window.resumeState = resumeState;
