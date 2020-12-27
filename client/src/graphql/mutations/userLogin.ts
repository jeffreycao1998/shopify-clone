import { gql } from 'apollo-boost'

const USER_LOGIN = gql`
  mutation userLogin($email: String, $password: String) {
    userLogin(email: $email, password: $password) {
      token
    }
  }
`;

export default USER_LOGIN;