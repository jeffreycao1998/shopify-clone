const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Product = require('./product');
const Collection = require('./product');

const ProductsCollection = sequelize.define('productsCollection', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  collectionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

Product.belongsToMany(Collection, {
  through: ProductsCollection,
  as: 'collections',
  foreignKey: 'productId',
});

Collection.belongsToMany(Product, {
  through: ProductsCollection,
  as: 'products',
  foreginKey: 'collectionId',
});

module.exports = ProductsCollection;