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
  const store = await Store.findOne({ 
    where: { endpoint: storeName.replace(/\s/g,'').toLowerCase() }
  });
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
    endpoint: storeName.replace(/\s/g,'').toLowerCase(),
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

const addImagesToProduct = async (dataUrls: Array<string>, productId: number) => {
  const newImages = dataUrls.map(dataUrl => {
    return {
      dataUrl,
      productId
    };
  });

  return Image.bulkCreate([...newImages]);
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

const getProductIdsByCollectionId = async (collectionId: number) => {
  const productCollections = await ProductsCollection.findAll({ where: { collectionId }});
  return productCollections.map((product: any) => product.productId);
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

const deleteUsersProducts = (productIds: Array<number>) => {
  return Product.destroy({
    where: { id: [...productIds] }
  });
};

const deleteUsersCollections = (collectionIds: Array<number>) => {
  return Collection.destroy({
    where: { id: [...collectionIds] }
  });
};

const getStoreByUserId = (userId: number) => {
  return Store.findOne({ where: { userId }});
};

const getStoreByEndpoint = (storeEndpoint: string) => {
  return Store.findOne({ where: { endpoint: storeEndpoint } });
};

const getProductsByCollectionId = (collectionId: string) => {
  return Collection.findOne({
    attributes: [],
    where: { id: collectionId },
    include: [
      {
        model: Product,
        as: 'products',
        attributes: [ 'id', 'name', 'description', 'price' ],
        through: {
          model: ProductsCollection,
          where: { collectionId }
        },
        include: [{
          model: Image,
          attributes: [ 'id', 'dataUrl' ]
        }]
      },
    ],
  }).catch((err: any) => console.log(err.message));
};

export {
  getUserByEmail,
  getStoreByName,
  getProductsByUserId,
  getActiveCollectionByUserId,
  getCollectionsByUserId,
  getStoreByUserId,
  getStoreByEndpoint,
  getCollectionByCollectionId,
  getProductIdsByCollectionId,
  getProductsByCollectionId,

  createUser,
  createStore,
  createProduct,
  createCollection,

  addImagesToProduct,
  addUsersProductsToCollection,
  
  updateUsersActiveCollection,

  deleteUsersProducts,
  deleteUsersCollections,
}