import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Components
import Header from './Header';
import Navigation from './Navigation'

import Home from './Home';
import AllProducts from './Products/AllProducts';
import AddProduct from './Products/AddProduct';

const Container = styled.div`
  width: 100%;
`;

const MainContainer = styled.div`
  min-height: calc(100vh - 56px);
  width: calc(100% - 240px);
  margin: 56px 0 0 240px;
`;

const Admin = () => {
  return (
    <Container>
      <Header />
      <Navigation />

      <MainContainer>
        <Switch>
          <Route path='/admin/products/new'>
            <AddProduct />
          </Route>
          <Route path='/admin/products'>
            <AllProducts />
          </Route>
          <Route path='/admin'>
            <Home />
          </Route>
        </Switch>
      </MainContainer>
    </Container>
  )
};

export default Admin;