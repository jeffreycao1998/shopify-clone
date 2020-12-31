import { gql } from 'apollo-boost'

const ADD_PRODUCTS_TO_COLLECTION = gql`
  mutation addProductsToCollection($productIds: [Int], $collectionId: Int) {
    addProductsToCollection(productIds: $productIds, collectionId: $collectionId) {
      productsAdded
    }
  }
`;

export default ADD_PRODUCTS_TO_COLLECTION;