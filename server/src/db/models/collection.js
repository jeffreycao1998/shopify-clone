const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const Collection = sequelize.define('collection', {
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
},{
  underscored: true
});

module.exports = Collection;