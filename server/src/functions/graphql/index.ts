export default {
  handler: `${__dirname}/handler.main`,
  events: [
    {
      http: {
        path: 'graphql',
        method: 'any',
        cors: 'true',
      }
    }
  ]
}
