import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    getUsersProducts: [Product]
    getUsersCollections: [Collection]
    getProductsInCollection(collectionId: Int): [Product]
  }

  type Mutation {
    userRegister(email: String, password: String, storeName: String): JWT
    userLogin(email: String, password: String): JWT
    addProduct(product: AddProduct): Name
    addCollection(collection: AddCollection): Name
    addProductsToCollection(productIds: [Int], collectionId: Int): Amount
    updateActiveCollection(collectionId: Int): Name
    deleteProducts(productIds: [Int]): Amount
    deleteCollections(collectionIds: [Int]): Amount
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

  type Amount {
    amount: Int
  }

  type Image {
    id: Int
    dataUrl: String
  }

  type Product {
    id: Int
    name: String
    description: String
    images: [Image]
    price: Int
  }

  type Collection {
    id: Int
    name: String
    description: String
    active: Boolean
    userId: Int
    imageUrl: String
  }

  input AddImage {
    dataUrl: String
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