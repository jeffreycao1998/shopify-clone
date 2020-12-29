const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const Store = sequelize.define('store', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  underscored: true
});

module.exports = Store;