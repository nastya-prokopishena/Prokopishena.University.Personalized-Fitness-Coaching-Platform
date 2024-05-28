const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fitness-coaching-platform', 'prokopishena', 'Bangtan_1306', {
  host: 'fitness-platform.postgres.database.azure.com',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;

