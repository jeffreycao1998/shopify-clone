import React from 'react';
import styled from 'styled-components';
import cookies from 'js-cookie';
import { useQuery } from '@apollo/react-hooks'
import { GET_USERS_STORE } from '../../graphql/gql';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

// Components
import Header from './Header';
import Navigation from './Navigation'

import Home from './Home';
import Products from './Products/AllProducts';
import AddProduct from './Products/AddProduct';
import AddCollection from './Products/AddCollection';
import Collections from './Products/AllCollections';

const Container = styled.div`
  width: 100%;
`;

const MainContainer = styled.div`
  min-height: calc(100vh - 56px);
  width: calc(100% - 240px);
  margin: 56px 0 0 240px;
`;

const Admin = () => {
  const history = useHistory();
  const { data } = useQuery(GET_USERS_STORE);

  const jwt = cookies.get('jwt');
  if (!jwt) {
    history.push('/auth/login');
    return null;
  }
  
  return (
    <Container>

      <Header storeName={ data && data.getUsersStore.name }/>
      <Navigation storeEndpoint={ data && data.getUsersStore.endpoint }/>

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
            <AddCollection />
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