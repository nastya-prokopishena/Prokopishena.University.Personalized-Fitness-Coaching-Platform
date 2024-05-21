const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');
const Trainer = require('./Trainer');
const Client = require('./Client');

const TrainingPlan = sequelize.define('TrainingPlan', {
  plan_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  trainer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  plan_duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  trainings_per_week: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'training_plan',
  timestamps: false
});

TrainingPlan.belongsTo(Trainer, { foreignKey: 'trainer_id' });
TrainingPlan.belongsTo(Client, { foreignKey: 'client_id' });

module.exports = TrainingPlan;
