const { DataTypes } = require('sequelize');
const sequelize = require('../index')
const Image = require('./image');

const Product = sequelize.define('Product', {
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Product.hasMany(Image);
Image.belongsTo(Product, {foreignKey: 'ProductId', targetKey: 'id'});

module.exports = Product;