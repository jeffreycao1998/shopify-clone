import { gql } from 'apollo-boost'

const GET_STORE_PRODUCTS = gql`
  query getStoreProducts($storeEndpoint: String){
    getStoreProducts(storeEndpoint: $storeEndpoint) {
      id
      name
      description
      images {
        id
        dataUrl
      }
      price
    }
  }
`;

export default GET_STORE_PRODUCTS;