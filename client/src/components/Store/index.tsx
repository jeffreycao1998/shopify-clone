import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks'
import { GET_STORE_PRODUCTS } from '../../graphql/gql';

// Components

const Store = () => {
  const location = useLocation();
  const storeEndpoint = location.pathname.split('/')[2];

  const { data } = useQuery(GET_STORE_PRODUCTS, {
    variables: { storeEndpoint }
  });

  console.log(data);

  return (
    <div>Store Component</div>
  )
};

export default Store;