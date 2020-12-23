import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// GraphQL
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

apolloClient
  .query({
    query: gql`
      query books {
        books {
          title
          author
        }
      }
    `
  })
  .then(result => console.log(result));


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
