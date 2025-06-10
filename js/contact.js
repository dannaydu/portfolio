document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const statusMessage = document.getElementById('statusMessage');

    // Replace this URL with your Google Apps Script Web App URL after deployment
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxzC1_fR4TUeca0bSguAdsybQa-i1dOXwFm5ZgSK0FXyDm5zEoro4F900erD8eGl79jsg/exec';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        statusMessage.textContent = '';
        statusMessage.className = '';
        
        try {
            const formData = {
                name: form.name.value,
                email: form.email.value,
                message: form.message.value
            };
            
            console.log('Sending data:', formData); // Debug log
            
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Add this to handle CORS
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            console.log('Response status:', response.status); // Debug log
            
            // Since we're using no-cors, we can't read the response
            // We'll assume success if we get here
            statusMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            statusMessage.className = 'success';
            form.reset();
            
        } catch (error) {
            // Show detailed error message
            console.error('Detailed error:', error);
            statusMessage.textContent = `Error: ${error.message}. Please try again later.`;
            statusMessage.className = 'error';
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }
    });
}); 