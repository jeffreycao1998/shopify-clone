import { ApolloServer as LocalApolloServer } from 'apollo-server';
import { ApolloServer as LambdaApolloServer } from 'apollo-server-lambda';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import context from './graphql/context';

// GraphQL
const localServer = new LocalApolloServer({ 
  typeDefs, 
  resolvers,
  context
});

const lambdaServer = new LambdaApolloServer({ 
  typeDefs, 
  resolvers,
  context
});

localServer.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});

export = {
  graphql: lambdaServer.createHandler({ cors: { origin: '*' }})
}