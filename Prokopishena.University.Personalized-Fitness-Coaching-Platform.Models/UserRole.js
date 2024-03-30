// Models/UserRole.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');

const UserRole = sequelize.define('UserRole', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'userRoles',
  timestamps: false
});

module.exports = UserRole;
