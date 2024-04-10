const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/User')
const Client = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Client')
const Trainer = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Trainer')
const Specialization = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Specialization')
const trainingController = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/controllers/trainingController');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { email, name, surname, password, date_of_birth, gender, phone_number } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ 
      email, 
      name, 
      surname, 
      password_hash: hashedPassword, 
      date_of_birth, 
      gender, 
      phone_number 
    });

    res.status(201).json({ message: 'User successfully registered' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User with this email not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ user_id: user.user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

// Create client route
app.post('/create-client', async (req, res) => {
  try {
    const { user_id } = req.body;
    const client = await Client.create({ user_id });
    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating client record' });
  }
});

// Create trainer route
app.post('/create-trainer', async (req, res) => {
  try {
    const { user_id } = req.body;
    const trainer = await Trainer.create({ user_id });
    res.status(201).json(trainer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating trainer record' });
  }
});

// Get user by user_id route
app.get('/user/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User with this ID not found' });
    }

    res.status(200).json({
      user_id: user.user_id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      date_of_birth: user.date_of_birth,
      gender: user.gender,
      phone_number: user.phone_number
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

// Get user role by user_id route
app.get('/user-role/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;

    const isClient = await Client.findOne({ where: { user_id: userId } });
    if (isClient) {
      res.status(200).json({ role: 'Client' });
      return;
    }

    const isTrainer = await Trainer.findOne({ where: { user_id: userId } });
    if (isTrainer) {
      res.status(200).json({ role: 'Trainer' });
      return;
    }

    res.status(404).json({ message: 'User role not found' });
  } catch (error) {
    console.error('Error getting user role:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

// Update user route
app.post('/update-user', async (req, res) => {
  try {
    const { userId, newName, newSurname, newEmail, newBirthdate, newPhoneNumber, newGender } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.name = newName;
    user.surname = newSurname;
    user.email = newEmail;
    user.date_of_birth = newBirthdate;
    user.phone_number = newPhoneNumber;
    user.gender = newGender;

    await user.save();

    res.status(200).send('User data updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('An error occurred. Please try again.');
  }
});
app.get('/get-client-id/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  try {
      // Отримати client_id за допомогою user_id з бази даних
      const client = await Client.findOne({ where: { user_id: userId } });
      if (!client) {
          throw new Error('Клієнт не знайдений для цього користувача');
      }
      res.json({ client_id: client.client_id });
  } catch (error) {
      console.error('Помилка отримання client_id:', error);
      res.status(500).json({ error: 'Помилка отримання client_id' });
  }
});

app.get('/get-trainer-id/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  try {
    const trainer = await Trainer.findOne({ where: { user_id: userId } });
    if (!trainer) {
      throw new Error('Trainer not found for this user');
    }
    res.json({ trainer_id: trainer.trainer_id });
  } catch (error) {
    console.error('Error getting trainer id:', error);
    res.status(500).json({ error: 'Error getting trainer id' });
  }
});

app.post('/client-profile', async (req, res) => {
  try {
    const { user_id, weight, height, training_goals, strength_level, endurance_level, flexibility_level } = req.body;

    // Перевіряємо, чи існує клієнт з даним user_id
    const existingClient = await Client.findOne({ where: { user_id } });
    

    if (existingClient) {
      // Якщо клієнт існує, оновлюємо його дані, включаючи goal і flexibility
      existingClient.weight = weight;
      existingClient.height = height;
      existingClient.training_goals = training_goals; // Оновлюємо goal
      existingClient.strength_level = strength_level;
      existingClient.endurance_level = endurance_level;
      existingClient.flexibility_level = flexibility_level; // Оновлюємо flexibility

      await existingClient.save(); // Зберігаємо оновлені дані

      res.status(200).json({ message: 'Дані успішно оновлені' });
    } else {
      // Якщо клієнт не знайдений, видаємо помилку
      res.status(404).json({ message: 'Клієнт не знайдений' });
    }
  } catch (error) {
    console.error('Помилка при оновленні даних клієнта:', error);
    res.status(500).json({ error: 'Помилка при оновленні даних клієнта' });
  }
});

app.get('/specializations', async (req, res) => {
  try {
    const specializations = await Specialization.findAll({
      attributes: ['specialization_name']
    });

    // Створюємо масив об'єктів для відправки клієнту
    const specializationData = specializations.map(specialization => ({
      name: specialization.specialization_name
    }));

    res.status(200).json(specializationData); // Надсилаємо список спеціалізацій як JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});
app.post('/trainer-profile', async (req, res) => {
  try {
    const { user_id, specializations, experience, about_trainer } = req.body;

    const existingTrainer = await Trainer.findOne({ where: { user_id } });

    if (existingTrainer) {
      existingTrainer.specialization = specializations;
      existingTrainer.experience = experience;
      existingTrainer.about_trainer = about_trainer;

      await existingTrainer.save();

      res.status(200).json({ message: 'Trainer data successfully updated' });
    } else {
      res.status(404).json({ message: 'Trainer not found for this user' });
    }
  } catch (error) {
    console.error('Error updating trainer data:', error);
    res.status(500).json({ error: 'Error updating trainer data' });
  }
});

app.get('/trainers', async (req, res) => {
  try {
    const trainers = await Trainer.findAll({
      include: User // Включаємо дані користувача в результат
    });

    if (!trainers) {
      return res.status(404).json({ message: 'No trainers found' });
    }

    // Перетворюємо результат в необхідний формат перед відправленням
    const formattedTrainers = trainers.map(trainer => ({
      trainer_id: trainer.trainer_id,
      name: trainer.User.name,
      surname: trainer.User.surname,
      email: trainer.User.email,
      date_of_birth: trainer.User.date_of_birth,
      gender: trainer.User.gender,
      phone_number: trainer.User.phone_number,
      specialization: trainer.specialization,
      experience: trainer.experience,
      about_trainer: trainer.about_trainer
    }));

    res.status(200).json(formattedTrainers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

// Отримати всіх клієнтів та їх тренувальні цілі з бази даних
app.get('/clients', async (req, res) => {
  try {
      const clients = await Client.findAll();
      res.json(clients);
  } catch (error) {
      console.error('Помилка отримання клієнтів:', error);
      res.status(500).json({ error: 'Помилка отримання клієнтів' });
  }
});
app.post('/find-trainer', async (req, res) => {
  try {
    const { clientId } = req.body;

    // Отримання спеціалізацій клієнта
    const client = await Client.findByPk(clientId);
    const clientSpecializations = client.training_goals.split(',');

    // Отримання всіх тренерів з бази даних
    const allTrainers = await Trainer.findAll();

    // Фільтруємо тренерів, залишаючи тільки тих, чиї спеціалізації містяться у спеціалізаціях клієнта
    const matchedTrainers = allTrainers.filter(trainer => {
      const trainerSpecializations = trainer.specialization.split(',');
      return clientSpecializations.some(spec => trainerSpecializations.includes(spec.trim()));
    });

    res.json(matchedTrainers);
  } catch (error) {
    console.error('Помилка при підборі тренера:', error);
    res.status(500).json({ error: 'Помилка при підборі тренера' });
  }
});


app.post('/request-training/:trainerId', async (req, res) => {
  try {
    const trainerId = Trainer.trainer_id; 
    const userId = req.body.userId; 


    res.status(200).json({ message: 'Запит на тренування надіслано успішно!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Виникла помилка під час обробки запиту' });
  }
});
app.post('/trainer/requests/:requestId/accept', async (req, res) => {
  const requestId = req.params.requestId;
  try {
    const request = await TrainingRequest.findByPk(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Запит на тренування не знайдено' });
    }
    request.status = 'accepted';
    await request.save();
    res.status(200).json({ message: 'Запит на тренування прийнятий успішно' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Сталася помилка. Спробуйте ще раз.' });
  }
});

// Маршрут для обробки запиту на відхилення запиту на тренування
app.post('/trainer/requests/:requestId/reject', async (req, res) => {
  const requestId = req.params.requestId;
  try {
    const request = await TrainingRequest.findByPk(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Запит на тренування не знайдено' });
    }
    request.status = 'rejected';
    await request.save();
    res.status(200).json({ message: 'Запит на тренування відхилений успішно' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Сталася помилка. Спробуйте ще раз.' });
  }
});

app.post('/request-training/:trainerId', async (req, res) => {
  try {
    const trainerId = req.params.trainerId; // Отримати trainerId з параметрів маршруту
    const userId = req.body.userId;

    const trainer = await Trainer.findByPk(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    res.status(200).json({ message: 'Training request sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing the request' });
  }
});
// Static file handler for public resources
app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static(path.join(__dirname, 'static')));

// Route for serving HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Exercise route
app.get('/exercises', trainingController.getExercises);

// Create training plan route
app.post('/training-plans', trainingController.createTrainingPlan);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
