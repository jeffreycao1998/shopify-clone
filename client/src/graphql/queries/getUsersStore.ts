import { gql } from 'apollo-boost'

const GET_USERS_STORE = gql`
  query {
    getUsersStore {
      id
      name
      endpoint
      userId
    }
  }
`;

export default GET_USERS_STORE;