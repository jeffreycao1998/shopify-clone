import 'source-map-support/register';

import { ApolloServer as LocalApolloServer } from 'apollo-server';
import { ApolloServer as LambdaApolloServer } from 'apollo-server-lambda';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import context from './context';

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

export const main = lambdaServer.createHandler({ cors: { origin: '*' }});