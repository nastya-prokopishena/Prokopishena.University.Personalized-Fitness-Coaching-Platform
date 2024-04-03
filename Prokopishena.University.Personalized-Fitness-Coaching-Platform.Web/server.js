const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/User')
const Client = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Client')
const Trainer = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Trainer')
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
