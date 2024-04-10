// Models/TrainingRequest.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');
const User = require('./User');
const Trainer = require('./Trainer')


const TrainingRequest = sequelize.define('TrainingRequest', {
  request_id: {
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
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'training_requests',
  timestamps: false
});

// Встановлюємо зв'язок між запитом на тренування, клієнтом та тренером
TrainingRequest.belongsTo(User, { foreignKey: 'client_id', as: 'Client' });
TrainingRequest.belongsTo(User, { foreignKey: 'trainer_id', as: 'Trainer' });

module.exports = TrainingRequest;
