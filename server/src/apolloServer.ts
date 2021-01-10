import { ApolloServer } from 'apollo-server-lambda';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import context from './graphql/context';

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