const User = require('./user');
const Product = require('./product');
const Image = require('./image');
const Collection = require('./collection');
const ProductsCollection = require('./productsCollection');
const Store = require('./store');

Product.belongsToMany(Collection, {
  through: ProductsCollection,
  as: 'collections',
  foreignKey: 'collectionId',
});

Collection.belongsToMany(Product, {
  through: ProductsCollection,
  as: 'products',
  foreginKey: 'productId',
});

export {
  User,
  Product,
  Image,
  Collection,
  ProductsCollection,
  Store
};