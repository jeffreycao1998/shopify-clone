// Queries
import GET_USERS_PRODUCTS from './queries/getUsersProducts';
import GET_USERS_COLLECTIONS from './queries/getUsersCollections';
import GET_PRODUCTS_IN_COLLECTION from './queries/getProductsInCollection';

// Mutations
import USER_REGISTER from './mutations/userRegister';
import USER_LOGIN from './mutations/userLogin';
import ADD_PRODUCT from './mutations/addProduct';
import ADD_COLLECTION from './mutations/addCollection';
import ADD_PRODUCTS_TO_COLLECTION from './mutations/addProductsToCollection';

export {
  // Queries
  GET_USERS_PRODUCTS,
  GET_USERS_COLLECTIONS,
  GET_PRODUCTS_IN_COLLECTION,

  // Mutations
  USER_REGISTER,
  USER_LOGIN,
  ADD_PRODUCT,
  ADD_COLLECTION,
  ADD_PRODUCTS_TO_COLLECTION,
}