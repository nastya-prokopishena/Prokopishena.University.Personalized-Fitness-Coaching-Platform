const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');
const GoalTemplate = require('./GoalTemplate');
const Client = require('./Client')

const Goal = sequelize.define('Goal', {
    goal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'client_id'
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    goal_template_id: {
        type: DataTypes.INTEGER,
        references: {
            model: GoalTemplate,
            key: 'goal_template_id'
        }
    },
    status: {
        type: DataTypes.STRING(255),
        defaultValue: 'Not Started'
    },
    progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'goals',
    timestamps: false
});

module.exports = Goal;