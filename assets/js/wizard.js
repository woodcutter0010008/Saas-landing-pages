/**
 * Document Generator Wizard JavaScript
 * Handles step-by-step document creation process
 */

// Wizard state management
let wizardState = {
    currentStep: 1,
    totalSteps: 5,
    selectedDocumentType: null,
    formData: {},
    isGenerating: false
};

// Document type configurations
const documentTypes = {
    nda: {
        name: 'Non-Disclosure Agreement',
        fields: [
            { name: 'disclosingParty', label: 'Disclosing Party', type: 'text', required: true },
            { name: 'receivingParty', label: 'Receiving Party', type: 'text', required: true },
            { name: 'purpose', label: 'Purpose of Disclosure', type: 'textarea', required: true },
            { name: 'duration', label: 'Agreement Duration (months)', type: 'number', required: true },
            { name: 'returnInfo', label: 'Return of Information Required', type: 'checkbox', required: false }
        ]
    },
    contract: {
        name: 'Service Agreement',
        fields: [
            { name: 'serviceProvider', label: 'Service Provider', type: 'text', required: true },
            { name: 'client', label: 'Client', type: 'text', required: true },
            { name: 'serviceDescription', label: 'Service Description', type: 'textarea', required: true },
            { name: 'paymentTerms', label: 'Payment Terms', type: 'select', options: ['Net 30', 'Net 15', 'Upon completion', 'Monthly'], required: true },
            { name: 'contractValue', label: 'Contract Value ($)', type: 'number', required: true }
        ]
    },
    employment: {
        name: 'Employment Contract',
        fields: [
            { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
            { name: 'position', label: 'Job Position', type: 'text', required: true },
            { name: 'salary', label: 'Annual Salary ($)', type: 'number', required: true },
            { name: 'startDate', label: 'Start Date', type: 'date', required: true },
            { name: 'benefits', label: 'Benefits Package', type: 'textarea', required: false }
        ]
    },
    privacy: {
        name: 'Privacy Policy',
        fields: [
            { name: 'websiteUrl', label: 'Website URL', type: 'url', required: true },
            { name: 'dataTypes', label: 'Types of Data Collected', type: 'textarea', required: true },
            { name: 'cookiesUsed', label: 'Cookies Used', type: 'checkbox', required: false },
            { name: 'thirdPartyServices', label: 'Third-party Services', type: 'textarea', required: false },
            { name: 'gdprCompliant', label: 'GDPR Compliance Required', type: 'checkbox', required: false }
        ]
    },
    terms: {
        name: 'Terms of Service',
        fields: [
            { name: 'serviceName', label: 'Service/App Name', type: 'text', required: true },
            { name: 'serviceType', label: 'Service Type', type: 'select', options: ['Website', 'Mobile App', 'SaaS Platform', 'E-commerce'], required: true },
            { name: 'userObligations', label: 'User Obligations', type: 'textarea', required: true },
            { name: 'prohibitedUses', label: 'Prohibited Uses', type: 'textarea', required: true },
            { name: 'terminationPolicy', label: 'Termination Policy', type: 'textarea', required: true }
        ]
    },
    will: {
        name: 'Last Will & Testament',
        fields: [
            { name: 'testatorName', label: 'Your Full Name', type: 'text', required: true },
            { name: 'executor', label: 'Executor Name', type: 'text', required: true },
            { name: 'beneficiaries', label: 'Beneficiaries', type: 'textarea', required: true },
            { name: 'assets', label: 'Assets Description', type: 'textarea', required: true },
            { name: 'guardianship', label: 'Guardian for Minor Children', type: 'text', required: false }
        ]
    }
};

// Initialize wizard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWizard();
    setupEventListeners();
    updateProgressBar();
});

/**
 * Initialize the wizard
 */
function initializeWizard() {
    // Set initial step
    showStep(1);
    
    // Initialize document type cards
    setupDocumentTypeCards();
    
    // Initialize form validation
    setupFormValidation();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('nextBtn').addEventListener('click', nextStep);
    document.getElementById('prevBtn').addEventListener('click', prevStep);
    
    // Document type selection
    document.querySelectorAll('.document-type-card').forEach(card => {
        card.addEventListener('click', function() {
            selectDocumentType(this.dataset.type);
        });
    });
    
    // Form inputs
    document.addEventListener('input', function(e) {
        if (e.target.matches('input, textarea, select')) {
            saveFormData(e.target);
        }
    });
    
    // Modal events
    document.getElementById('previewBtn')?.addEventListener('click', showPreview);
    document.getElementById('downloadBtn')?.addEventListener('click', downloadDocument);
    document.getElementById('editBtn')?.addEventListener('click', editDocument);
}

/**
 * Setup document type cards
 */
function setupDocumentTypeCards() {
    const cards = document.querySelectorAll('.document-type-card');
    
    cards.forEach(card => {
        // Add hover animations
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -10,
                scale: 1.02,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                gsap.to(this, {
                    duration: 0.3,
                    y: 0,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
        });
    });
}

/**
 * Select document type
 */
function selectDocumentType(type) {
    // Remove previous selection
    document.querySelectorAll('.document-type-card').forEach(card => {
        card.classList.remove('selected');
        gsap.to(card, {
            duration: 0.3,
            y: 0,
            scale: 1,
            ease: 'power2.out'
        });
    });
    
    // Select new type
    const selectedCard = document.querySelector(`[data-type="${type}"]`);
    selectedCard.classList.add('selected');
    
    gsap.to(selectedCard, {
        duration: 0.3,
        y: -10,
        scale: 1.05,
        ease: 'back.out(1.7)'
    });
    
    wizardState.selectedDocumentType = type;
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
    
    // Generate dynamic fields for step 3
    generateDocumentFields(type);
}

/**
 * Generate dynamic fields based on document type
 */
function generateDocumentFields(type) {
    const container = document.getElementById('detailsContainer');
    const config = documentTypes[type];
    
    if (!config) return;
    
    let html = `
        <div class="detail-section">
            <h3><i class="fas fa-file-alt"></i> ${config.name} Details</h3>
            <div class="row">
    `;
    
    config.fields.forEach((field, index) => {
        const colClass = field.type === 'textarea' ? 'col-12' : 'col-md-6';
        
        html += `
            <div class="${colClass}">
                <div class="form-group">
                    <label for="${field.name}">${field.label}${field.required ? ' *' : ''}</label>
        `;
        
        switch (field.type) {
            case 'textarea':
                html += `<textarea id="${field.name}" name="${field.name}" class="form-control neumorphism-input" rows="4" ${field.required ? 'required' : ''}></textarea>`;
                break;
            case 'select':
                html += `<select id="${field.name}" name="${field.name}" class="form-control neumorphism-input" ${field.required ? 'required' : ''}>
                    <option value="">Select ${field.label}</option>`;
                field.options.forEach(option => {
                    html += `<option value="${option}">${option}</option>`;
                });
                html += `</select>`;
                break;
            case 'checkbox':
                html += `
                    <div class="custom-checkbox">
                        <input type="checkbox" id="${field.name}" name="${field.name}">
                        <span class="checkmark"></span>
                        <label for="${field.name}">${field.label}</label>
                    </div>
                `;
                break;
            default:
                html += `<input type="${field.type}" id="${field.name}" name="${field.name}" class="form-control neumorphism-input" ${field.required ? 'required' : ''}>`;
        }
        
        html += `
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Add animations to new fields
    gsap.from(container.children, {
        duration: 0.5,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

/**
 * Show specific step
 */
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.wizard-step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step${step}`).classList.add('active');
    
    // Update step indicators
    updateStepIndicators(step);
    
    // Update navigation buttons
    updateNavigationButtons(step);
    
    // Update progress bar
    updateProgressBar();
    
    wizardState.currentStep = step;
}

/**
 * Update step indicators
 */
function updateStepIndicators(currentStep) {
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNumber = index + 1;
        
        step.classList.remove('active', 'completed');
        
        if (stepNumber === currentStep) {
            step.classList.add('active');
        } else if (stepNumber < currentStep) {
            step.classList.add('completed');
        }
    });
}

/**
 * Update navigation buttons
 */
function updateNavigationButtons(step) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Previous button
    if (step === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-flex';
    }
    
    // Next button
    if (step === wizardState.totalSteps) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'inline-flex';
        
        // Update button text based on step
        if (step === wizardState.totalSteps - 1) {
            nextBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Document';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
    }
}

/**
 * Update progress bar
 */
function updateProgressBar() {
    const progress = (wizardState.currentStep / wizardState.totalSteps) * 100;
    const progressFill = document.getElementById('progressFill');
    
    gsap.to(progressFill, {
        duration: 0.5,
        width: `${progress}%`,
        ease: 'power2.out'
    });
}

/**
 * Next step
 */
function nextStep() {
    if (!validateCurrentStep()) {
        return;
    }
    
    if (wizardState.currentStep < wizardState.totalSteps) {
        // Special handling for step 4 (review) -> step 5 (generate)
        if (wizardState.currentStep === 4) {
            startDocumentGeneration();
        } else {
            showStep(wizardState.currentStep + 1);
        }
        
        // Update review data if moving to step 4
        if (wizardState.currentStep === 4) {
            updateReviewData();
        }
    }
}

/**
 * Previous step
 */
function prevStep() {
    if (wizardState.currentStep > 1) {
        showStep(wizardState.currentStep - 1);
    }
}

/**
 * Validate current step
 */
function validateCurrentStep() {
    const currentStep = wizardState.currentStep;
    
    switch (currentStep) {
        case 1:
            if (!wizardState.selectedDocumentType) {
                showNotification('Please select a document type', 'error');
                return false;
            }
            break;
            
        case 2:
            const requiredFields = ['companyName', 'contactPerson', 'email', 'jurisdiction'];
            for (let field of requiredFields) {
                const input = document.getElementById(field);
                if (!input || !input.value.trim()) {
                    showNotification(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
                    input?.focus();
                    return false;
                }
            }
            break;
            
        case 3:
            const config = documentTypes[wizardState.selectedDocumentType];
            if (config) {
                for (let field of config.fields) {
                    if (field.required) {
                        const input = document.getElementById(field.name);
                        if (!input || !input.value.trim()) {
                            showNotification(`Please fill in ${field.label}`, 'error');
                            input?.focus();
                            return false;
                        }
                    }
                }
            }
            break;
    }
    
    return true;
}

/**
 * Save form data
 */
function saveFormData(input) {
    const value = input.type === 'checkbox' ? input.checked : input.value;
    wizardState.formData[input.name || input.id] = value;
}

/**
 * Update review data
 */
function updateReviewData() {
    // Update company information
    document.getElementById('reviewCompanyName').textContent = wizardState.formData.companyName || '-';
    document.getElementById('reviewContactPerson').textContent = wizardState.formData.contactPerson || '-';
    document.getElementById('reviewEmail').textContent = wizardState.formData.email || '-';
    document.getElementById('reviewPhone').textContent = wizardState.formData.phone || '-';
    
    // Update document details
    const reviewDetails = document.getElementById('reviewDetails');
    const config = documentTypes[wizardState.selectedDocumentType];
    
    if (config) {
        let html = '<div class="review-grid">';
        
        config.fields.forEach(field => {
            const value = wizardState.formData[field.name];
            if (value) {
                html += `
                    <div class="review-item">
                        <label>${field.label}:</label>
                        <span>${typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</span>
                    </div>
                `;
            }
        });
        
        html += '</div>';
        reviewDetails.innerHTML = html;
    }
}

/**
 * Start document generation
 */
function startDocumentGeneration() {
    showStep(5);
    wizardState.isGenerating = true;
    
    // Simulate document generation process
    const statusMessages = [
        'Analyzing your requirements...',
        'Selecting appropriate legal templates...',
        'Customizing document content...',
        'Ensuring legal compliance...',
        'Finalizing document structure...',
        'Generating PDF document...'
    ];
    
    let currentMessage = 0;
    let progress = 0;
    
    const updateProgress = () => {
        if (currentMessage < statusMessages.length) {
            document.getElementById('statusMessage').textContent = statusMessages[currentMessage];
            progress = ((currentMessage + 1) / statusMessages.length) * 100;
            
            gsap.to('#generationProgress', {
                duration: 0.5,
                width: `${progress}%`,
                ease: 'power2.out'
            });
            
            document.getElementById('progressText').textContent = `${Math.round(progress)}%`;
            
            currentMessage++;
            
            setTimeout(updateProgress, 1500 + Math.random() * 1000);
        } else {
            completeGeneration();
        }
    };
    
    updateProgress();
}

/**
 * Complete document generation
 */
function completeGeneration() {
    wizardState.isGenerating = false;
    
    // Hide generation status
    document.getElementById('generationStatus').style.display = 'none';
    
    // Show completion
    const completionEl = document.getElementById('generationComplete');
    completionEl.style.display = 'block';
    
    // Animate completion
    gsap.from(completionEl.children, {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });
    
    // Store generated document data
    wizardState.generatedDocument = {
        type: wizardState.selectedDocumentType,
        data: wizardState.formData,
        generatedAt: new Date(),
        filename: `${documentTypes[wizardState.selectedDocumentType].name.replace(/\s+/g, '_')}_${Date.now()}.pdf`
    };
}

/**
 * Show document preview
 */
function showPreview() {
    const modal = new bootstrap.Modal(document.getElementById('previewModal'));
    const previewContent = document.getElementById('documentPreview');
    
    // Generate preview content
    const previewHTML = generatePreviewHTML();
    previewContent.innerHTML = previewHTML;
    
    modal.show();
}

/**
 * Generate preview HTML
 */
function generatePreviewHTML() {
    const config = documentTypes[wizardState.selectedDocumentType];
    const data = wizardState.formData;
    
    let html = `
        <div style="max-width: 800px; margin: 0 auto; padding: 40px; font-family: 'Times New Roman', serif; line-height: 1.6; color: #333;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="font-size: 24px; margin-bottom: 10px;">${config.name}</h1>
                <p style="color: #666; margin: 0;">Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="font-size: 18px; border-bottom: 2px solid #333; padding-bottom: 5px;">Parties</h2>
                <p><strong>Company:</strong> ${data.companyName || '[Company Name]'}</p>
                <p><strong>Contact:</strong> ${data.contactPerson || '[Contact Person]'}</p>
                <p><strong>Email:</strong> ${data.email || '[Email Address]'}</p>
                <p><strong>Address:</strong> ${data.address || '[Business Address]'}</p>
            </div>
    `;
    
    // Add document-specific content
    if (config.fields) {
        html += '<div style="margin-bottom: 30px;"><h2 style="font-size: 18px; border-bottom: 2px solid #333; padding-bottom: 5px;">Terms and Conditions</h2>';
        
        config.fields.forEach(field => {
            const value = data[field.name];
            if (value) {
                html += `<p><strong>${field.label}:</strong> ${typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</p>`;
            }
        });
        
        html += '</div>';
    }
    
    html += `
            <div style="margin-top: 50px; border-top: 1px solid #ccc; padding-top: 20px;">
                <p style="font-size: 12px; color: #666; text-align: center;">
                    This document was generated by LegalAI Pro and is legally binding when properly executed.
                </p>
            </div>
        </div>
    `;
    
    return html;
}

/**
 * Download document
 */
function downloadDocument() {
    // Simulate document download
    const filename = wizardState.generatedDocument?.filename || 'legal_document.pdf';
    
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = '#'; // In a real implementation, this would be the actual PDF URL
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Document downloaded successfully!', 'success');
}

/**
 * Edit document
 */
function editDocument() {
    // Go back to step 3 for editing
    showStep(3);
}

/**
 * Setup form validation
 */
function setupFormValidation() {
    // Real-time validation for email
    document.getElementById('email')?.addEventListener('input', function() {
        const email = this.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '';
        }
    });
    
    // Real-time validation for phone
    document.getElementById('phone')?.addEventListener('input', function() {
        const phone = this.value;
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        
        if (phone && !phoneRegex.test(phone.replace(/\D/g, ''))) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '';
        }
    });
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
        alert(message);
    }
}

/**
 * Auto-save functionality
 */
function setupAutoSave() {
    setInterval(() => {
        if (wizardState.formData && Object.keys(wizardState.formData).length > 0) {
            localStorage.setItem('wizardState', JSON.stringify(wizardState));
        }
    }, 30000); // Auto-save every 30 seconds
}

/**
 * Load saved state
 */
function loadSavedState() {
    const saved = localStorage.getItem('wizardState');
    if (saved) {
        try {
            const savedState = JSON.parse(saved);
            // Restore form data
            Object.keys(savedState.formData || {}).forEach(key => {
                const input = document.getElementById(key);
                if (input) {
                    if (input.type === 'checkbox') {
                        input.checked = savedState.formData[key];
                    } else {
                        input.value = savedState.formData[key];
                    }
                }
            });
            
            // Restore selected document type
            if (savedState.selectedDocumentType) {
                selectDocumentType(savedState.selectedDocumentType);
            }
        } catch (e) {
            console.error('Error loading saved state:', e);
        }
    }
}

// Initialize auto-save and load saved state
document.addEventListener('DOMContentLoaded', function() {
    setupAutoSave();
    loadSavedState();
});

// Export for use in other files
window.wizardState = wizardState;
window.documentTypes = documentTypes;
