import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cookies from 'js-cookie';
import { useQuery } from '@apollo/react-hooks'
import { GET_STORE, GET_USER } from '../../graphql/gql';
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
  height: calc(100vh - 56px);
  width: calc(100% - 240px);
  margin: 56px 0 0 240px;
  overflow-y: auto;

  @media only screen and (max-width: 768px) {
    margin: 56px 0 0 0;
    width: 100%;
  }
`;

const Admin = () => {
  const history = useHistory();
  const { data: storeData, refetch: refetchStore } = useQuery(GET_STORE);
  const { data: userData, refetch: refetchUser } = useQuery(GET_USER);

  const [showNavMenu, setShowNavMenu] = useState(false);

  useEffect(() => {
    refetchStore();
    refetchUser();
  },[]);

  const jwt = cookies.get('jwt');
  if (!jwt) {
    history.push('/auth/login');
    return null;
  }

  return (
    <Container>

      <Header 
        storeName={ storeData && storeData.getStore.name }
        userEmail={ userData && userData.getUser.email }
        setShowNavMenu={setShowNavMenu}
      />
      <Navigation 
        storeEndpoint={ storeData && storeData.getStore.endpoint }
        showNavMenu={showNavMenu}
        setShowNavMenu={setShowNavMenu}
      />

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