// models/Exercise.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');

class Exercise extends Model {}

Exercise.init({
  exercise_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'exercise'
});

module.exports = Exercise;
