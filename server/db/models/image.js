const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const Image = sequelize.define('Image', {
  data_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Image;

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Image extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Image.init({
//     data_url: DataTypes.TEXT,
//     product_id: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Image',
//   });
//   return Image;
// };