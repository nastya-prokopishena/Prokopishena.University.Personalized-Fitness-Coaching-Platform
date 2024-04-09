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

    const getClientId = async (userId) => {
        try {
            const response = await fetch(`/get-client-id/${userId}`);
            if (!response.ok) {
                throw new Error('Помилка отримання client_id');
            }
            const data = await response.json();
            return data.client_id;
        } catch (error) {
            console.error('Помилка отримання client_id:', error);
            throw error;
        }
    };
    const getTrainerId = async (userId) => {
        try {
            const response = await fetch(`/get-trainer-id/${userId}`);
            if (!response.ok) {
                throw new Error('Error getting trainer_id');
            }
            const data = await response.json();
            return data.trainer_id;
        } catch (error) {
            console.error('Error getting trainer_id:', error);
            throw error; // Rethrow the error
        }
    };
    

    // Event listener for profile form submission
    

const specializationContainerClient = document.getElementById("specializations-container-client");
const specializationContainerTrainer = document.getElementById("specializations-container-trainer");

// Функція для отримання спеціалізацій з сервера і створення чекбоксів
const fetchSpecializations = async () => {
    try {
        const response = await fetch('/specializations');
        const data = await response.json();

        data.forEach(specialization => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `specialization-${specialization.name}`;
            checkbox.name = 'specializations[]';
            checkbox.value = specialization.name;

            const label = document.createElement('label');
            label.htmlFor = `specialization-${specialization.name}`;
            label.textContent = specialization.name; // Додайте текстовий вміст (назву спеціалізації)

            if (document.getElementById('display-role').innerText === 'Client') {
                specializationContainerClient.appendChild(checkbox);
                specializationContainerClient.appendChild(label);
            } else if (document.getElementById('display-role').innerText === 'Trainer') {
                specializationContainerTrainer.appendChild(checkbox);
                specializationContainerTrainer.appendChild(label);
            }
            specializationContainerClient.appendChild(document.createElement('br'));
            specializationContainerTrainer.appendChild(document.createElement('br'));
        });
    } catch (error) {
        console.error('Помилка отримання спеціалізацій:', error);
    }
};

fetchSpecializations();

document.getElementById('client-profile-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission
    await fetchSpecializations();
    const SelectedTrainingGoals = Array.from(document.querySelectorAll('input[name="specializations[]"]:checked')).map(checkbox => checkbox.value).join(',');

    try {
        const clientId = await getClientId(userId); // Get client_id based on user_id
        const formData = {
            weight: document.getElementById('weight').value,
            height: document.getElementById('height').value,
            strength_level: document.getElementById('strength-level').value,
            endurance_level: document.getElementById('endurance-level').value,
            flexibility_level: document.getElementById('flexibility-level').value,
            training_goals: SelectedTrainingGoals, // Use the function to get selected training goals
            user_id: userId, // Use user_id instead of client_id
            client_id:clientId
        };

        // Send data to the server
        const response = await fetch('/client-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            alert('Дані успішно збережені');
            document.getElementById('client-profile-form').style.display = 'none';
        } else {
            console.error('Помилка при відправці даних:', response.statusText);
            alert('Сталася помилка при відправці даних');
        }
    } catch (error) {
        console.error('Помилка при відправці даних:', error);
        alert('Сталася помилка. Будь ласка, спробуйте знову.');
    }
});

// Функція для отримання обраних значень training goals

document.getElementById('add-profile').addEventListener('click', function() {
    const clientProfileForm = document.getElementById('client-profile-form');
    const trainerProfileForm = document.getElementById('trainer-profile-form');

    if (clientProfileForm && document.getElementById('display-role').innerText === 'Client') {
        clientProfileForm.style.display = 'block';
    } else if (trainerProfileForm && document.getElementById('display-role').innerText === 'Trainer') {
        trainerProfileForm.style.display = 'block';
    }
});
    const trainerProfileForm = document.getElementById("trainer-profile-form");

    // Додаємо обробник події для відправки форми тренера
    trainerProfileForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Зупиняємо стандартну відправку форми

        // Викликаємо функцію fetchSpecializations() перед відправкою форми тренера
        await fetchSpecializations();

        // Отримуємо значення обраних спеціалізацій
        const selectedSpecializations = Array.from(document.querySelectorAll('input[name="specializations[]"]:checked')).map(checkbox => checkbox.value).join(',');

        // Отримуємо значення інших полів форми
        const experience = document.getElementById("trainer-experience").value;
        const aboutMe = document.getElementById("trainer-bio").value;

        try {
            // Отримання trainer_id на основі user_id
            const trainerId = await getTrainerId(userId);

            // Створюємо об'єкт для передачі даних
            const formData = {
                trainer_id: trainerId,
                user_id: userId,
                specializations: selectedSpecializations,
                experience,
                about_trainer: aboutMe
            };

            // Відправляємо POST-запит на сервер
            const response = await fetch("/trainer-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            // Перевіряємо статус відповіді
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                alert("Дані успішно збережено");
                trainerProfileForm.style.display = 'none';
                trainerProfileForm.reset();
            } else {
                console.error("Помилка при відправці даних:", response.statusText);
                alert("Сталася помилка при відправці даних");
            }
        } catch (error) {
            console.error("Помилка:", error);
            alert("Сталася помилка. Будь ласка, спробуйте ще раз.");
        }
    });
    const searchTrainerBtn = document.getElementById('search-trainer-btn');
    searchTrainerBtn.addEventListener('click', () => {
        findTrainer();
    });
    getUserInfo(userId);

});
const findTrainer = async () => {
    try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            throw new Error('Ідентифікатор користувача не знайдено');
        }

        const response = await fetch('/get-client-id/' + userId);
        if (!response.ok) {
            throw new Error('Помилка отримання client_id');
        }

        const data = await response.json();
        const clientId = data.client_id;

        const trainersResponse = await fetch('/find-trainer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clientId }),
        });

        if (!trainersResponse.ok) {
            throw new Error('Помилка при пошуку тренера');
        }

        const trainers = await trainersResponse.json();
        displayTrainers(trainers);
    } catch (error) {
        console.error('Помилка:', error);
        alert('Сталася помилка при пошуку тренера');
    }
};

// Функція для відображення отриманих тренерів
// Функція для відображення отриманих тренерів
// Функція для відображення отриманих тренерів
const displayTrainers = (trainers) => {
    const trainerList = document.getElementById('trainer-list');
    trainerList.innerHTML = ''; 

    trainers.forEach(trainer => {
        const trainerItem = document.createElement('li');
        if (trainer.User && trainer.User.name) {
            trainerItem.textContent = `${trainer.User.name} ${trainer.User.surname}`;
        } else {
            trainerItem.textContent = 'Ім\'я тренера недоступне'; // Виводимо повідомлення про недоступність даних
        }
        trainerList.appendChild(trainerItem);
    });

};

