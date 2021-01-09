import { DataTypes } from 'sequelize';
import sequelize from '../index';

const Collection = sequelize.define('collection', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Collection;