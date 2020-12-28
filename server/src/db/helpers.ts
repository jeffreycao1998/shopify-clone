import db from './index';
import {
  Image
} from '../types';

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
};

const createProduct = async (title: string, description: string, price: number, userId: number) => {
  return db.query(`
    INSERT INTO products (name, description, price, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `, [title, description, price, userId])
};

const addImagesToProduct = (dataUrl: string, productId: number) => {
  return db.query(`
    INSERT INTO images (data_url, product_id)
    VALUES ($1, $2)
    RETURNING *;
  `, [dataUrl, productId])
};

export {
  getUserByEmail,
  getStoreByName,
  createUser,
  createStore,
  createProduct,
  addImagesToProduct
}