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
        references: {
            model: Trainer,
            key: 'trainer_id'
        }
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'client_id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'incomplete'
    }
}, {
    tableName: 'training_plan',
    timestamps: false
});

module.exports = TrainingPlan;
