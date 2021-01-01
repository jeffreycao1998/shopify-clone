import { gql } from 'apollo-boost'

const GET_STORE = gql`
  query getStore($storeEndpoint: String) {
    getStore(storeEndpoint: $storeEndpoint) {
      id
      name
      endpoint
      userId
    }
  }
`;

export default GET_STORE;