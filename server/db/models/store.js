const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const Store = sequelize.define('Store', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Store;

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Store extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Store.init({
//     name: DataTypes.STRING,
//     user_id: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Store',
//   });
//   return Store;
// };