import { gql } from 'apollo-boost'

const GET_STORES = gql`
  query {
    getStores {
      id
      name
      endpoint
      userId
    }
  }
`;

export default GET_STORES;