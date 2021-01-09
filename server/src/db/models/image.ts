import { DataTypes } from 'sequelize';
import sequelize from '../index';

const Image = sequelize.define('image', {
  dataUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

export default Image;