const { 
  User,
  Product,
  Image,
  Collection,
  Products_Collection,
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
    user_id: userId
  });
  await store.save();
  return store;
};

const createProduct = async (name: string, description: string, price: number, userId: number) => {
  const product = await Product.build({
    name,
    description,
    price,
    user_id: userId,
  });
  await product.save();
  return product;
};

const addImagesToProduct = async (dataUrl: string, productId: number) => {
  const image = await Image.build({
    data_url: dataUrl,
    product_id: productId,
  });
  await image.save();
  return image;
};

const getProductsByUserId = async (userId: number) => {
  return Product.findAll({
    attributes: [ 'id', 'name', 'description', 'price' ],
    where: {
      user_id: userId
    },
    include: [
      {
        model: Image,
        attributes: [ 'id', 'data_url' ]
      }
    ]
  })
  .then((data: any) => data)
  .catch((err: any) => { throw err });
};

const createCollection = async (name: string, description: string, image_url: string, userId: number) => {
  const collection = await Collection.build({
    name,
    description,
    user_id: userId,
    image_url
  });
  await collection.save();
  return collection;
};

export {
  getUserByEmail,
  getStoreByName,
  createUser,
  createStore,
  createProduct,
  addImagesToProduct,
  getProductsByUserId,
  createCollection
}