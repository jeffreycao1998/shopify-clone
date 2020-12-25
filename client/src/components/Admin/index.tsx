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
import Products from './Products/Products';
import AddProduct from './Products/AddProduct';
import CreateCollection from './Products/CreateCollection';
import Collections from './Products/Collections';

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

          {/* Products */}
          <Route exact path='/admin/products'>
            <Products />
          </Route>
          <Route exact path='/admin/products/new'>
            <AddProduct />
          </Route>

          {/* Collections */}
          <Route exact path='/admin/collections'>
            <Collections />
          </Route>
          <Route exact path='/admin/collections/new'>
            <CreateCollection />
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