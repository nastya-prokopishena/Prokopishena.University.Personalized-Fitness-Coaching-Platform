document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login__form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            email: document.getElementById('login_email').value,
            password: document.getElementById('login_password').value
        };

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user_id', data.user_id);
                window.location.href = '/trainingPlans.html';
            } else {
                console.error('Error during login:', data.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    });
});
