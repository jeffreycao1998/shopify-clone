import { gql } from 'apollo-boost'

const USER_REGISTER = gql`
  mutation userRegister($email: String, $password: String, $storeName: String) {
    userRegister(email: $email, password: $password, storeName: $storeName) {
      token
    }
  }
`;

export default USER_REGISTER;