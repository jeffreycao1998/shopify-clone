import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    logMessage: Status
  }

  type Mutation {
    addProduct(product: Product): ProductName
    userRegister(email: String, password: String, storeName: String): JWT
    userLogin(email: String, password: String): JWT
  }

  type Status {
    success: Boolean
  }

  type JWT {
    token: String
  }

  type ProductName {
    name: String
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
  }
`;

export default typeDefs;