const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const User = sequelize.define('user', {
  email: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  underscored: true
});

module.exports = User;