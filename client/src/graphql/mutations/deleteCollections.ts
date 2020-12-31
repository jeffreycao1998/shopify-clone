import { gql } from 'apollo-boost'

const DELETE_COLLECTIONS = gql`
  mutation deleteCollections($collectionIds: [Int]) {
    deleteCollections(collectionIds: $collectionIds) {
      amount
    }
  }
`;

export default DELETE_COLLECTIONS;