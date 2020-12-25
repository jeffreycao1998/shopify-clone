import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';

// GraphQL
// import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { gql } from '@apollo/client';

// const apolloClient = new ApolloClient({
//   uri: 'http://localhost:4000/',
//   cache: new InMemoryCache()
// });

// apolloClient
//   .query({
//     query: gql`
//       query books {
//         books {
//           title
//           author
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

const GlobalStyle = createGlobalStyle`
  body, html {
    background-color: #f4f4f2;
    width: 100%;
    min-height: 100vh;
    font-family: 'Inter', 'sans-serif';
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: rgb(32, 34, 35);
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
