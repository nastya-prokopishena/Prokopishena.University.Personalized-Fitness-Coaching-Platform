// controllers/exercisesController.js
const Exercise = require('../../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Exercise');
const TrainingPlan = require('../../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/TrainingPlan');
const User = require('../../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/User');

// POST route to create a new training plan
exports.getExercises = async (req, res) => {
    try {
      const exercises = await Exercise.findAll();
      res.json(exercises);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // POST route to create a new training plan
  exports.createTrainingPlan = async (req, res) => {
    const { trainerName, clientName, exerciseName, repetitions, sets, scheduleDate } = req.body;
    try {
      // Отримати ID тренера за його user_name
      const trainer = await User.findOne({ where: { user_name: trainerName } });
      const trainerId = trainer ? trainer.user_id : null;
  
      // Отримати ID клієнта за його user_name
      const client = await User.findOne({ where: { user_name: clientName } });
      const clientId = client ? client.user_id : null;
  
      // Отримати ID вправи за її назвою
      const exercise = await Exercise.findOne({ where: { exercise_name: exerciseName } });
      const exerciseId = exercise ? exercise.exercise_id : null;
  
      if (!trainerId || !clientId || !exerciseId) {
        return res.status(400).json({ error: 'Invalid trainer, client, or exercise' });
      }
  
      const newPlan = await TrainingPlan.create({
        trainer_id: trainerId,
        client_id: clientId,
        exercise_id: exerciseId,
        repetitions: repetitions,
        sets: sets,
        schedule_date: scheduleDate
      });
  
      res.json(newPlan);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  };