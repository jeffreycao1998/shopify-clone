const { 
  User,
  Product,
  Image,
  Collection,
  ProductsCollection,
  Store,
} = require('./models');
const { ProductType, ImageType } = require('../types');

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email }});
  return user;
};

const getStoreByName = async (storeName: string) => {
  const store = await Store.findOne({ where: { name: storeName }});
  return store;
};

const createUser = async (email: string, hash: string) => {
  const user = await User.build({
    email,
    password: hash
  });
  await user.save();
  return user;
};

const createStore = async (storeName: string, userId: string) => {
  const store = await Store.build({
    name: storeName,
    userId
  });
  await store.save();
  return store;
};

const createProduct = async (name: string, description: string, price: number, userId: number) => {
  const product = await Product.build({
    name,
    description,
    price,
    userId,
  });
  await product.save();
  return product;
};

const addImagesToProduct = async (dataUrl: string, productId: number) => {
  const image = await Image.build({
    dataUrl,
    productId,
  });
  await image.save();
  return image;
};

const getProductsByUserId = (userId: number) => {
  return Product.findAll({
    attributes: [ 'id', 'name', 'description', 'price' ],
    where: { userId },
    include: [
      {
        model: Image,
        attributes: [ 'id', 'dataUrl' ]
      }
    ]
  })
  .then((data: any) => data)
  .catch((err: any) => { throw err });
};

const getActiveCollectionByUserId = (userId: number) => {
  return Collection.findOne({
    where: { 
      userId,
      active: true
    }
  });
};

const createCollection = async (name: string, description: string, imageUrl: string, userId: number) => {
  const hasActiveCollection = await getActiveCollectionByUserId(userId);
  
  const collection = await Collection.build({
    name,
    description,
    active: hasActiveCollection ? false : true,
    userId,
    imageUrl
  });
  await collection.save();
  return collection;
};

const getCollectionsByUserId = (userId: number) => {
  return Collection.findAll({ where: { userId }});
};

const getProductsByCollectionId = (collectionId: number) => {
  return ProductsCollection.findAll({
    where: { collectionId },
  })
};

const addUsersProductsToCollection = async (productIds: Array<number>, collectionId: number) => {
  const newEntries = productIds.map(productId => {
    return { productId, collectionId }
  });
  return ProductsCollection.bulkCreate([...newEntries])
};

const getCollectionByCollectionId = (collectionId: number) => {
  return Collection.findOne({ where: { id: collectionId }})
};

const updateUsersActiveCollection = async (newCollectionId: number, userId: number) => {
  // Deactivate old collection
  const activeCollection = await getActiveCollectionByUserId(userId);
  if (activeCollection) {
    activeCollection.active = false;
    await activeCollection.save();
  }
  
  // Activate new collection
  const newActiveCollection = await getCollectionByCollectionId(newCollectionId);
  newActiveCollection.active = true;
  await newActiveCollection.save();
  return newActiveCollection;
};

const deleteUsersProducts = async (productIds: Array<number>) => {
  return Product.destroy({
    where: { id: [...productIds] }
  });
};

const deleteUsersCollections = async (collectionIds: Array<number>) => {
  return Collection.destroy({
    where: { id: [...collectionIds] }
  });
};

export {
  getUserByEmail,
  getStoreByName,
  createUser,
  createStore,
  createProduct,
  addImagesToProduct,
  getProductsByUserId,
  getActiveCollectionByUserId,
  createCollection,
  getCollectionsByUserId,
  getProductsByCollectionId,
  addUsersProductsToCollection,
  getCollectionByCollectionId,
  updateUsersActiveCollection,
  deleteUsersProducts,
  deleteUsersCollections,
}