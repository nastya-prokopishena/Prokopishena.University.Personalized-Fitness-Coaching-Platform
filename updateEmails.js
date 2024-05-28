// updateEmails.js
const { Op } = require('sequelize');
const sequelize = require('./Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');
const User = require('./Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/User');

const updateEmails = async (sequelize) => {
  try {
    // Знаходимо всіх користувачів, які мають email з 'example.com'
    const users = await User.findAll({
      where: {
        email: {
          [Op.like]: '%example.com'
        }
      }
    });

    // Оновлюємо email-адреси для кожного користувача
    for (const user of users) {
      // Замінюємо 'example.com' на 'gmail.com' у email-адресі
      const updatedEmail = user.email.replace('example.com', 'gmail.com');
      // Оновлюємо email у базі даних
      await user.update({ email: updatedEmail }, { sequelize });
    }

    console.log(`${users.length} emails updated successfully!`);
  } catch (error) {
    console.error('Error updating emails:', error);
  }
};

// Викликаємо функцію для оновлення email-адресів користувачів
updateEmails(sequelize);
