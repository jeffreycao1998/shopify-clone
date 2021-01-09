import User from './user';
import Product from './product';
import Image from './image';
import Collection from './collection';
import ProductsCollection from './productsCollection';
import Store from './store';

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
  //@ts-ignore
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