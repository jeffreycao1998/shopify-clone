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

const getProductsByUserId = async (userId: number) => {
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

const getActiveCollection = async (userId: number) => {
  return Collection.findOne({
    where: {
      userId,
      active: true
    }
  });
};

const createCollection = async (name: string, description: string, imageUrl: string, userId: number) => {
  const hasActiveCollection = await getActiveCollection(userId);
  
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

const getCollectionsByUserId = async (userId: number) => {
  return Collection.findAll({ where: { userId }});
};

const getProductsByCollectionId = async (collectionId: number) => {
  return ProductsCollection.findAll({
    where: { collectionId },
  })
};

const addProductToCollection = async (productId: number, collectionId: number) => {
  const productCollection = await ProductsCollection.build({
    productId: 1,
    collectionId
  });
  await productCollection.save()
  .then((data: any) => console.log(data))
  .catch((err: any) => console.log(err));
  return productCollection;
};

export {
  getUserByEmail,
  getStoreByName,
  createUser,
  createStore,
  createProduct,
  addImagesToProduct,
  getProductsByUserId,
  createCollection,
  getCollectionsByUserId,
  getProductsByCollectionId,
  addProductToCollection,
}