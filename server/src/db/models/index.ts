const User = require('./user');
const Product = require('./product');
const Image = require('./image');
const Collection = require('./collection');
const ProductsCollection = require('./productsCollection');
const Store = require('./store');

Product.hasMany(Image, { onDelete: 'cascade' });
Image.belongsTo(Product, { foreignKey: 'productId', targetKey: 'id', onDelete: 'cascade'});

Product.belongsToMany(Collection, {
  through: ProductsCollection,
  as: 'collections',
  foreignKey: 'productId',
});

Collection.belongsToMany(Product, {
  through: ProductsCollection,
  as: 'products',
  foreginKey: 'collectionId',
});

const db = {
  User,
  Product,
  Image,
  Collection,
  ProductsCollection,
  Store
}

export default db;