import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    logMessage: Status
    getUsersProducts: [Product]
  }

  type Mutation {
    userRegister(email: String, password: String, storeName: String): JWT
    userLogin(email: String, password: String): JWT
    addProduct(product: AddProduct): ProductName
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

  type Image {
    id: Int
    data_url: String
  }

  type Product {
    id: Int
    name: String
    description: String
    images: [Image]
    price: Int
  }

  input AddImage {
    url: String
    name: String
    size: Int
    id: String
  }

  input AddProduct {
    name: String
    description: String
    images: [AddImage]
    price: Int
  }
`;

export default typeDefs;