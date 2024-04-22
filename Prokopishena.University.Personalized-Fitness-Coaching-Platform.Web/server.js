const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/User')
const Client = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Client')
const Trainer = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Trainer')
const Specialization = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Specialization')
const TrainingRequest = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/TrainingRequest')
const trainingController = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/controllers/trainingController');
const NutritionGuidance = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/NutritionGuidance')
const GoalTemplate = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/GoalTemplate')
const Goal = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Goal')
const PORT = process.env.PORT || 3000;
const app = express();
const winston = require('winston');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


Client.belongsTo(User, { foreignKey: 'user_id' });
Client.hasMany(TrainingRequest, { foreignKey: 'client_id' });

// Associations for the Trainer model
Trainer.belongsTo(User, { foreignKey: 'user_id' });
Trainer.hasMany(TrainingRequest, { foreignKey: 'trainer_id' });

// Associations for the TrainingRequest model
TrainingRequest.belongsTo(Client, { foreignKey: 'client_id' });
TrainingRequest.belongsTo(Trainer, { foreignKey: 'trainer_id' });

// Створіть логер
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'login_register.log' })
  ],
});
// Registration route

app.post('/register', async (req, res) => {
  try {
    const { email, name, surname, password, date_of_birth, gender, phone_number } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.info(`Failed registration attempt: Email already exists - ${email}, IP: ${req.ip}`);
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

    logger.info(`Successful registration: ${email}, IP: ${req.ip}`);
    res.status(201).json({ message: 'User successfully registered' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.info(`Failed login attempt: User not found - ${email}, IP: ${req.ip}`);
      return res.status(404).json({ message: 'User with this email not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      logger.info(`Failed login attempt: Invalid credentials - ${email}, IP: ${req.ip}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    logger.info(`Successful login: ${email}, IP: ${req.ip}`);
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
      const existingClient = await Client.findOne({ where: { user_id: user_id } });

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
});app.get('/client/:user_id', async (req, res) => {
  const { user_id } = req.params; // Змінено userId на user_id
  try {
      const clientInfo = await Client.findOne({ where: { user_id } }); // Змінено userId на user_id
      res.json(clientInfo);
  } catch (error) {
      console.error('Error getting client information:', error);
      res.status(500).json({ message: 'Error getting client information' });
  }
});

app.get('/trainer/:user_id', async (req, res) => {
  const { user_id } = req.params; // Змінено userId на user_id
  try {
      const trainerInfo = await Trainer.findOne({ where: { user_id } }); // Змінено userId на user_id
      res.json(trainerInfo);
  } catch (error) {
      console.error('Error getting trainer information:', error);
      res.status(500).json({ message: 'Error getting trainer information' });
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
app.post('/training_requests', async (req, res) => {
  try {
      const { client_id, trainer_id } = req.body;

      // Перевірка, чи тренер вже має 15 клієнтів
      const clientCount = await TrainingRequest.count({
          where: { trainer_id }
      });

      if (clientCount >= 15) {
          return res.status(400).json({ success: false, message: 'Тренер вже має 15 клієнтів.' });
      }

      // Перевірка, чи клієнт вже має запит з цим тренером
      const existingRequest = await TrainingRequest.findOne({
          where: { client_id, trainer_id }
      });

      if (existingRequest) {
          return res.status(400).json({ success: false, message: 'Клієнт вже зробив запит з цим тренером.' });
      }

      // Створення нового запиту на тренування
      const newRequest = await TrainingRequest.create({ client_id, trainer_id });

      res.status(201).json({ success: true, message: 'Запит на тренування створено.', data: newRequest });
  } catch (error) {
      console.error('Помилка при створенні запиту на тренування:', error);
      res.status(500).json({ success: false, message: 'Помилка при створенні запиту на тренування.' });
  }
});

// Отримати всіх тренерів з бази даних
app.get('/trainers', async (req, res) => {
  try {
      // Отримати тренерів, включаючи їхні дані користувача
      const trainers = await Trainer.findAll({
          include: [{ model: User, attributes: ['name', 'surname', 'email', 'date_of_birth', 'gender', 'phone_number'] }]
      });

      // Фільтрація тренерів, які мають менше ніж 15 клієнтів
      const filteredTrainers = [];

      for (const trainer of trainers) {
          const clientCount = await TrainingRequest.count({ where: { trainer_id: trainer.trainer_id } });
          if (clientCount < 15) {
              filteredTrainers.push({
                  trainer_id: trainer.trainer_id,
                  name: trainer.User.name,
                  surname: trainer.User.surname,
                  email: trainer.User.email,
                  date_of_birth: trainer.User.date_of_birth,
                  gender: trainer.User.gender,
                  phone_number: trainer.User.phone_number,
                  specialization: trainer.specialization,
                  experience: trainer.experience,
                  about_trainer: trainer.about_trainer,
              });
          }
      }

      res.status(200).json(filteredTrainers);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

app.get('/check-existing-requests/:clientId', async (req, res) => {
  const clientId = req.params.clientId;

  try {
    // Виконуємо запит до бази даних для перевірки існуючих запитів
    const existingRequests = await TrainingRequest.findAll({
      where: {
        client_id: clientId
      }
    });

    // Перевіряємо, чи існують запити
    if (existingRequests.length > 0) {
        // Якщо запити існують, повертаємо true
        res.json({ existing_requests: true });
    } else {
        // Якщо запити не існують, повертаємо false
        res.json({ existing_requests: false });
    }
  } catch (error) {
    console.error('Error checking existing requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/trainer/:trainerId/clients', async (req, res) => {
  const trainerId = req.params.trainerId;

  // Валідація параметра тренера
  if (!trainerId) {
      return res.status(400).json({ error: 'Недійсний параметр тренера' });
  }

  try {
      // Знайти всі запити тренера з даним trainerId
      const trainingRequests = await TrainingRequest.findAll({
          where: {
              trainer_id: trainerId,
          },
          include: {
              model: Client,
              include: {
                  model: User, // Включаємо дані користувача для кожного клієнта
                  attributes: ['name', 'surname', 'email', 'phone_number', 'gender'], // Обираємо потрібні атрибути
              },
              attributes: ['weight', 'height', 'strength_level', 'endurance_level', 'flexibility_level', 'training_goals'], // Обираємо потрібні атрибути клієнта
          },
      });

      // Створюємо список клієнтів, включаючи їх імена, прізвища та іншу інформацію
      const clients = trainingRequests.map(request => {
          const client = request.Client;
          const user = client.User;
          
          return {
              client_id: client.id,
              name: user.name,
              surname: user.surname,
              email: user.email,
              phone_number: user.phone_number,
              gender: user.gender,
              weight: client.weight,
              height: client.height,
              strength_level: client.strength_level,
              endurance_level: client.endurance_level,
              flexibility_level: client.flexibility_level,
              training_goals: client.training_goals,
          };
      });

      // Відправляємо JSON-відповідь зі списком клієнтів
      res.json(clients);
  } catch (error) {
      console.error('Помилка отримання клієнтів тренера:', error);
      res.status(500).json({ error: 'Помилка отримання клієнтів тренера' });
  }
});

app.get('/trainer-for-client/:client_id', async (req, res) => {
  const { client_id } = req.params;
  try {
      const trainingRequest = await TrainingRequest.findOne({ 
          where: { client_id },
          include: [{
              model: Trainer,
              include: User
          }]
      });

      if (!trainingRequest) {
          throw new Error('Тренер не знайдений для цього клієнта');
      }

      res.json(trainingRequest.Trainer);
  } catch (error) {
      console.error('Помилка отримання тренера для клієнта:', error);
      res.status(500).json({ message: 'Помилка отримання тренера для клієнта' });
  }
});
app.post('/nutrition-guidance', async (req, res) => {
  try {
      // Отримуємо дані з тіла запиту
      const { request_id, guidance } = req.body;

      // Перевіряємо, чи вказано `request_id` та `guidance`
      if (!request_id || !guidance) {
          return res.status(400).json({
              success: false,
              message: 'Missing request_id or guidance in the request body'
          });
      }

      // Додаємо нову рекомендацію щодо харчування
      const newGuidance = await NutritionGuidance.create({
          request_id,
          guidance,
      });

      // Повертаємо статус 201 і дані нової рекомендації
      res.status(201).json({
          success: true,
          data: newGuidance,
          message: 'Nutrition guidance added successfully!'
      });
  } catch (error) {
      console.error('Error adding nutrition guidance:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to add nutrition guidance'
      });
  }
});

app.get('/get-request-id/:clientId', async (req, res) => {
  // Отримання clientId з параметрів запиту
  const clientId = req.params.clientId;
  
  // Перевірка, чи clientId не є порожнім
  if (!clientId) {
      return res.status(400).json({ error: 'Client ID must be provided' });
  }

  try {
      // Використовуємо clientId для отримання інформації про харчування
      // Замініть `getNutritionsByClientId` на вашу функцію для отримання даних харчування
      const nutritionsData = await db.getNutritionsByClientId(clientId);

      // Перевірте, чи були знайдені дані харчування
      if (!nutritionsData) {
          return res.status(404).json({ error: 'Nutritions data not found' });
      }

      // Відправляємо дані харчування у відповідь
      res.json({ nutritions: nutritionsData });
  } catch (error) {
      console.error('Error fetching nutritions data:', error);
      // Відправляємо відповідь про помилку
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/goals', async (req, res) => {
  const { client_id, description, goal_template_id } = req.body;

  try {
      const newGoal = await Goal.create({
          client_id,
          description,
          goal_template_id
      });

      res.status(201).json(newGoal);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/goals', async (req, res) => {
  const { client_id } = req.query;

  try {
      const goals = await Goal.findAll({
          where: { client_id }
      });

      res.status(200).json(goals);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/goals/:goal_id/start', async (req, res) => {
  const { goal_id } = req.params;

  try {
      await Goal.update(
          { status: 'In Progress' },
          {
              where: {
                  goal_id
              }
          }
      );

      const updatedGoal = await Goal.findByPk(goal_id);

      res.status(200).json(updatedGoal); // Повернення JSON
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/goals/:goal_id/complete', async (req, res) => {
  const { goal_id } = req.params;

  try {
      await Goal.update(
          { status: 'Completed' },
          {
              where: {
                  goal_id
              }
          }
      );

      const updatedGoal = await Goal.findByPk(goal_id);

      res.status(200).json(updatedGoal); // Повернення JSON
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/goal-templates', async (req, res) => {
  try {
      const goalTemplates = await GoalTemplate.findAll({
          attributes: ['goal_template_id', 'name']
      });

      res.json(goalTemplates);
  } catch (error) {
      console.error('Error getting goal templates:', error);
      res.status(500).json({ error: 'Error getting goal templates' });
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