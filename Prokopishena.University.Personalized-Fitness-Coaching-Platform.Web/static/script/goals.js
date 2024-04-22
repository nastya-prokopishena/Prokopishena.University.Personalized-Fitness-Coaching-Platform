// Завантаження шаблонів цілей з API
export const loadGoalTemplates = async () => {
    try {
        const response = await fetch('/api/goal-templates');
        
        if (!response.ok) {
            throw new Error('Помилка під час отримання шаблонів цілей');
        }
        
        const templates = await response.json();
        const goalTemplateSelect = document.getElementById('goal-template');

        templates.forEach(template => {
            const option = document.createElement('option');
            option.value = template.goal_template_id;
            option.innerText = template.name;
            goalTemplateSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Помилка під час завантаження шаблонів цілей:', error);
    }
};

// Створення нової цілі
export const createGoal = async (clientId, description, templateId) => {
    try {
        const response = await fetch('/api/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                description,
                goal_template_id: templateId
            })
        });

        if (!response.ok) {
            throw new Error('Помилка під час створення цілі');
        }

        return await response.json();
    } catch (error) {
        console.error('Помилка під час створення цілі:', error);
        throw error;
    }
};

// Перевірка ролі користувача
export const checkUserRole = async (userId) => {
    try {
        const response = await fetch(`/user-role/${userId}`);
        
        if (!response.ok) {
            throw new Error('Помилка отримання ролі користувача');
        }
        
        const data = await response.json();
        document.getElementById('display-role').innerText = data.role;
        return data.role;
    } catch (error) {
        console.error('Помилка отримання ролі користувача:', error);
        throw error;
    }
};
