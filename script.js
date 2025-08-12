// Configuration - Update these values with your actual WhatsApp group link and Google Drive download link
const CONFIG = {
    whatsappGroupLink: "https://chat.whatsapp.com/KE4EhL007X66Zf0HYezMH8", // Replace with your actual WhatsApp group invite link
    driveDownloadLink: "https://drive.google.com/drive/folders/1xAYgMPgPKLYW-s48UCGJZ2_knb0YEmJA?usp=drive_link", // Replace with your actual Google Drive link
    groupName: "Your Group Name" // Replace with your actual group name
};

// DOM elements
const whatsappBtn = document.getElementById('whatsapp-btn');
const downloadSection = document.getElementById('download-section');
const downloadLinkInput = document.getElementById('download-link');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set the download link
    downloadLinkInput.value = CONFIG.driveDownloadLink;
    downloadBtn.href = CONFIG.driveDownloadLink;
    
    // Add click event to WhatsApp button
    whatsappBtn.addEventListener('click', handleWhatsAppClick);
    
    // Add click event to copy button
    copyBtn.addEventListener('click', handleCopyClick);
    
    // Reset user joined status every time page loads
    localStorage.removeItem('whatsappGroupJoined');
});

// Show download section
function showDownloadSection() {
    downloadSection.style.display = 'block';
    
    // Scroll to download section smoothly
    downloadSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
    
    // Show success message
    showNotification('Success! Your download link is now available.', 'success');
}

// Handle copy button click
function handleCopyClick() {
    downloadLinkInput.select();
    downloadLinkInput.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        // Copy to clipboard
        document.execCommand('copy');
        
        // Show success message
        showNotification('Download link copied to clipboard!', 'success');
        
        // Change button text temporarily
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '#6c757d';
        }, 2000);
        
    } catch (err) {
        // Fallback for modern browsers
        navigator.clipboard.writeText(downloadLinkInput.value).then(() => {
            showNotification('Download link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Failed to copy link. Please select and copy manually.', 'error');
        });
    }
}

// Mark user as joined
function markUserJoined() {
    localStorage.setItem('whatsappGroupJoined', 'true');
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
    
    // Simulate a small delay for better UX
    setTimeout(() => {
        // Open WhatsApp group link in new tab
        window.open(CONFIG.whatsappGroupLink, '_blank');
        
        // Show download section after a short delay
        setTimeout(() => {
            showDownloadSection();
            markUserJoined();
        }, 2000);
        
        // Reset button
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Join WhatsApp Group';
        whatsappBtn.disabled = false;
    }, 1000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to join WhatsApp group
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleWhatsAppClick();
    }
    
    // Ctrl/Cmd + C to copy download link (when download section is visible)
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && downloadSection.style.display !== 'none') {
        e.preventDefault();
        handleCopyClick();
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