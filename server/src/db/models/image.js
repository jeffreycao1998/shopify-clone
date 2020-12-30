const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const Image = sequelize.define('image', {
  dataUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Image;