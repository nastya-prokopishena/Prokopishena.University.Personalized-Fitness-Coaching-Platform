document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.querySelector('.sign-up__form');

    signUpForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            name: document.getElementById('signup_name').value,
            surname: document.getElementById('signup_surname').value,
            email: document.getElementById('signup_email').value,
            password: document.getElementById('signup_password').value,
            date_of_birth: document.getElementById('signup_dob').value,
            gender: document.getElementById('signup_gender').value,
            phone_number: document.getElementById('signup_phone').value
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            localStorage.setItem('userGender', formData.gender);

            if (response.ok) {
                alert('Account created successfully!');
                signUpForm.reset();
                console.log(data);

            } else {
                if (data && data.message) {
                    alert('Error creating account: ' + data.message);
                    console.error('Error during registration:', data.message);
                } else {
                    alert('Unknown error occurred. Please try again.');
                    console.error('Unknown error during registration:', response.statusText);
                }
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    });
});