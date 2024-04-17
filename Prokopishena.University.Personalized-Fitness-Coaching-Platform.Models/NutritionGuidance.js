const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');
const TrainingRequest = require('./TrainingRequest');

const NutritionGuidance = sequelize.define('NutritionGuidance', {
    guidance_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    request_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Переконайтеся, що це обмеження "not-null" додано
    },
    guidance: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'nutrition_guidance',
    timestamps: false // Якщо не хочете використовувати createdAt/updatedAt
});

module.exports = NutritionGuidance;