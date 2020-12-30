const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Product = require('./product');
const Collection = require('./product');

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

Product.belongsToMany(Collection, {
  through: Products_Collection,
  as: 'collections',
  foreignKey: 'product_id',
  underscored: true,
});

Collection.belongsToMany(Product, {
  through: Products_Collection,
  as: 'products',
  foreginKey: 'collection_id',
  underscored: true,
});

module.exports = Products_Collection;