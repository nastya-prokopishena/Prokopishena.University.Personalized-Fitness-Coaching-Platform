const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');
const User = require('./User');
const Trainer = require('./Trainer')
const Client = require('./Client');



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
  }
}, {
  tableName: 'training_requests',
  timestamps: false
});



module.exports = TrainingRequest;
