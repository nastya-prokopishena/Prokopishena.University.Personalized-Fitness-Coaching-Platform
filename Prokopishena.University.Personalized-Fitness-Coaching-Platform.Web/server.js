const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const http = require('http');
const fs = require('fs');
const path = require('path');
const User = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/User')
const Client = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Client')
const Trainer = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Trainer')
const Admin = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Admin')
const Specialization = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Specialization')
const TrainingRequest = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/TrainingRequest')
const trainingController = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/controllers/trainingController');
const NutritionRecommendation = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/NutritionRecommendation')
const GoalTemplate = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/GoalTemplate')
const Goal = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Goal')
const InstructionVideo = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/InstructionVideo')
const Quote = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Quote')
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
      return res.status(404).json({ message: 'User with this email not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Перевірка, чи є користувач адміністратором
    const isAdmin = await Admin.findOne({ where: { user_id: user.user_id } });
    if (isAdmin) {
      return res.status(200).json({ isAdmin: true });
    } else {
      return res.status(200).json({ isAdmin: false, user_id: user.user_id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});
// Create client route
app.post('/logout', async (req, res) => {
  try {
    if (req.session) {
      // видалення об'єкту сесії
      req.session.destroy(function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Something went wrong. Please try again.' });
        } else {
          return res.redirect('/');
        }
      });
    } else {
      return res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});



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
      include: User 
    });

    if (!trainers) {
      return res.status(404).json({ message: 'No trainers found' });
    }


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
                  attributes: ['name', 'surname', 'email', 'phone_number', 'gender' ], // Обираємо потрібні атрибути
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



app.post('/nutrition-recommendations', async (req, res) => {
  try {
    // Отримання даних з тіла запиту
    const { client_id, trainer_id, recommendation_text } = req.body;

    // Створення нового запису рекомендації
    const newRecommendation = await NutritionRecommendation.create({
      client_id, // Переконайтеся, що використовується client_id, який передається з фронтенду
      trainer_id,
      recommendation_text
    });

    // Відправлення успішної відповіді з новим записом рекомендації
    res.status(201).json(newRecommendation);
  } catch (error) {
    // Відправлення відповіді про помилку у випадку невдалого створення рекомендації
    console.error('Error creating nutrition recommendation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/nutrition-recommendations', async (req, res) => {
  try {
    // Отримання всіх записів з таблиці nutrition_recommendations
    const recommendations = await NutritionRecommendation.findAll();

    // Відправлення отриманих записів як відповідь
    res.json(recommendations);
  } catch (error) {
    // Відправлення відповіді про помилку у випадку невдалого запиту
    console.error('Error fetching nutrition recommendations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/nutrition-recommendations/:recommendationId', async (req, res) => {
  try {
    const { recommendationId } = req.params;

    // Знаходження запису за його ідентифікатором та видалення його
    await NutritionRecommendation.destroy({
      where: {
        recommendation_id: recommendationId
      }
    });

    // Відправлення успішної відповіді
    res.status(204).send();
  } catch (error) {
    // Відправлення відповіді про помилку у випадку невдалого видалення запису
    console.error('Error deleting nutrition recommendation:', error);
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

app.post('/instructionVideos', async (req, res) => {
  try {
    const { title, youtube_url } = req.body;

    // Створення нового InstructionVideo у базі даних
    const newInstructionVideo = await InstructionVideo.create({
      title,
      youtube_url
    });

    res.status(201).json(newInstructionVideo); // Повертаємо створений InstructionVideo
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});
app.get('/instructionVideos', async (req, res) => {
  try {
    // Отримання всіх записів з таблиці instruction_videos
    const instructionVideos = await InstructionVideo.findAll();

    res.status(200).json(instructionVideos); // Повертаємо всі InstructionVideos
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});
app.post('/quotes', async (req, res) => {
  try {
    const { quoteText } = req.body;
    
    const newQuote = await Quote.create({
      quote_text: quoteText
    });

    res.status(201).json(newQuote); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});
app.delete('/quotes/:quote_id', async (req, res) => {
  const quoteId = req.params.quote_id;

  try {
    const deletedQuote = await Quote.destroy({
      where: {
        quote_id: quoteId
      }
    });

    if (!deletedQuote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    res.status(200).json({ message: 'Quote successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

app.get('/quotes', async (req, res) => {
  try {
    const quotes = await Quote.findAll();

    res.status(200).json(quotes); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

let currentQuoteId = null;

app.get('/random-quote', async (req, res) => {
  try {
      // Count the total number of quotes in the database
      const count = await Quote.count();

      // Generate a random number between 1 and the total number of quotes
      const randomIndex = Math.floor(Math.random() * count) + 1;

      // Find a quote with the random index
      const randomQuote = await Quote.findOne({
          where: {
              quote_id: randomIndex
          }
      });

      res.status(200).json(randomQuote);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong. Please try again.' });
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