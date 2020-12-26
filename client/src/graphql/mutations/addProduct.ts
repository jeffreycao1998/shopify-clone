import { gql } from 'apollo-boost'

const ADD_PRODUCT = gql`
  mutation addAnonMessage($sectionId: ID! ,$text: String!, $replyingTo: ID) {
    addAnonMessage(sectionId: $sectionId, text: $text, replyingTo: $replyingTo) {
      _id
      text
      createdAt
      likes
      flags
      user {
        _id
        firstName
        lastName
      }
      replyingTo {
        _id
        text
        createdAt
        user {
          _id
        }
      }
    }
  }
`;

export default ADD_PRODUCT;