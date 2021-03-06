// Queries
import GET_USERS_PRODUCTS from './queries/getUsersProducts';
import GET_USERS_COLLECTIONS from './queries/getUsersCollections';
import GET_STORE from './queries/getStore';
import GET_STORE_PRODUCTS from './queries/getStoreProducts';
import GET_STORES from './queries/getStores';
import GET_USER from './queries/getUser';

// Mutations
import USER_REGISTER from './mutations/userRegister';
import USER_LOGIN from './mutations/userLogin';
import ADD_PRODUCT from './mutations/addProduct';
import ADD_COLLECTION from './mutations/addCollection';
import ADD_PRODUCTS_TO_COLLECTION from './mutations/addProductsToCollection';
import UPDATE_ACTIVE_COLLECTION from './mutations/updateActiveCollection';
import DELETE_PRODUCTS from './mutations/deleteProducts';
import DELETE_COLLECTIONS from './mutations/deleteCollections';
import CREATE_STRIPE_SESSION from './mutations/createStripeSession';

export {
  // Queries
  GET_USERS_PRODUCTS,
  GET_USERS_COLLECTIONS,
  GET_STORE,
  GET_STORE_PRODUCTS,
  GET_STORES,
  GET_USER,

  // Mutations
  USER_REGISTER,
  USER_LOGIN,
  ADD_PRODUCT,
  ADD_COLLECTION,
  ADD_PRODUCTS_TO_COLLECTION,
  UPDATE_ACTIVE_COLLECTION,
  DELETE_PRODUCTS,
  DELETE_COLLECTIONS,
  CREATE_STRIPE_SESSION,
}