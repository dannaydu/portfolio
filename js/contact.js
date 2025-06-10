document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        // Disable submit button and show loading state
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Replace with your Google Apps Script Web App URL
            const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Show success message
                formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                formStatus.className = 'form-status success';
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            // Show error message
            formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            formStatus.className = 'form-status error';
            console.error('Error:', error);
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}); 