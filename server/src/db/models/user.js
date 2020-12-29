const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const User = sequelize.define('User', {
  email: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;