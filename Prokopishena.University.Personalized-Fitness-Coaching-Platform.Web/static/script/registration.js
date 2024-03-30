document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.querySelector('.sign-up__form');

    signUpForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const firstName = document.getElementById('signup_name').value;
        const lastName = document.getElementById('signup_surname').value;
        const email = document.getElementById('signup_email').value;
        const password = document.getElementById('signup_password').value;

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: firstName, surname: lastName, email, password }), // Виправлено тут
            });

            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.error('Error during registration:', error);
        }
    });
});
