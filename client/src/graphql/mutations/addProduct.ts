import { gql } from 'apollo-boost'

const ADD_PRODUCT = gql`
  mutation addProduct($product: Product) {
    addProduct(product: $product) {
      name
    }
  }
`;

export default ADD_PRODUCT;