const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');

const Admin = sequelize.define('Admin', {
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // Користувач може бути тільки одним адміністратором
    references: {
      model: 'users', // Посилаємось на таблицю користувачів
      key: 'user_id'
    }
  }
}, {
  tableName: 'admins',
  timestamps: false
});

module.exports = Admin;
