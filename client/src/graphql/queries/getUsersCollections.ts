import { gql } from 'apollo-boost'

const GET_USERS_COLLECTIONS = gql`
  query {
    getUsersCollections {
      id
      name
      description
      active
      imageUrl
    }
  }
`;

export default GET_USERS_COLLECTIONS;