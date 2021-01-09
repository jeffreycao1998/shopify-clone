import { DataTypes } from 'sequelize';
import sequelize from '../index';

const User = sequelize.define('user', {
  email: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default User;