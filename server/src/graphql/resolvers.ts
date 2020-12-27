// Queries
import logMessage from './queries/logMessage';

// Mutations
import addProduct from './mutations/addProduct';
import userRegister from './mutations/userRegister';
import userLogin from './mutations/userLogin';

const resolvers = {
  Query: {
    logMessage,
  },
  Mutation: {
    addProduct,
    userRegister,
    userLogin,
  }
}

export default resolvers;