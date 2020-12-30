// Queries
import getUsersProducts from './queries/getUsersProducts';
import getUsersCollections from './queries/getUsersCollections';

// Mutations
import userRegister from './mutations/userRegister';
import userLogin from './mutations/userLogin';
import addProduct from './mutations/addProduct';
import addCollection from './mutations/addCollection';

const resolvers = {
  Query: {
    getUsersProducts,
    getUsersCollections,
  },
  Mutation: {
    userRegister,
    userLogin,
    addProduct,
    addCollection,
  }
}

export default resolvers;