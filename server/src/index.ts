import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

// GraphQL
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
});

server.listen().then(({ url }: { url: String }) => {
  console.log(`🚀  Server ready at ${url}`);
});