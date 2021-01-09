import { DataTypes } from 'sequelize';
import sequelize from '../index';

const Store = sequelize.define('store', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endpoint: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Store;