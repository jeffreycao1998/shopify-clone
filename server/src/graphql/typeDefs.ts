import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    getUsersProducts: [Product]
  }

  type Mutation {
    userRegister(email: String, password: String, storeName: String): JWT
    userLogin(email: String, password: String): JWT
    addProduct(product: AddProduct): Name
    addCollection(collection: AddCollection): Name
  }

  type Status {
    success: Boolean
  }

  type JWT {
    token: String
  }

  type Name {
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
    data_url: String
    id: String
    name: String
    size: Int
  }

  input AddProduct {
    name: String
    description: String
    images: [AddImage]
    price: Int
  }

  input AddCollection {
    name: String
    description: String
    image: AddImage
  }
`;

export default typeDefs;