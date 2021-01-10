import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Product, CartStore, CartProduct } from '../../types/types';
import { useQuery } from '@apollo/react-hooks'
import { GET_STORE, GET_STORE_PRODUCTS, GET_STORES } from '../../graphql/gql';
import { 
  Link
} from 'react-router-dom';

// Components
// import Header from './Header';
// import CatalogPage from './Pages/CatalogPage';
// import ProductDetailsPage from './Pages/ProductDetailsPage';
// import CartPage from './Pages/CartPage';
// import CheckoutSuccess from './Pages/CheckoutSuccess';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
`;

const StoresList = () => {
  const { data } = useQuery(GET_STORES);
  
  console.log(data);

  return (
    <Container>

    </Container>
  )
};

export default StoresList;