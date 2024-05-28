const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');
const TrainingSession = require('./TrainingSession');
const Exercise = require('./Exercise');

const TrainingExercise = sequelize.define('TrainingExercise', {
  training_exercise_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  session_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  exercise_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  repetitions: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'training_exercises',
  timestamps: false
});

TrainingExercise.belongsTo(TrainingSession, { foreignKey: 'session_id' });
TrainingExercise.belongsTo(Exercise, { foreignKey: 'exercise_id' });

module.exports = TrainingExercise;
