const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const Collection = sequelize.define('Collection', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Collection;

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Collection extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Collection.init({
//     name: DataTypes.STRING,
//     active: DataTypes.BOOLEAN,
//     user_id: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Collection',
//   });
//   return Collection;
// };