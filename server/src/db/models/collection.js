const { DataTypes } = require('sequelize');
const sequelize = require('../index')

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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},{
  underscored: true
});

module.exports = Collection;