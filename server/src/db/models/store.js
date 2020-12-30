const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const Store = sequelize.define('store', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Store;