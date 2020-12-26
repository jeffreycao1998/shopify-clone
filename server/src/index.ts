import { Pool } from 'pg';
import { ApolloServer } from 'apollo-server';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

// Database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shopify-clone',
  password: 'postgres',
  port: 5432,
})
pool.query('SELECT NOW()', (err: any, res: any) => {
  // console.log(err, res)
  pool.end()
})

// GraphQL
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
});

server.listen().then(({ url }: { url: String }) => {
  console.log(`🚀  Server ready at ${url}`);
});