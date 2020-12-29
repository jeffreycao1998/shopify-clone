const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const Products_Collection = sequelize.define('Products_Collection', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  collection_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

module.exports = Products_Collection;