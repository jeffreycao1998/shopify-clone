import { gql } from 'apollo-boost'

const GET_USERS_PRODUCTS = gql`
  query {
    getUsersProducts {
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

export default GET_USERS_PRODUCTS;