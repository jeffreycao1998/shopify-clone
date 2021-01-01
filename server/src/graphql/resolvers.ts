// Queries
import getUsersProducts from './queries/getUsersProducts';
import getUsersCollections from './queries/getUsersCollections';
import getUsersStore from './queries/getUsersStore';
import getStoreProducts from './queries/getStoreProducts';

// Mutations
import userRegister from './mutations/userRegister';
import userLogin from './mutations/userLogin';
import addProduct from './mutations/addProduct';
import addCollection from './mutations/addCollection';
import addProductsToCollection from './mutations/addProductsToCollection';
import updateActiveCollection from './mutations/updateActiveCollection';
import deleteProducts from './mutations/deleteProducts';
import deleteCollections from './mutations/deleteCollections';

const resolvers = {
  Query: {
    getUsersProducts,
    getUsersCollections,
    getUsersStore,
    getStoreProducts,
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
  }
}

export default resolvers;