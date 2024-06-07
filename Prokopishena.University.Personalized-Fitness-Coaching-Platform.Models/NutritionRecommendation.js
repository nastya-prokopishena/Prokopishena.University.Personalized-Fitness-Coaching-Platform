const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');
const User = require('./User'); 
const Client = require('./Client');

const NutritionRecommendation = sequelize.define('NutritionRecommendation', {
  recommendation_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: 'client_id'
    }
  },
  trainer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recommendation_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  recommendation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'nutrition_recommendations',
  timestamps: false
});

NutritionRecommendation.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });
Client.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = NutritionRecommendation;