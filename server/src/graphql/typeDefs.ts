import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    logMessage: Status
  }

  type Mutation {
    addProduct(product: Product): Status
  }

  type Status {
    success: Boolean
  }

  input Image {
    url: String
    name: String
    size: Int
    id: String
  }

  input Product {
    title: String
    description: String
    images: [Image]
    price: Int
    comparePrice: Int
  }
`;

export default typeDefs;