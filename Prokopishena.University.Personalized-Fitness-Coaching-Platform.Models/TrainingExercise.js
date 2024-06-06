const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');
const TrainingPlan = require('./TrainingPlan');
const Exercise = require('./Exercise');

const TrainingExercise = sequelize.define('TrainingExercise', {
    training_exercise_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    plan_id: {
        type: DataTypes.INTEGER,
        references: {
            model: TrainingPlan,
            key: 'plan_id'
        }
    },
    exercise_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Exercise,
            key: 'exercise_id'
        }
    },
    repetitions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sets: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('completed', 'not completed'),
        defaultValue: 'not completed'
    }
}, {
    tableName: 'training_exercise',
    timestamps: false
});

module.exports = TrainingExercise;
