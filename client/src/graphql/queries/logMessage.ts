import { gql } from 'apollo-boost'

const LOG_MESSAGE = gql`
  query {
    logMessage {
      success
    }
  }
`;

export default LOG_MESSAGE;