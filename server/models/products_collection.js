'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products_Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products_Collection.init({
    product_id: DataTypes.INTEGER,
    collection_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products_Collection',
  });
  return Products_Collection;
};