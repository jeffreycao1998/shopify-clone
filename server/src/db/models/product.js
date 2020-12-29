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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  underscored: true
});

Product.hasMany(Image);
Image.belongsTo(Product, {foreignKey: 'product_id', targetKey: 'id'});

module.exports = Product;