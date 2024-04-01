// Models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  name: {
    type: DataTypes.STRING
  },
  surname: {
    type: DataTypes.STRING
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_of_birth: {
    type: DataTypes.DATEONLY 
  },
  gender: {
    type: DataTypes.STRING
  },
  phone_number: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
