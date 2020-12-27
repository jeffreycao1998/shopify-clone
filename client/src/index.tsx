import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({ uri: 'http://localhost:4000/' })

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

console.log(client);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
