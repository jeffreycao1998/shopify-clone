import { ApolloServer } from 'apollo-server-lambda';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import context from './context';

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context
});

export default server.createHandler({ 
  cors: {
    origin: '*',
    credentials: true
  }
});