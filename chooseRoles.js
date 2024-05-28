const User = require('./Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/User');
const Trainer = require('./Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Trainer');
const Client = require('./Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Client');
const bcrypt = require('bcrypt');

// Функція для хешування пароля
const generatePasswordHash = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Функція для призначення ролі тренера користувачу за його user_id
const assignTrainerRole = async (userId) => {
    try {
        await Trainer.create({ user_id: userId });
    } catch (error) {
        console.error('Error assigning trainer role:', error);
    }
};

// Функція для призначення ролі клієнта користувачу за його user_id
const assignClientRole = async (userId) => {
    try {
        await Client.create({ user_id: userId });
    } catch (error) {
        console.error('Error assigning client role:', error);
    }
};

// Функція для призначення ролей тренерів та клієнтів
const assignRoles = async () => {
    try {
        // Отримуємо всіх користувачів
        const users = await User.findAll();

        let trainersAssigned = 0;

        // Перевіряємо роль кожного користувача
        for (const user of users) {
            // Перевіряємо вік користувача
            const birthYear = new Date(user.date_of_birth).getFullYear();
            const age = new Date().getFullYear() - birthYear;

            // Якщо користувач має бути тренером (вік від 23 до 46 років), і тренерів ще не призначено 35
            if (age >= 23 && age <= 46 && trainersAssigned < 35) {
                await assignTrainerRole(user.user_id);
                trainersAssigned++;
            } else {
                await assignClientRole(user.user_id);
            }
        }

        console.log('Roles assigned successfully!');
    } catch (error) {
        console.error('Error assigning roles:', error);
    }
};

assignRoles();
