document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = {
            fullName: document.getElementById('full-name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            role: document.querySelector('input[name="role"]:checked').value
        };
        console.log('User data:', JSON.stringify(formData));
        alert('Account created successfully and data stored in JSON format!');

        // Commented out HTTP request for now
        /*
        fetch('https://your-server-endpoint.com/api/saveUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save data on the server');
            }
            return response.json();
        })
        .then(data => {
            alert('Account created successfully and data stored on the server!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving your account data to the server.');
        });
        */
    });

    document.getElementById('google-signin').addEventListener('click', () => {
        window.open('https://accounts.google.com/o/oauth2/auth', '_blank');
    });

    document.getElementById('facebook-signin').addEventListener('click', () => {
        window.open('https://www.facebook.com/dialog/oauth', '_blank');
    });
});
