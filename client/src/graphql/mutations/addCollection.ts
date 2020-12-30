import { gql } from 'apollo-boost'

const ADD_COLLECTION = gql`
  mutation addCollection($collection: AddCollection) {
    addCollection(collection: $collection) {
      name
    }
  }
`;

export default ADD_COLLECTION;