document.addEventListener("DOMContentLoaded", async function() {
    const userId = localStorage.getItem('user_id');
    const roleSelection = document.getElementById("role-selection");

    // Function to fetch user information
    const getUserInfo = async (user_id) => {
        try {
            const response = await fetch(`/user/${user_id}`);
            const userInfo = await response.json();
            displayUserInfo(userInfo);
        } catch (error) {
            console.error('Помилка отримання інформації про користувача:', error);
        }
    };

    // Function to display user information
    const displayUserInfo = (userInfo) => {
        const { name, surname, email, date_of_birth, phone_number, gender } = userInfo;
        document.getElementById('display-name').innerText = name;
        document.getElementById('display-surname').innerText = surname;
        document.getElementById('display-email').innerText = email;
        document.getElementById('display-birthdate').innerText = date_of_birth;
        document.getElementById('display-phone-number').innerText = phone_number;
        document.getElementById('display-gender').innerText = gender;
    };

    // Fetch user role and display it
    try {
        const response = await fetch(`/user-role/${userId}`);
        if (!response.ok) {
            throw new Error("Помилка отримання ролі користувача");
        }
        const data = await response.json();
        const userRole = data.role;
        document.getElementById('display-role').innerText = userRole;

        // Display role selection if user role is neither client nor trainer
        if (userRole !== 'Client' && userRole !== 'Trainer') {
            roleSelection.style.display = 'block';
        } else {
            roleSelection.style.display = 'none';
        }
    } catch (error) {
        console.error('Помилка отримання ролі користувача:', error);
    }

    // Event listener for role buttons
    const roleButtons = document.querySelectorAll(".role-button");
    roleButtons.forEach(function(button) {
        button.addEventListener("click", async function() {
            const selectedRole = this.getAttribute("data-role");
            localStorage.setItem('selectedRole', selectedRole);
            roleSelection.style.display = 'none';

            try {
                const url = selectedRole === "client" ? "/create-client" : "/create-trainer";
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ user_id: userId })
                });
                if (!response.ok) {
                    throw new Error("Помилка створення запису");
                }
                const data = await response.json();
                console.log(data);
                if (selectedRole !== 'client' && selectedRole !== 'trainer') {
                    roleSelection.style.display = 'none';
                }
                document.getElementById('display-role').innerText = selectedRole;
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        });
    });

    // Event listener for edit profile button
    document.getElementById('edit-profile').addEventListener('click', function() {
        const editProfileForm = document.getElementById('edit-profile-form');
        editProfileForm.style.display = editProfileForm.style.display === 'none' || !editProfileForm.style.display ? 'block' : 'none';
    });
    
    // Event listener for profile form submission
    document.getElementById('profile-form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission
        
        const newFormData = {
            newName: document.getElementById('new-name').value,
            newSurname: document.getElementById('new-surname').value,
            newEmail: document.getElementById('new-email').value,
            newBirthdate: document.getElementById('new-birthdate').value,
            newPhoneNumber: document.getElementById('edit-phone-number').value,
            newGender: document.getElementById('edit-gender').value
        };
        
        try {
            const response = await fetch('/update-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    ...newFormData
                })
            });
            if (!response.ok) {
                throw new Error("Помилка оновлення користувача");
            }
            const message = await response.text();
            alert(message); // Show success message
            document.getElementById('edit-profile-form').style.display = 'none';
            window.location.reload();
        } catch (error) {
            console.error('Помилка:', error);
            alert('Сталася помилка. Будь ласка, спробуйте знову.');
        }
    });

    // Event listener for cancel edit button
    document.getElementById('cancel-edit').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('edit-profile-form').style.display = 'none';
    });

    // Call getUserInfo function to populate user information
    getUserInfo(userId);
});
