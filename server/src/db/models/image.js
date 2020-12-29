const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const Image = sequelize.define('image', {
  data_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},{
  underscored: true
});

module.exports = Image;