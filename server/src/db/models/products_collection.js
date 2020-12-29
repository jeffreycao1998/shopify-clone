const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const Products_Collection = sequelize.define('products_collection', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  collection_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},{
  underscored: true
});

module.exports = Products_Collection;