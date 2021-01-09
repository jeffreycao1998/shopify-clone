import { DataTypes } from 'sequelize';
import sequelize from '../index';

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

export default ProductsCollection;