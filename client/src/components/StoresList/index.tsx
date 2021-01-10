import React from 'react';
import styled from 'styled-components';
import { Store } from '../../types/types';
import { useQuery } from '@apollo/react-hooks'
import { GET_STORES } from '../../graphql/gql';
import { 
  Link
} from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  padding: 50px;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const StoreLink = styled.li`
  list-style-type: square;
  margin-bottom: 8px;
`;

const StoresList = () => {
  const { data: storeList } = useQuery(GET_STORES);

  return (
    <Container>
      <Title>Check out one of these amazing stores!</Title>
      { 
        storeList && storeList.getStores.map((store: Store) => {
          return (
            <StoreLink key={store.id}>
              <Link to={`/store/${store.endpoint}`}>{ store.name }</Link>
            </StoreLink>
          )
        })
      }
    </Container>
  )
};

export default StoresList;