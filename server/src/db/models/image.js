const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const Image = sequelize.define('Image', {
  data_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Image;