import db from './index';

// Get User by Email
const getUserByEmail = async (email: string) => {
  return db.query(`
    SELECT * FROM users
    WHERE email=$1;
  `, [email]);
};

// Get Store by Name
const getStoreByName = async (storeName: string) => {
  return db.query(`
    SELECT * FROM stores
    WHERE name=$1;
  `, [storeName]);
};

// Create User
const createUser = async (email: string, hash: string) => {
  return db.query(`
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING *;
  `, [email, hash]);
};

// Create Store
const createStore = async (storeName: string, userId: string) => {
  return db.query(`
    INSERT INTO stores (name, user_id)
    VALUES ($1, $2);
  `, [storeName, userId])
}

export {
  getUserByEmail,
  getStoreByName,
  createUser,
  createStore,
}