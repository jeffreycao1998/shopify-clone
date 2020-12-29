const { DataTypes } = require('sequelize');
const sequelize = require('../index')

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

module.exports = Product;

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Product extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Product.init({
//     name: DataTypes.STRING,
//     description: DataTypes.TEXT,
//     price: DataTypes.INTEGER,
//     user_id: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Product',
//   });
//   return Product;
// };