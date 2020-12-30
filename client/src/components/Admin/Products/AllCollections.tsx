import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks'
import { GET_USERS_COLLECTIONS } from '../../../graphql/gql';

// Components
import { ContainerRounded, Button } from '../Core';

const Container = styled.div`
  padding: 16px;
`;

const Collections = () => {
  const { data, loading, error } = useQuery(GET_USERS_COLLECTIONS);

  console.log(data);

  return (
    <Container>

      All Collections

    </Container>
  )
};

export default Collections;