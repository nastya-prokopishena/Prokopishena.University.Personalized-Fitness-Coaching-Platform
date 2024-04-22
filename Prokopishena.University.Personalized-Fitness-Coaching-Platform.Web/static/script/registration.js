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
                console.log(data);
            } else {
                alert('Error creating account: ' + data.error);
                console.error('Error during registration:', data.error);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    });
});
