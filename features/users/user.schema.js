const sequleize = require('../../database/connection');
const Sequelize = require('sequelize');

const User = sequleize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fullname: Sequelize.STRING,
  type: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  resetToken: {
    type: Sequelize.STRING,
    default: '',
  },
  active: {
    type: Sequelize.BOOLEAN,
    default: true,
  },
}, {
  timestamps: true,
});


module.exports = User;
