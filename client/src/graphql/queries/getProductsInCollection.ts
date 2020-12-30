import { gql } from 'apollo-boost'

const GET_PRODUCTS_IN_COLLECTION = gql`
  query getProductsInCollection($collectionId: Int){
    getProductsInCollection(collectionId: $collectionId) {
      id
      name
      description
      images {
        id
        data_url
      }
      price
    }
  }
`;

export default GET_PRODUCTS_IN_COLLECTION;