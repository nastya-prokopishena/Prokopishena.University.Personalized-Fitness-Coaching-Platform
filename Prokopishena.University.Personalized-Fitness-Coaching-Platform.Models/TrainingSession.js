const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');
const TrainingPlan = require('./TrainingPlan');

const TrainingSession = sequelize.define('TrainingSession', {
  session_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  session_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'training_sessions',
  timestamps: false
});

TrainingSession.belongsTo(TrainingPlan, { foreignKey: 'plan_id' });

module.exports = TrainingSession;
