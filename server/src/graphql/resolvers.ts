import logMessage from './queries/logMessage';
import addProduct from './mutations/addProduct';

const resolvers = {
  Query: {
    logMessage,
  },
  Mutation: {
    addProduct,
  }
}

export default resolvers;