const { 
  User,
  Product,
  Image,
  Collection,
  Product_Collection,
  Store,
} = require('./index');

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
//   return db.query(`
//     INSERT INTO products (name, description, price, user_id)
//     VALUES ($1, $2, $3, $4)
//     RETURNING *;
//   `, [name, description, price, userId])
};

const addImagesToProduct = (dataUrl: string, productId: number) => {
//   return db.query(`
//     INSERT INTO images (data_url, product_id)
//     VALUES ($1, $2)
//     RETURNING *;
//   `, [dataUrl, productId])
};

const getProductsByUserId = (userId: number) => {
//   return db.query(`
//     SELECT products.*,
//       (SELECT * FROM images GROUP BY * HAVING images.product_id=products.id) as images
//     FROM products
//     WHERE user_id=$1
//   `, [userId]);
};

export {
  getUserByEmail,
  getStoreByName,
  createUser,
  createStore,
  createProduct,
  addImagesToProduct,
  getProductsByUserId,
}