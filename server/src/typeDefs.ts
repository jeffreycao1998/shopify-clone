import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    logMessage: Status
  }

  # type Mutation {

  # }

  type Status {
    success: Boolean
  }
`;

export default typeDefs;