const Trainer = require('./Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Trainer');

// Варіанти спеціалізацій та досвіду
const specializations = [
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

// Функція для генерації випадкового тексту про тренера
const generateAboutTrainer = () => {
    const loremIpsum = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ];

    return loremIpsum[Math.floor(Math.random() * loremIpsum.length)];
};

// Функція для пошуку наявних тренерів без заповнених даних та їх оновлення
const updateTrainers = async () => {
    try {
        const trainers = await Trainer.findAll({
            where: {
                specialization: null, // Шукаємо тренерів без заповненої спеціалізації
                experience: null // Шукаємо тренерів без заповненого досвіду
            }
        });

        for (const trainer of trainers) {
            const specialization = specializations[Math.floor(Math.random() * specializations.length)]; // Випадкова спеціалізація
            const experience = Math.floor(Math.random() * 21); // Випадковий досвід від 0 до 30 років
            const aboutTrainer = generateAboutTrainer(); // Випадковий текст про тренера

            await trainer.update({ specialization, experience, about_trainer: aboutTrainer }); // Оновлюємо дані тренера
        }

        console.log(`${trainers.length} trainers updated successfully!`);
    } catch (error) {
        console.error('Error updating trainers:', error);
    }
};

// Викликаємо функцію для оновлення тренерів
updateTrainers();
