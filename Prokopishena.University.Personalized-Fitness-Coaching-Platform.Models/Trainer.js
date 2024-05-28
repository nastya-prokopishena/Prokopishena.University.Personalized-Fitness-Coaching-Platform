// Models/Trainer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');
const User = require('./User');

const Trainer = sequelize.define('Trainer', {
  trainer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  specialization: {
    type: DataTypes.STRING
  },
  experience: {
    type: DataTypes.INTEGER
  },
  about_trainer: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'trainers',
  timestamps: false
});

// Встановлюємо зв'язок між Тренером та Користувачем
Trainer.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Trainer;
