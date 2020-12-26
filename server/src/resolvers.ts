const resolvers = {
  Query: {
    logMessage: require('./queries/logMessage'),
  }
}

export default resolvers;