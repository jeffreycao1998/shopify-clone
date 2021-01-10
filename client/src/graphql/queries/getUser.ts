import { gql } from 'apollo-boost'

const GET_USER = gql`
  query {
    getUser {
      email
    }
  }
`;

export default GET_USER;