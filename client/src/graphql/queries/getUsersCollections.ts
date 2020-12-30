import { gql } from 'apollo-boost'

const GET_USERS_COLLECTIONS = gql`
  query {
    getUsersCollections {
      id
      name
      description
      active
      image_url
    }
  }
`;

export default GET_USERS_COLLECTIONS;