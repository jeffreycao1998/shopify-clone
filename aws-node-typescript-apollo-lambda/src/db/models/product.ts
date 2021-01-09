import { DataTypes } from 'sequelize';
import sequelize from '../index';

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

export default Product;