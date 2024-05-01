// Models/NutritionRecommendation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');
const TrainingRequest = require('./TrainingRequest');

const NutritionRecommendation = sequelize.define('NutritionRecommendation', {
  recommendation_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  trainer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recommendation_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  recommendation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'nutrition_recommendations',
  timestamps: false
});

module.exports = NutritionRecommendation;
