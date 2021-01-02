import React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme';
import { Switch, Route } from 'react-router-dom';

// Components
import Header from './Header';
import Registration from './Registration';
import Login from './Login';

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.BrandGreenDark};
`;

const FormContainer = styled.div`
  height: calc(100vh - 60px);
  width: 100%;

`;

const Auth = () => {

  return (
    <Container>
      <Header />

      <FormContainer>
        <Switch>
          <Route path='/auth/signup'>
            <Registration />
          </Route>
          <Route path='/'>
            <Login />
          </Route>
        </Switch>
      </FormContainer>
    </Container>
  )
};

export default Auth;