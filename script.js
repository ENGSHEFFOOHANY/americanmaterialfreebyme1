// Configuration - Update these values with your actual Google Form URL, WhatsApp group link, and Google Drive download link
const CONFIG = {
    googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeeZN7k5OIy6r9SOM-TMhVf3wHzipiGtCdIKhdp4K6QAk8NbA/viewform", // Replace with your actual Google Form URL
    whatsappGroupLink: "https://chat.whatsapp.com/Foj7XMESN1OBesSjkx7uhG", // Replace with your actual WhatsApp group invite link
    driveDownloadLink: "https://drive.google.com/drive/folders/1xAYgMPgPKLYW-s48UCGJZ2_knb0YEmJA?usp=drive_link", // Replace with your actual Google Drive link
    formTitle: "Your Form Title" // Replace with your actual form title
};

// DOM elements
const googleFormBtn = document.getElementById('google-form-btn');
const whatsappBtn = document.getElementById('whatsapp-btn');
const accessSection = document.getElementById('access-section');

// Step elements
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step1Status = document.getElementById('step-1-status');
const step2Status = document.getElementById('step-2-status');

// Progress elements
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// Google Form elements
const googleFormModal = document.getElementById('google-form-modal');
const googleFormIframe = document.getElementById('google-form-iframe');
const closeModal = document.querySelector('.close');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Clear all stored data on every visit to reset the steps
    localStorage.removeItem('step1Completed');
    localStorage.removeItem('step1CompletedAt');
    localStorage.removeItem('step2Completed');
    
    // Reset all step UI to initial state
    resetStepsToInitialState();
    

    
    // Add click event to Google Form button
    googleFormBtn.addEventListener('click', openGoogleForm);
    
    // Add click event to WhatsApp button
    whatsappBtn.addEventListener('click', handleWhatsAppClick);
    

    
    // Close modal events
    closeModal.addEventListener('click', closeGoogleForm);
    googleFormModal.addEventListener('click', function(e) {
        if (e.target === googleFormModal) {
            closeGoogleForm();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && googleFormModal.style.display === 'block') {
            closeGoogleForm();
        }
    });
    
    // Show welcome message
    showNotification('Welcome! Please complete both steps to get access.', 'info');
});

// Google Form Functions
function openGoogleForm() {
    console.log('Opening Google Form...');
    
    // Set the iframe source using the configured URL
    googleFormIframe.src = CONFIG.googleFormUrl;
    
    // Show the modal
    googleFormModal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Show notification
    showNotification('Please complete the form to get access!', 'info');
    
    // Add form submission listener
    setupFormSubmissionListener();
    
    console.log('Google Form modal opened');
}

function closeGoogleForm() {
    // Hide the modal
    googleFormModal.style.display = 'none';
    
    // Clear the iframe source to stop loading
    googleFormIframe.src = '';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function setupFormSubmissionListener() {
    console.log('Setting up form submission listener...');
    
    // Start a 15-second timer to automatically unlock step 2
    startFormCompletionTimer();
    
    // Show helpful instructions
    showNotification('Form opened! Step 2 will unlock automatically in 10 seconds.', 'info');
    
    // Add a helpful message in the modal
    addFormInstructions();
    
    console.log('Form submission listener setup complete');
}

function addFormInstructions() {
    // Instructions removed - no more blue instruction boxes
}

function startFormCompletionTimer() {
    // Create a countdown timer display in the modal
    const modalBody = document.querySelector('.modal-body');
    
    if (!modalBody) {
        console.error('Modal body not found!');
        return;
    }
    
    // Create timer section
    const timerSection = document.createElement('div');
    timerSection.style.cssText = `
        padding: 20px;
        background: #e3f2fd;
        border-radius: 10px;
        margin: 20px;
        text-align: center;
        border: 2px solid #2196f3;
    `;
    
    timerSection.innerHTML = `
        <h4 style="color: #1565c0; margin-bottom: 15px; font-size: 18px;">
            <i class="fas fa-clock"></i> Step 2 Unlock Timer
        </h4>
        <div style="font-size: 24px; font-weight: bold; color: #1976d2; margin-bottom: 15px;">
            <span id="countdown-timer">10</span> seconds
        </div>
        <p style="color: #1565c0; margin: 0; font-size: 14px;">
            Step 2 will unlock automatically when the timer reaches 0
        </p>
    `;
    
    // Insert after the iframe
    modalBody.appendChild(timerSection);
    
    // Start countdown
    let timeLeft = 10;
    const countdownElement = timerSection.querySelector('#countdown-timer');
    
    const countdown = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            
            // Update timer display
            timerSection.innerHTML = `
                <h4 style="color: #28a745; margin-bottom: 15px; font-size: 18px;">
                    <i class="fas fa-check-circle"></i> Step 2 Unlocked!
                </h4>
                <p style="color: #155724; margin: 0; font-size: 14px;">
                    You can now proceed to join the WhatsApp group
                </p>
            `;
            
            // Mark form as completed and unlock step 2
            markFormCompleted();
            
            // Show success notification
            showNotification('Step 2 unlocked! You can now join the WhatsApp group.', 'success');
        }
    }, 1000);
}

function markFormCompleted() {
    // Mark user as having completed step 1 (Google Form)
    localStorage.setItem('step1Completed', 'true');
    localStorage.setItem('step1CompletedAt', Date.now().toString());
    
    // Update step 1 UI
    step1.classList.add('completed');
    step1Status.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
    step1Status.className = 'step-status completed';
    
    // Enable step 2 (WhatsApp)
    step2.classList.add('active');
    step2.classList.remove('completed');
    whatsappBtn.disabled = false;
    step2Status.innerHTML = '<i class="fas fa-play-circle"></i> Ready';
    step2Status.className = 'step-status active';
    
    // Show success message
    showNotification('Google Form completed! Now join the WhatsApp group.', 'success');
    
    // Update progress
    updateProgress(50);
    
    // Automatically close the modal after a short delay
    setTimeout(() => {
        closeGoogleForm();
    }, 2000);
}









// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Handle WhatsApp button click
function handleWhatsAppClick() {
    // Show loading state
    whatsappBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';
    whatsappBtn.disabled = true;
    
    // Open WhatsApp group link in new tab
    const whatsappWindow = window.open(CONFIG.whatsappGroupLink, '_blank');
    
    // Start 20-second timer for WhatsApp completion
    startWhatsAppCompletionTimer();
    
    // Reset button
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Join WhatsApp Group';
    whatsappBtn.disabled = false;
}

function resetStepsToInitialState() {
    // Reset step 1 to initial state
    step1.classList.remove('completed', 'active');
    step1Status.innerHTML = '<i class="fas fa-clock"></i> Pending';
    step1Status.className = 'step-status';
    
    // Reset step 2 to initial state
    step2.classList.remove('completed', 'active');
    step2Status.innerHTML = '<i class="fas fa-clock"></i> Pending';
    step2Status.className = 'step-status';
    
    // Disable WhatsApp button
    whatsappBtn.disabled = true;
    
    // Hide access section
    accessSection.style.display = 'none';
    
    // Reset progress bar
    updateProgress(0);
}

function startWhatsAppCompletionTimer() {
    // Start countdown without visual window
    let timeLeft = 10;
    
    const countdown = setInterval(() => {
        timeLeft--;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            
            // Mark WhatsApp step as completed
            markWhatsAppCompleted();
        }
    }, 1000);
}



function markWhatsAppCompleted() {
    // Mark user as having completed step 2 (WhatsApp)
    localStorage.setItem('step2Completed', 'true');
    
    // Update step 2 UI
    step2.classList.add('completed');
    step2.classList.remove('active');
    step2Status.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
    step2Status.className = 'step-status completed';
    
    // Update progress to 100%
    updateProgress(100);
    
    // Show access section
    accessSection.style.display = 'block';
    
    // Show success message
    showNotification('WhatsApp step completed automatically! You now have access.', 'success');
}

function updateProgress(percentage) {
    progressFill.style.width = percentage + '%';
    progressText.textContent = percentage + '% Complete';
    
    // Add completion animation
    if (percentage === 100) {
        progressFill.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        progressText.style.color = '#28a745';
        progressText.style.fontWeight = '600';
    }
}



// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to open Google Form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        openGoogleForm();
    }
    
    // Ctrl/Cmd + W to join WhatsApp group (when step 2 is active)
    if ((e.ctrlKey || e.metaKey) && e.key === 'w' && !whatsappBtn.disabled) {
        e.preventDefault();
        handleWhatsAppClick();
    }
    

    
    // Ctrl/Cmd + F to open Google Form
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        openGoogleForm();
    }
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to steps (desktop only)
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) { // Only on desktop
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) { // Only on desktop
                this.style.transform = 'scale(1)';
            }
        });
        
        // Add touch feedback for mobile
        step.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        step.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click effect to benefits
    const benefits = document.querySelectorAll('.benefits li');
    benefits.forEach(benefit => {
        benefit.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Add touch feedback for mobile
        benefit.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        benefit.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add mobile-specific button improvements
    const buttons = document.querySelectorAll('button, .whatsapp-button, .download-button');
    buttons.forEach(button => {
        // Add touch feedback
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

 