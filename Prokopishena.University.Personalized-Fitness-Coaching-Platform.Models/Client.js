const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');
const TrainingRequest = require('./TrainingRequest');
const User = require('./User');

const Client = sequelize.define('Client', {
    client_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    weight: {
        type: DataTypes.DECIMAL
    },
    height: {
        type: DataTypes.DECIMAL
    },
    training_goals: {
        type: DataTypes.STRING
    },
    strength_level: {
        type: DataTypes.STRING
    },
    endurance_level: {
        type: DataTypes.STRING
    },
    flexibility_level: {
        type: DataTypes.STRING
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'clients',
    timestamps: false
});

Client.hasMany(TrainingRequest, { foreignKey: 'client_id' });

module.exports = Client;
