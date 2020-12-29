const { DataTypes } = require('sequelize');
const sequelize = require('../index')

const Image = sequelize.define('Image', {
  data_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Image.findAll()
// .then(data => console.log(data))
// .catch(err => console.log(err));

module.exports = Image;