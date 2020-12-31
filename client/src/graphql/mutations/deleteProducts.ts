import { gql } from 'apollo-boost'

const DELETE_PRODUCTS = gql`
  mutation deleteProducts($productIds: [Int]) {
    deleteProducts(productIds: $productIds) {
      amount
    }
  }
`;

export default DELETE_PRODUCTS;