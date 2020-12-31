import { gql } from 'apollo-boost'

const UPDATE_ACTIVE_COLLECTION = gql`
  mutation updateActiveCollection($collectionId: Int) {
    updateActiveCollection(collectionId: $collectionId) {
      success
    }
  }
`;

export default UPDATE_ACTIVE_COLLECTION;