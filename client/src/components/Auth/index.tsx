import React from 'react';
import styled from 'styled-components';
import cookies from 'js-cookie';
import { colors } from '../../theme';
import { Switch, Route, useHistory } from 'react-router-dom';

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
  const history = useHistory();

  // check if user is already logged in
  const jwt = cookies.get('jwt');
  if (jwt) {
    history.push('/admin');
    return null;
  };

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