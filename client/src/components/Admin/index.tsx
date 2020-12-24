import React from 'react';
import styled from 'styled-components';

// Components
import Header from './Header';
import Navigation from './Navigation'
import Home from './Home';
import Products from './Products';

const Container = styled.div`
  width: 100%;
`;

const MainContainer = styled.div`
  height: calc(100vh - 56px);
  width: 100%;
  margin-top: 56px;
  /* background-color: blue; */
`;

const Admin = () => {
  return (
    <Container>
      <Header />

      <MainContainer>
        <Navigation></Navigation>
      </MainContainer>
    </Container>
  )
};

export default Admin;