import { Model } from "sequelize/types";

const { Sequelize, DataTypes } = require('sequelize');

const user = 'postgres'
const host = 'localhost'
const database = 'shopify-clone'
const pass = 'postgres'
const port = 5432

const sequelize = new Sequelize(`postgres://${user}:${pass}@${host}:${port}/${database}`);

const User = sequelize.define('User', {
  email: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false
  }
});
const Product = sequelize.define('Product', {
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
const Image = sequelize.define('Image', {
  data_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
const Collection = sequelize.define('Collection', {
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
});
const Product_Collection = sequelize.define('Products_Collection', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  collection_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});
const Store = sequelize.define('Store', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// drop all tables
// sequelize.drop();

module.exports = {
  User,
  Product,
  Image,
  Collection,
  Product_Collection,
  Store
};