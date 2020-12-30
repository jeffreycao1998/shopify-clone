// Queries
import getUsersProducts from './queries/getUsersProducts';

// Mutations
import userRegister from './mutations/userRegister';
import userLogin from './mutations/userLogin';
import addProduct from './mutations/addProduct';
import addCollection from './mutations/addCollection';

const resolvers = {
  Query: {
    getUsersProducts,
  },
  Mutation: {
    userRegister,
    userLogin,
    addProduct,
    addCollection,
  }
}

export default resolvers;