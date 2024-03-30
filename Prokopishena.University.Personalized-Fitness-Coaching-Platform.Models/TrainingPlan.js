// models/TrainingPlan.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');

class TrainingPlan extends Model {}

TrainingPlan.init({
  repetitions: {
    type: DataTypes.INTEGER
  },
  sets: {
    type: DataTypes.INTEGER
  },
  schedule_date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'trainingPlans'
});

module.exports = TrainingPlan;
