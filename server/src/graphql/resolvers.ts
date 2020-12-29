// Queries
import getUsersProducts from './queries/getUsersProducts';

// Mutations
import addProduct from './mutations/addProduct';
import userRegister from './mutations/userRegister';
import userLogin from './mutations/userLogin';

const resolvers = {
  Query: {
    getUsersProducts,
  },
  Mutation: {
    addProduct,
    userRegister,
    userLogin,
  }
}

export default resolvers;