const config = require('../config/config');
const log = require('../utils/logger');
const Sequelize = require('sequelize');

exports.connect = () => {
  const sequelize = new Sequelize(`${config.dbUrl}`);
  log('Test');
  sequelize
    .authenticate()
    .then(() => {
      log('Connection has been established successfully.');
    })
    .catch((err) => {
      log('Unable to connect to the database:', err);
    });
  module.exports = sequelize;
};
