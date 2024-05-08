const Client = require('./Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Client');
const User = require('./Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/User');

// Варіанти training_goals
const trainingGoals = [
    "Cardiovascular training",
    "Strength training",
    "Endurance training",
    "HIIT (High-Intensity Interval Training)",
    "Yoga",
    "Pilates",
    "CrossFit",
    "Weightlifting",
    "Circuit training",
    "Functional training",
    "Bodybuilding",
    "Kickboxing",
    "Martial arts",
    "Zumba",
    "Spinning",
    "Swimming",
    "Running",
    "Cycling"
];

// Варіанти рівня сили
const strengthLevels = ["Low", "Medium", "High"];

// Варіанти рівня витривалості
const enduranceLevels = ["Low", "Medium", "High"];

// Варіанти рівня гнучкості
const flexibilityLevels = ["Beginner", "Intermediate", "Advanced"];

// Функція для генерації випадкового значення в межах діапазону
const getRandomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Змінено Math.random() на Math.floor() для отримання цілих чисел
};

const updateClients = async () => {
    try {
        const clients = await Client.findAll({
            where: {
                weight: null,
                height: null,
                training_goals: null,
                strength_level: null,
                endurance_level: null,
                flexibility_level: null
            },
            include: [{ model: User }]
        });

        for (const client of clients) {
            const height = getRandomInRange(150, 190); // Змінено на Math.floor() для отримання цілих чисел
            const weight = getRandomInRange(55, 140); // Змінено на Math.floor() для отримання цілих чисел
            const trainingGoal = trainingGoals[Math.floor(Math.random() * trainingGoals.length)];
            const strengthLevel = strengthLevels[Math.floor(Math.random() * strengthLevels.length)];
            const enduranceLevel = enduranceLevels[Math.floor(Math.random() * enduranceLevels.length)];
            const flexibilityLevel = flexibilityLevels[Math.floor(Math.random() * flexibilityLevels.length)];

            await client.update({
                weight,
                height,
                training_goals: trainingGoal,
                strength_level: strengthLevel,
                endurance_level: enduranceLevel,
                flexibility_level: flexibilityLevel
            });
        }

        console.log(`${clients.length} clients updated successfully!`);
    } catch (error) {
        console.error('Error updating clients:', error);
    }
};

// Викликаємо функцію для оновлення клієнтів
updateClients();
