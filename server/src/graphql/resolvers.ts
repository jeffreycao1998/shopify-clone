// Queries
import getUsersProducts from './queries/getUsersProducts';
import getUsersCollections from './queries/getUsersCollections';
import getStore from './queries/getStore';
import getStoreProducts from './queries/getStoreProducts';
import getStores from './queries/getStores';
import getUser from './queries/getUser';

// Mutations
import userRegister from './mutations/userRegister';
import userLogin from './mutations/userLogin';
import addProduct from './mutations/addProduct';
import addCollection from './mutations/addCollection';
import addProductsToCollection from './mutations/addProductsToCollection';
import updateActiveCollection from './mutations/updateActiveCollection';
import deleteProducts from './mutations/deleteProducts';
import deleteCollections from './mutations/deleteCollections';
import createStripeSession from './mutations/createStripeSession';

const resolvers = {
  Query: {
    getUsersProducts,
    getUsersCollections,
    getStore,
    getStoreProducts,
    getStores,
    getUser,
  },
  Mutation: {
    userRegister,
    userLogin,
    addProduct,
    addCollection,
    addProductsToCollection,
    updateActiveCollection,
    deleteProducts,
    deleteCollections,
    createStripeSession,
  }
}

export default resolvers;