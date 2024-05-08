document.addEventListener('DOMContentLoaded', () => {
    // Отримати userId з localStorage
    const userId = localStorage.getItem('user_id');

    // Перевірити, чи userId не є undefined або null
    if (!userId) {
        console.error('userId не знайдено в localStorage');
        return;
    }

    // Викликати функцію fetchAndDisplayGroups для заповнення списку груп
    fetchAndDisplayGroups(userId);

    const joinButton = document.getElementById('join');
    joinButton.addEventListener('click', async () => {
        const selectRoom = document.getElementById('room');
        const selectedGroup = selectRoom.value; // Отримати обрану групу з випадаючого списку
        const groupId = selectedGroup.split(',')[0]; // Отримати group_id з рядка обраної групи
        const groupName = selectedGroup.split(',')[1]; // Отримати назву групи для відображення

        try {
            const response = await fetch(`/group-messages/${groupId}`);
            if (!response.ok) {
                console.error('Помилка отримання повідомлень:', response.status);
                return;
            }
            const messages = await response.json();
            // Відобразити повідомлення в чаті з обраної групи
            displayMessages(messages, groupName); // Передати назву групи для відображення
        } catch (error) {
            console.error('Помилка відправки запиту на сервер:', error);
        }
    });

    // Функція для відправлення повідомлень
    const sendMessage = async (messageText, groupId, userId) => {
        try {
            const response = await fetch(`/send-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messageText,
                    groupId,
                    userId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Функція для отримання та відображення повідомлень
    const displayMessages = async (groupId) => {
        try {
            const response = await fetch(`/group-messages/${groupId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const messages = await response.json();

            // Отримати посилання на елемент для відображення повідомлень
            const chatDisplay = document.querySelector('.chat-display');
            if (!chatDisplay) {
                console.error('Елемент з класом "chat-display" не знайдено в DOM');
                return;
            }

            // Очистити відображення повідомлень перед додаванням нових
            chatDisplay.innerHTML = '';

            // Додати кожне повідомлення до відображення
            messages.forEach(message => {
                const li = document.createElement('li');
                li.textContent = `${message.user_id}: ${message.message_text}`;
                chatDisplay.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching and displaying messages:', error);
        }
    };
    
});

const fetchAndDisplayGroups = async (userId) => {
    try {
        if (!userId) {
            console.error('userId не знайдено в localStorage');
            return;
        }

        // Виконати запит до сервера
        const response = await fetch(`/user/${userId}/groups`);
        if (!response.ok) {
            throw new Error('Відповідь сервера не в порядку');
        }

        // Отримати дані в форматі JSON
        const groups = await response.json();

        // Отримати посилання на елемент <select>
        const selectRoom = document.getElementById('room');
        if (!selectRoom) {
            console.error('Елемент з id "room" не знайдено в DOM');
            return;
        }

        // Очистити випадаючий список перед додаванням нових груп
        selectRoom.innerHTML = '<option value="" selected disabled hidden>Оберіть групу</option>';

        // Додати кожну групу як варіант випадаючого списку
        groups.forEach(group => {
            const option = document.createElement('option');
            option.value = group;
            option.textContent = group;
            selectRoom.appendChild(option);
        });

        if (groups.length === 0) {
            console.log('Немає груп для відображення');
        }
    } catch (error) {
        console.error('Помилка отримання груп:', error);
    }
};
