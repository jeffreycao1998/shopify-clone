const { Sequelize, DataTypes } = require('sequelize');

const user = 'postgres'
const host = 'localhost'
const database = 'shopify-clone'
const password = 'postgres'
const port = 5432

const sequelize = new Sequelize(`postgres://${user}:${password}@${host}:${port}/${database}`);

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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
const Image = sequelize.define('image', {
  data_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
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
});
const Product_Collection = sequelize.define('products_collection', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  collection_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});
const Store = sequelize.define('store', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

User.sync();

export {
  User,
  Product,
  Image,
  Collection,
  Product_Collection,
  Store
};