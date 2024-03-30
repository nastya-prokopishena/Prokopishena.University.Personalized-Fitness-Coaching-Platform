document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login__form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('login_email').value;
        const password = document.getElementById('login_password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            // Після успішного входу перенаправлення на сторінку create-training-plan.html
            if (response.ok) {
                window.location.href = '/trainingPlans.html';
            } else {
                console.error('Error during login:', data.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    });
});
