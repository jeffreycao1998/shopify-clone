import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    getUsersProducts: [Product]
    getUsersCollections: [Collection]
    getStore(storeEndpoint: String): Store
    getStoreProducts(storeEndpoint: String): [Product]
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

  type UserId {
    userId: Int
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

  type Store {
    id: Int
    name: String
    endpoint: String
    userId: Int
  }

  input AddImage {
    dataUrl: String
    id: Int
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