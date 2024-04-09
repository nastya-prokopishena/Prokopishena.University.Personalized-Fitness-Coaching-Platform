document.addEventListener('DOMContentLoaded', () => {
    const searchTrainerBtn = document.getElementById('search-trainer-btn');
    searchTrainerBtn.addEventListener('click', () => {
        findTrainer();
    });
});

// Функція для відправки запиту на сервер для пошуку тренера
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
const displayTrainers = (trainers) => {
    const trainerList = document.getElementById('trainer-list');
    trainerList.innerHTML = ''; // Очищення списку перед відображенням нових даних

    trainers.forEach(trainer => {
        const trainerItem = document.createElement('li');
        trainerItem.textContent = `${trainer.User.name} ${trainer.User.surname}`; // Припустимо, що ім'я та прізвище тренера знаходяться в об'єкті User
        trainerList.appendChild(trainerItem);
    });
};