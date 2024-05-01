document.addEventListener("DOMContentLoaded", async function() {
    const userId = localStorage.getItem('user_id');
    const roleSelection = document.getElementById("role-selection");
    const goalForm = document.getElementById("goal-form");
    const goalList = document.getElementById("goal-list");

    const getUserInfo = async (user_id) => {
        try {
            const response = await fetch(`/user/${user_id}`);
            const userInfo = await response.json();
            displayUserInfo(userInfo);
        } catch (error) {
            console.error('Помилка отримання інформації про користувача:', error);
        }
    };

    const displayUserInfo = (userInfo) => {
        const { name, surname, email, date_of_birth, phone_number, gender } = userInfo;
        document.getElementById('display-name').innerText = name;
        document.getElementById('display-surname').innerText = surname;
        document.getElementById('display-email').innerText = email;
        document.getElementById('display-birthdate').innerText = date_of_birth;
        document.getElementById('display-phone-number').innerText = phone_number;
        document.getElementById('display-gender').innerText = gender;
        
    };

    try {
        await getUserInfo(userId);
    } catch (error) {
        console.error('Помилка отримання інформації про користувача:', error);
    }


  // Функція для отримання client_id користувача
const getClientId = async (userId) => {
    try {
        const response = await fetch(`/get-client-id/${userId}`);

        // Перевірка статусу відповіді
        if (!response.ok) {
            console.error(`Помилка отримання client_id: статус відповіді - ${response.status}`);
            throw new Error('Помилка отримання client_id');
        }

        const data = await response.json();

        // Перевірка, чи містить відповідь необхідне поле
        if (!data.client_id) {
            console.error('Відповідь не містить client_id');
            throw new Error('Відповідь не містить client_id');
        }

        return data.client_id;
    } catch (error) {
        console.error('Помилка отримання client_id:', error);
        throw error;
    }
};
window.getClientId = getClientId;


// Функція для отримання trainer_id користувача
const getTrainerId = async (userId) => {
    try {
        const response = await fetch(`/get-trainer-id/${userId}`);

        // Перевірка статусу відповіді
        if (!response.ok) {
            console.error(`Помилка отримання trainer_id: статус відповіді - ${response.status}`);
            throw new Error('Помилка отримання trainer_id');
        }

        const data = await response.json();

        // Перевірка, чи містить відповідь необхідне поле
        if (!data.trainer_id) {
            console.error('Відповідь не містить trainer_id');
            throw new Error('Відповідь не містить trainer_id');
        }

        return data.trainer_id;
    } catch (error) {
        console.error('Помилка отримання trainer_id:', error);
        throw error;
    }
};


const getClientInfo = async (user_id) => {
    try {
        const response = await fetch(`/client/${user_id}`);
        const clientInfo = await response.json();
        displayClientInfo(clientInfo);
    } catch (error) {
        console.error('Error getting client information:', error);
    }
};

const getTrainerInfo = async (user_id) => {
    try {
        const response = await fetch(`/trainer/${user_id}`);
        const trainerInfo = await response.json();
        displayTrainerInfo(trainerInfo);
    } catch (error) {
        console.error('Error getting trainer information:', error);
    }
};

const displayClientInfo = async (userId) => {
    try {
        const response = await fetch(`/client/${userId}`);
        const clientInfo = await response.json();

        // Відображення інформації про клієнта в div з id="client-info"
        document.getElementById('client-info').innerHTML = `
            <h2>Client Information</h2>
            <p>Weight: ${clientInfo.weight}</p>
            <p>Height: ${clientInfo.height}</p>
            <p>Training goals: ${clientInfo.training_goals}</p>
            <p>Strength level: ${clientInfo.strength_level}</p>
            <p>Endurance level: ${clientInfo.endurance_level}</p>
            <p>Flexibility level: ${clientInfo.flexibility_level}</p>
        `;
    } catch (error) {
        console.error('Error getting client information:', error);
    }
};

const displayTrainerInfo = async (userId) => {
    try {
        const response = await fetch(`/trainer/${userId}`);
        const trainerInfo = await response.json();

        // Відображення інформації про тренера в div з id="trainer-info"
        document.getElementById('trainer-info').innerHTML = `
            <h2>Trainer Information</h2>
            <p>Specialization: ${trainerInfo.specialization}</p>
            <p>Experience: ${trainerInfo.experience} years</p>
        `;
    } catch (error) {
        console.error('Error getting trainer information:', error);
    }
};


// Визначення ролі користувача і відображення відповідної інформації
try {
    const response = await fetch(`/user-role/${userId}`);
    const data = await response.json();
    const userRole = data.role;

    if (userRole === 'Client') {
        displayClientInfo(userId);
        
    } else if (userRole === 'Trainer') {
        displayTrainerInfo(userId);
    }
} catch (error) {
    console.error('Error getting user role:', error);
}

const displayClientsForTrainer = async (trainerId) => {
    try {
        const response = await fetch(`/trainer/${trainerId}/clients`);
        if (!response.ok) {
            console.error('Error fetching clients for trainer');
            return;
        }

        const clients = await response.json();
        const clientContainer = document.querySelector('#client-list');

        if (!clientContainer) {
            console.error('client-list element not found');
            return;
        }

        clientContainer.innerHTML = '';

        clients.forEach(client => {
            // Створення елемента для кожного клієнта
            const clientDiv = document.createElement('div');
            clientDiv.classList.add('client-item');
            clientDiv.setAttribute('data-client-id', client.client_id);

            // Ім'я та прізвище клієнта
            const clientNameElement = document.createElement('p');
            clientNameElement.innerText = `Name: ${client.name} ${client.surname}`;
            clientDiv.appendChild(clientNameElement);

            // Створення додаткової інформації про клієнта
            const additionalInfoDiv = document.createElement('div');
            additionalInfoDiv.classList.add('client-additional-info');
            additionalInfoDiv.style.display = 'none';
            additionalInfoDiv.innerHTML = `
                <p>Email: ${client.email}</p>
                <p>Phone: ${client.phone_number}</p>
                <p>Gender: ${client.gender}</p>
                <p>Weight: ${client.weight}</p>
                <p>Height: ${client.height}</p>
                <p>Strength Level: ${client.strength_level}</p>
                <p>Endurance Level: ${client.endurance_level}</p>
                <p>Flexibility Level: ${client.flexibility_level}</p>
                <p>Training Goals: ${client.training_goals}</p>
            `;

            clientDiv.appendChild(additionalInfoDiv);

            const button = document.createElement('button');
            button.textContent = 'All information';
            button.addEventListener('click', toggleClientInfo);
            clientDiv.appendChild(button);

            // Створення кнопки для відкриття форми рекомендацій
            const nutritionsButton = document.createElement('button');
            nutritionsButton.textContent = 'Nutritions';
            nutritionsButton.addEventListener('click', () => openNutritionsForm(client));
            clientDiv.appendChild(nutritionsButton);

            clientContainer.appendChild(clientDiv);
        });
    } catch (error) {
        console.error('Error fetching clients for trainer:', error);
    }
};

const openNutritionsForm = async (client) => {
    const clientId = client.client_id;
    const clientDiv = document.querySelector(`div[data-client-id="${clientId}"]`);
    
    if (clientDiv) {
        // Перевіряємо, чи вже створено форму
        if (clientDiv.querySelector('form')) {
            console.log('Nutritions form already exists');
            return;
        }

        // Створюємо форму
        const form = document.createElement('form');
        form.style.display = 'block'; // Показуємо форму при відкритті
        form.innerHTML = `
            <label for="recommendation_text">Enter Nutrition Recommendation:</label><br>
            <textarea id="recommendation_text" name="recommendation_text" rows="4" cols="50"></textarea><br>
            <button type="button">Send Recommendation</button>
        `;
        clientDiv.appendChild(form);

        form.querySelector('button').addEventListener('click', async () => {
            const recommendationText = form.querySelector('#recommendation_text').value;
            const userId = localStorage.getItem('user_id');
            const trainerId = await getTrainerId(userId);

            try {
                const response = await fetch('/nutrition-recommendations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        client_id: clientId,
                        trainer_id: trainerId,
                        recommendation_text: recommendationText
                    })
                });

                if (!response.ok) {
                    console.error('Error sending recommendation');
                    return;
                }

                form.querySelector('#recommendation_text').value = '';
            } catch (error) {
                console.error('Error sending recommendation:', error);
            }
        });
    } else {
        console.error('Client div not found');
    }
};




const toggleClientInfo = (event) => {
    const button = event.target;
    const clientDiv = button.closest('.client-item');
    
    if (clientDiv) {
        const additionalInfoDiv = clientDiv.querySelector('.client-additional-info');
        
        if (additionalInfoDiv) {
            additionalInfoDiv.style.display = additionalInfoDiv.style.display === 'none' ? 'block' : 'none';
        } else {
            console.error(`Додаткова інформація для клієнта не знайдена.`);
        }
    } else {
        console.error(`Клієнт не знайдений.`);
    }
};
const getGoals = async (clientId) => {
    try {
        const response = await fetch(`/api/goals?client_id=${clientId}`);
        if (!response.ok) {
            throw new Error('Error getting goals');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting goals:', error);
    }
};

    try {
        const response = await fetch(`/user-role/${userId}`);
        if (!response.ok) {
            throw new Error("Помилка отримання ролі користувача");
        }
        const data = await response.json();
        const userRole = data.role;
        document.getElementById('display-role').innerText = userRole;

        if (userRole !== 'Client' && userRole !== 'Trainer') {
            roleSelection.style.display = 'block';
        } else {
            roleSelection.style.display = 'none';
        }
        
        
    } catch (error) {
        console.error('Помилка отримання ролі користувача:', error);
    }

    try {
        const response = await fetch(`/user-role/${userId}`);
        if (!response.ok) {
            throw new Error("Помилка отримання ролі користувача");
        }
        const data = await response.json();
        const userRole = data.role;
        document.getElementById('display-role').innerText = userRole;

        if (userRole === 'Trainer') {
            const trainerId = await getTrainerId(userId);
            if (trainerId) {
                await displayClientsForTrainer(trainerId);
            } else {
                console.error('Не вдалося отримати trainer_id');
            }
        }
        
    } catch (error) {
        console.error('Помилка отримання ролі тренера:', error);
    }

    try {
        const response = await fetch(`/user-role/${userId}`);
        if (!response.ok) {
            throw new Error("Error getting user role");
        }
        const data = await response.json();
        const userRole = data.role;
        document.getElementById('display-role').innerText = userRole;

        if (userRole === 'Client') {
            // Show the goal setting form
            goalForm.style.display = 'block';

            const goalTemplateSelect = document.getElementById('goal-template');
            try {
                const response = await fetch('/api/goal-templates');
                if (!response.ok) {
                    throw new Error("Error fetching goal templates");
                }
                const data = await response.json();
                data.forEach(template => {
                    const option = document.createElement('option');
                    option.value = template.goal_template_id;
                    option.textContent = template.name;
                    goalTemplateSelect.appendChild(option);
                });
            } catch (error) {
                console.error(error);
            }
            
        }
        
    } catch (error) {
        console.error('Error getting trainer role:', error);
    }

    
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


    document.getElementById('edit-profile').addEventListener('click', function() {
        const editProfileForm = document.getElementById('edit-profile-form');
        editProfileForm.style.display = editProfileForm.style.display === 'none' || !editProfileForm.style.display ? 'block' : 'none';
    });
    
    

    const setGoalForm = document.getElementById('set-goal-form');
    setGoalForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const goalDescription = document.getElementById('goal-description').value;
        const goalTemplateId = document.getElementById('goal-template').value;

        try {
            const response = await fetch('/api/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    client_id: await getClientId(userId),
                    description: goalDescription,
                    goal_template_id: goalTemplateId
                })
            });

            if (!response.ok) {
                throw new Error('Error setting goal');
            }

            const data = await response.json();
            console.log(data);
            const goals = await getGoals(data.client_id);
            displayGoals(goals);
        } catch (error) {
            console.error('Error setting goal:', error);
        }
    });

    const displayGoals = async (goals) => {
        goalList.innerHTML = '';
        let completedCount = 0;
        let inProgressCount = 0;
    
        goals.forEach(goal => {
            if (goal.status === 'Completed') {
                completedCount++;
            } else if (goal.status === 'In Progress') {
                inProgressCount++;
            }
        });
    
        const total = completedCount + inProgressCount;
        const progress = total === 0 ? 0 : (completedCount / total) * 100;
    
        const progressChart = document.createElement('div');
        progressChart.classList.add('progress-chart');
        progressChart.dataset.progress = progress;
    
        progressChart.innerHTML = `
            <svg class="progress-ring" width="120" height="120" color="darken(#45a049, 10%)">
                <circle class="progress-ring-circle" stroke="#007bff" stroke-width="10" fill="transparent" r="50" cx="60" cy="60" ></circle>
            </svg>
            <p>Total Progress: ${progress.toFixed(2)}%</p>
        `;
        goalList.appendChild(progressChart);
    
        goals.forEach(goal => {
            const goalItem = document.createElement('div');
            goalItem.classList.add('goal-item');
    
            goalItem.innerHTML = `
                <p>${goal.description}</p>
                <p>Status: ${goal.status}</p>
                <button class="start-goal-btn" data-goal-id="${goal.goal_id}">Start Goal</button>
                <button class="complete-goal-btn" data-goal-id="${goal.goal_id}">Complete Goal</button>
            `;
            goalList.appendChild(goalItem);
    
            const startGoalBtn = goalItem.querySelector('.start-goal-btn');
            startGoalBtn.addEventListener('click', async () => {
                const goalId = startGoalBtn.getAttribute('data-goal-id');
                try {
                    const response = await fetch(`/api/goals/${goalId}/start`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            goal_id: goalId
                        })
                    });
    
                    if (!response.ok) {
                        throw new Error('Error starting goal');
                    }
    
                    const data = await response.json();
                    console.log(data);
                    const goals = await getGoals(data.client_id);
                    displayGoals(goals);
                } catch (error) {
                    console.error('Error starting goal:', error);
                }
            });
    
            const completeGoalBtn = goalItem.querySelector('.complete-goal-btn');
            completeGoalBtn.addEventListener('click', async () => {
                const goalId = completeGoalBtn.getAttribute('data-goal-id');
                try {
                    const response = await fetch(`/api/goals/${goalId}/complete`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            goal_id: goalId
                        })
                    });
    
                    if (!response.ok) {
                        throw new Error('Error completing goal');
                    }
    
                    const clientId = await getClientId(userId);
                    const goals = await getGoals(clientId);
                    displayGoals(goals);
                } catch (error) {
                    console.error('Error completing goal:', error);
                }
            });
        });
    
        const progressRingCircle = progressChart.querySelector('.progress-ring-circle');
        const progressValue = parseFloat(progressChart.dataset.progress) / 100;
        const radius = progressRingCircle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
    
        progressRingCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressRingCircle.style.strokeDashoffset = `${circumference}`;
        const offset = circumference - progressValue * circumference;
        progressRingCircle.style.strokeDashoffset = -offset;
    };
    

    document.getElementById('profile-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const newName = document.getElementById('new-name').value;
        const newSurname = document.getElementById('new-surname').value;
        const newEmail = document.getElementById('new-email').value;
        const newBirthdate = document.getElementById('new-birthdate').value;
        const newPhoneNumber = document.getElementById('edit-phone-number').value;
        const newGender = document.getElementById('edit-gender').value;
    
        const newFormData = {};
    
        if (newName.trim() !== '') {
            newFormData.newName = newName;
        }
        if (newSurname.trim() !== '') {
            newFormData.newSurname = newSurname;
        }
        if (newEmail.trim() !== '') {
            newFormData.newEmail = newEmail;
        }
        if (newBirthdate.trim() !== '') {
            newFormData.newBirthdate = newBirthdate;
        }
        if (newPhoneNumber.trim() !== '') {
            newFormData.newPhoneNumber = newPhoneNumber;
        }
        if (newGender.trim() !== '') {
            newFormData.newGender = newGender;
        }
    
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
            alert(message); 
            document.getElementById('edit-profile-form').style.display = 'none';
            window.location.reload();
        } catch (error) {
            console.error('Помилка:', error);
            alert('Сталася помилка. Будь ласка, спробуйте знову.');
        }
    });
    
    document.getElementById('cancel-edit').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('edit-profile-form').style.display = 'none';
    });
    

const specializationContainerClient = document.getElementById("specializations-container-client");
const specializationContainerTrainer = document.getElementById("specializations-container-trainer");

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
            label.textContent = specialization.name; 

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
    event.preventDefault();
    await fetchSpecializations();
    const userId = localStorage.getItem('user_id'); // Переміщаємо отримання userId в середину функції
    const SelectedTrainingGoals = Array.from(document.querySelectorAll('input[name="specializations[]"]:checked')).map(checkbox => checkbox.value).join(',');

    try {
        const clientId = await getClientId(userId);
        const formData = {
            weight: document.getElementById('weight').value,
            height: document.getElementById('height').value,
            strength_level: document.getElementById('strength-level').value,
            endurance_level: document.getElementById('endurance-level').value,
            flexibility_level: document.getElementById('flexibility-level').value,
            training_goals: SelectedTrainingGoals,
            user_id: userId // Виправлено user_id на userId
        };

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

    trainerProfileForm.addEventListener("submit", async function(event) {
        event.preventDefault(); 

        await fetchSpecializations();

        const selectedSpecializations = Array.from(document.querySelectorAll('input[name="specializations[]"]:checked')).map(checkbox => checkbox.value).join(',');

        const experience = document.getElementById("trainer-experience").value;
        const aboutMe = document.getElementById("trainer-bio").value;

        try {
            const trainerId = await getTrainerId(userId);

            const formData = {
                trainer_id: trainerId,
                user_id: userId,
                specializations: selectedSpecializations,
                experience,
                about_trainer: aboutMe
            };

            const response = await fetch("/trainer-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

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

    document.getElementById('cancel-profile').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('client-profile-form').style.display = 'none';
        document.getElementById('trainer-profile-form').style.display = 'none';
    });
    
    // Отримання та відображення тренерів
    const displayTrainers = (trainers) => {
        const trainerList = document.getElementById('trainer-list');
        trainerList.innerHTML = ''; 
      
        trainers.forEach(trainer => {
          const listItem = document.createElement('li');
          listItem.classList.add('trainer-item');
          const trainerInfo = `
            <div>
              <h3>${trainer.name} ${trainer.surname}</h3>
              <p><strong>Email:</strong> ${trainer.email}</p>
              <p><strong>Date of Birth:</strong> ${trainer.date_of_birth}</p>
              <p><strong>Gender:</strong> ${trainer.gender}</p>
              <p><strong>Phone Number:</strong> ${trainer.phone_number}</p>
              <p><strong>Specialization:</strong> ${trainer.specialization}</p>
              <p><strong>Experience:</strong> ${trainer.experience} years</p>
              <p><strong>About Trainer:</strong> ${trainer.about_trainer}</p>
              <button class="train-btn" data-trainer-id="${trainer.trainer_id}">Request Training</button>
            </div>
          `;
          listItem.innerHTML = trainerInfo;
          trainerList.appendChild(listItem);
        });
        const trainBtns = document.querySelectorAll('.train-btn');
        trainBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const trainerId = btn.getAttribute('data-trainer-id');
                requestTraining(trainerId);
            });
        });
    
        // Додано кнопку Close
        const closeBtn = document.createElement('button');
        closeBtn.innerText = 'Close';
        closeBtn.classList.add('close-btn');
        closeBtn.addEventListener('click', () => {
            trainerList.style.display = 'none';
            closeBtn.style.display = 'none'; // Приховати кнопку Close
        });
    
        if (trainerList.style.display !== 'none') {
            trainerList.parentElement.appendChild(closeBtn);
        }
    };
    
    
  const requestTraining = async (trainerId) => {
    try {
        const clientId = await getClientId(userId); // Отримуємо ID клієнта

        // Відправляємо POST запит на сервер
        const response = await fetch('/training_requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: clientId,
                trainer_id: trainerId
            })
        });

        // Обробляємо відповідь сервера
        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Показуємо повідомлення про успіх
            // Приховуємо div після успішного створення запиту на тренування
            document.querySelector('.trainer-searching').style.display = 'none';
        } else {
            alert(data.message); // Показуємо повідомлення про помилку
        }
    } catch (error) {
        console.error('Помилка при запиті на тренування:', error);
        alert('Сталася помилка. Спробуйте ще раз.');
    }
};

const checkExistingRequests = async (userId) => {
    try {
        const userRoleResponse = await fetch(`/user-role/${userId}`);
        const userRoleData = await userRoleResponse.json();
        const userRole = userRoleData.role;

        // Якщо роль користувача — тренер, приховуємо div з тренерами
        if (userRole === 'Trainer') {
            document.querySelector('.trainer-searching').style.display = 'none';
            return;
        }

        // Якщо роль користувача — клієнт, перевіряємо наявність існуючих запитів
        const clientId = await getClientId(userId); // Отримуємо ID клієнта
        const response = await fetch(`/check-existing-requests/${clientId}`);
        
        if (response.ok) {
            const data = await response.json();
            if (data.existing_requests) {
                // Якщо вже є існуючі запити, приховуємо div з тренерами
                document.querySelector('.trainer-searching').style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Помилка при перевірці існуючих запитів:', error);
    }
};

  // Функція для пошуку тренерів
  const findTrainer = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User ID not found');
      }
  
      const response = await fetch('/trainers');
      if (!response.ok) {
        throw new Error('Error fetching trainers');
      }
  
      const trainers = await response.json();
      displayTrainers(trainers);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while searching for trainers');
    }
  };
  
 

// Функція для показу інформації про клієнта
const showClientInformation = (clientId) => {
    console.log(`Showing information for client with ID ${clientId}`);
    // Реалізуйте показ інформації про клієнта
};
const quoteElement = document.getElementById('random-quote');
const STORAGE_KEY = 'lastDisplayedQuote';

// Функція для отримання випадкової цитати
function getRandomQuote() {
    fetch('/random-quote')
        .then(response => response.json())
        .then(data => {
            const lastDisplayedQuote = localStorage.getItem(STORAGE_KEY);
            // Перевірка, чи вже відображалася цитата для сьогоднішнього дня
            const today = new Date().toDateString();
            if (lastDisplayedQuote === null || JSON.parse(lastDisplayedQuote).date !== today) {
                // Оновити HTML-вміст випадковою цитатою
                quoteElement.textContent = data.quote_text;
                // Зберегти дані про останню відображену цитату в локальному сховищі
                const quoteData = {
                    text: data.quote_text,
                    date: today
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(quoteData));
            } else {
                // Використовувати збережену цитату, якщо вже відображалася цитата для сьогоднішнього дня
                const savedQuote = JSON.parse(lastDisplayedQuote);
                quoteElement.textContent = savedQuote.text;
            }
        })
        .catch(error => console.error('Помилка отримання випадкової цитати:', error));
}

// Отримати випадкову цитату при завантаженні сторінки
getRandomQuote();




const searchTrainerBtn = document.getElementById('search-trainer-btn');
searchTrainerBtn.addEventListener('click', () => {
    const trainerList = document.getElementById('trainer-list');
    trainerList.style.display = 'block';
    findTrainer();
});

  if (goalList) {
    const clientId = await getClientId(userId);
    const goals = await getGoals(clientId);
    displayGoals(goals);
} else {
    console.error("Goal list not found.");
}
    getUserInfo(userId);
    checkExistingRequests(userId);
   
});