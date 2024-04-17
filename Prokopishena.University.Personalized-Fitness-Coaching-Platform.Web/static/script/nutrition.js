

// Функція для створення модального вікна з формою для введення рекомендацій щодо харчування
const createNutritionModal = () => {
    // Створення модального вікна
    const modal = document.createElement('div');
    modal.id = 'nutritionModal';
    modal.style.display = 'none'; // Початково приховуємо модальне вікно

    // Створення форми всередині модального вікна
    const form = document.createElement('form');
    form.id = 'nutritionForm';

    // Додаємо заголовок форми
    const heading = document.createElement('h3');
    heading.innerText = 'Enter Nutrition Guidance';
    form.appendChild(heading);

    // Створення прихованого поля для request_id
    const requestIdInput = document.createElement('input');
    requestIdInput.type = 'hidden';
    requestIdInput.name = 'requestId';
    requestIdInput.id = 'requestId';
    form.appendChild(requestIdInput);

    // Створення текстової області для рекомендацій
    const guidanceTextarea = document.createElement('textarea');
    guidanceTextarea.name = 'guidance';
    guidanceTextarea.id = 'guidance';
    guidanceTextarea.placeholder = 'Enter nutrition guidance';
    form.appendChild(guidanceTextarea);

    // Додаємо кнопку відправки форми
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Submit';
    form.appendChild(submitButton);

    // Додаємо кнопку скасування
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.innerText = 'Cancel';
    cancelButton.addEventListener('click', closeModal);
    form.appendChild(cancelButton);

    // Додаємо форму до модального вікна
    modal.appendChild(form);

    // Додаємо слухача подій для відправки форми
    form.addEventListener('submit', handleSubmitNutrition);

    // Додаємо модальне вікно до body
    document.body.appendChild(modal);
};

// Функція для отримання `request_id` з сервера
const fetchRequestId = async (clientId, trainerId) => {
    try {
        // Переконайтеся, що clientId та trainerId не є порожніми
        if (!clientId || !trainerId) {
            console.error('Client ID і Trainer ID повинні бути вказані');
            return null;
        }

        const response = await fetch('/get-request-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clientId, trainerId }),
        });

        // Перевірка статусу відповіді
        if (!response.ok) {
            console.error(`Помилка отримання request_id: статус ${response.status} - ${response.statusText}`);
            return null;
        }

        const data = await response.json();

        // Перевірка наявності requestId у відповіді
        if (!data.requestId) {
            console.error('requestId не присутній у відповіді');
            return null;
        }

        return data.requestId;
    } catch (error) {
        console.error('Помилка отримання request_id:', error);
        return null;
    }
};

// Функція для показу модального вікна та отримання `request_id`
// Функція для показу модального вікна та отримання `request_id`
const showNutritions = async (event) => {
    event.preventDefault(); // Запобігає перезавантаженню сторінки

    // Отримуємо елемент кнопки, що викликала подію
    const button = event.currentTarget;

    // Отримуємо clientId з атрибута кнопки `data-client-id`
    const clientId = button.getAttribute('data-client-id');
    
    // Перевірка, чи clientId отримано успішно
    if (!clientId) {
        console.error('Помилка: не вказано client_id у кнопці');
        return;
    }

    try {
        // Отримуємо trainerId за допомогою getTrainerId
        const trainerId = await getTrainerId(clientId);

        // Перевірка, що trainerId отримано успішно
        if (!trainerId) {
            console.error('Помилка отримання trainer_id');
            return;
        }

        // Отримуємо requestId за допомогою fetchRequestId
        const requestId = await fetchRequestId(clientId, trainerId);

        // Перевіряємо, чи requestId отримано успішно
        if (requestId) {
            // Відкриваємо модальне вікно
            const modal = document.querySelector('#nutritionModal');
            modal.style.display = 'block';

            // Встановлюємо requestId у формі модального вікна
            const requestIdInput = modal.querySelector('#requestId');
            requestIdInput.value = requestId;
        } else {
            console.error('Помилка отримання request_id');
        }
    } catch (error) {
        console.error('Помилка у showNutritions:', error);
    }
};


// Функція для закриття модального вікна
const closeModal = () => {
    const modal = document.querySelector('#nutritionModal');
    if (modal) {
        modal.style.display = 'none';
    }
};

// Обробник події для відправки форми з рекомендаціями
const handleSubmitNutrition = async (event) => {
    event.preventDefault(); // Запобігає перезавантаженню сторінки

    // Отримуємо форму та значення з форми
    const form = event.target;
    const requestId = form.querySelector('input[name="requestId"]').value;
    const guidance = form.querySelector('textarea[name="guidance"]').value;

    // Відправляємо POST-запит до `/nutrition-guidance` з `requestId` та рекомендацією
    try {
        const response = await fetch('/nutrition-guidance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Вказуємо, що надсилаємо JSON
            },
            body: JSON.stringify({
                requestId,
                guidance,
            }),
        });

        // Перевіряємо, чи є відповідь успішною
        if (response.ok) {
            // Закриваємо модальне вікно
            closeModal();

            // Відображаємо повідомлення про успіх (якщо потрібно)
            console.log('Nutrition guidance submitted successfully');
        } else {
            // Якщо щось пішло не так, показуємо помилку
            console.error('Error submitting nutrition guidance');
        }
    } catch (error) {
        console.error('Error submitting nutrition guidance:', error);
    }
};

// Створюємо модальне вікно після завантаження сторінки
window.addEventListener('load', createNutritionModal);

// Додаємо функцію `showNutritions` до об'єкта `window`
window.showNutritions = showNutritions;
