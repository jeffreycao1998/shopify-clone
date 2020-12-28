import { gql } from 'apollo-boost'

const ADD_PRODUCT = gql`
  mutation addProduct($product: AddProduct) {
    addProduct(product: $product) {
      name
    }
  }
`;

export default ADD_PRODUCT;