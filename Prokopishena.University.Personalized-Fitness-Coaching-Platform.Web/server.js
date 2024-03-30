const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/User')
const trainingController = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/controllers/trainingController')
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Маршрут для реєстрації нового користувача
app.post('/register', async (req, res) => {
  try {
    const { email, name, surname, password } = req.body;

    // Перевірка, чи користувач з таким email вже існує
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Користувач з такою поштою вже існує' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, name, surname, password_hash: hashedPassword });

    res.status(201).json({ message: 'Користувач успішно зареєстрований' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Щось пішло не так. Будь ласка, спробуйте знову.' });
  }
});

// Вхід користувача
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Знаходження користувача за email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Користувача з такою поштою не знайдено' });
    }

    // Порівняння хешу пароля користувача з хешем у базі даних
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Невірні облікові дані' });
    }

    res.status(200).json({ message: 'Ви успішно увійшли в систему' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Щось пішло не так. Будь ласка, спробуйте знову.' });
  }
});


// Маршрут для виходу користувача
//app.get('/auth/logout', authController.logoutUser);

// Статичний обробник файлів для статичних ресурсів
app.use(express.static(path.join(__dirname, 'public')));
// Маршрут для віддачі HTML сторінки
app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/exercises', trainingController.getExercises);
app.post('/training-plans', trainingController.createTrainingPlan);
// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
