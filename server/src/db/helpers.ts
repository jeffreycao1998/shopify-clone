import { 
  User,
  Product,
  Image,
  Collection,
  Product_Collection,
  Store,
} from './index';

const getUserByEmail = async (email: string) => {
//   return db.query(`
//     SELECT * FROM users
//     WHERE email=$1;
//   `, [email]);
  const users = await User.findAll();
  console.log(users);
  return users;
};

const getStoreByName = async (storeName: string) => {
//   return db.query(`
//     SELECT * FROM stores
//     WHERE name=$1;
//   `, [storeName]);
};

const createUser = async (email: string, hash: string) => {
  // return db.query(`
  //   INSERT INTO users (email, password)
  //   VALUES ($1, $2)
  //   RETURNING *;
  // `, [email, hash]);

};

const createStore = async (storeName: string, userId: string) => {
//   return db.query(`
//     INSERT INTO stores (name, user_id)
//     VALUES ($1, $2);
//   `, [storeName, userId])
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