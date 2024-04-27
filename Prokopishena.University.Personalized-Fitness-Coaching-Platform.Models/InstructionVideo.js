
const { DataTypes } = require('sequelize');
const sequelize = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Core/db');

const InstructionVideo = sequelize.define('InstructionVideo', {
  video_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  youtube_url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'instruction_videos',
  timestamps: false
});

module.exports = InstructionVideo;
