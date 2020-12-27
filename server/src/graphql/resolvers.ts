// Queries
import logMessage from './queries/logMessage';

// Mutations
import addProduct from './mutations/addProduct';
import userRegister from './mutations/userRegister';

const resolvers = {
  Query: {
    logMessage,
  },
  Mutation: {
    addProduct,
    userRegister,
  }
}

export default resolvers;