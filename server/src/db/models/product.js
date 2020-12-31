const { DataTypes } = require('sequelize');
const sequelize = require('../index')
const Image = require('./image');

const Product = sequelize.define('product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Product.hasMany(Image, { onDelete: 'cascade' });
Image.belongsTo(Product, {foreignKey: 'productId', targetKey: 'id', onDelete: 'cascade'});

module.exports = Product;