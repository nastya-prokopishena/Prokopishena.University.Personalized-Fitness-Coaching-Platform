const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db'); // Імпорт sequelize

const Specialization = sequelize.define('Specialization', {
   specialization_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    specialization_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'specializations',
    timestamps: false
  });
  
module.exports = Specialization;
