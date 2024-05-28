const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');

const PhysicalCondition = sequelize.define('PhysicalCondition', {
  client_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  strength_level: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  endurance_level: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  flexibility: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'physical_condition',
  timestamps: false
});

// Встановлення зв'язку з таблицею "clients"
PhysicalCondition.belongsTo(Client, {
  foreignKey: 'client_id',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION'
});

module.exports = PhysicalCondition;
