const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db'); // Імпорт sequelize

const Quote = sequelize.define('Quote', {
    quote_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quote_text: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'quotes',
  timestamps: false 
});

module.exports = Quote;
