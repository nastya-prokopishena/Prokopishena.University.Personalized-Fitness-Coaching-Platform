document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login__form');
    const emailInput = document.getElementById('login_email');
    const passwordInput = document.getElementById('login_password');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            email: emailInput.value,
            password: passwordInput.value
        };

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    alert('Incorrect email or password. Please try again.');
                } else {
                    console.error('Error during login:', response.statusText);
                }
                return;
            }

            const data = await response.json();
            localStorage.setItem('user_id', data.user_id);
            window.location.href = '/trainingPlans.html';
        } catch (error) {
            console.error('Error during login:', error);
        }
    });
});
