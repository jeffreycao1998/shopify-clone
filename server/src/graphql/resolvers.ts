// Queries
import getUsersProducts from './queries/getUsersProducts';
import getUsersCollections from './queries/getUsersCollections';
import getProductsInCollection from './queries/getProductsInCollections';

// Mutations
import userRegister from './mutations/userRegister';
import userLogin from './mutations/userLogin';
import addProduct from './mutations/addProduct';
import addCollection from './mutations/addCollection';
import addProductsToCollection from './mutations/addProductsToCollection';
import updateActiveCollection from './mutations/updateActiveCollection';
import deleteProducts from './mutations/deleteProducts';

const resolvers = {
  Query: {
    getUsersProducts,
    getUsersCollections,
    getProductsInCollection,
  },
  Mutation: {
    userRegister,
    userLogin,
    addProduct,
    addCollection,
    addProductsToCollection,
    updateActiveCollection,
    deleteProducts,
  }
}

export default resolvers;