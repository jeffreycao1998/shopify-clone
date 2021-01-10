import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';

const Container = styled.div`
  height: 60px;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;

  ion-icon {
    font-size: 32px;
    color: white;
    margin-right: 8px;
  }
`;

const Navigation = styled.ul`
  display: flex;
`;

const Nav = styled(Link)`
  color: lightgrey;
  text-decoration: none;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  margin-left: 24px;

  &:hover {
    color: white;
  }
`;

const Registration = () => {
  return (
    <Container>
      <Logo to='/auth/login'>
        {/* @ts-ignore */}
        <ion-icon name="aperture"></ion-icon>
        shopifyclone
      </Logo>

      <Navigation>
        <Nav to='/stores'>
          Stores
        </Nav>
        <Switch>
          <Route path='/auth/signup'>
            <Nav to='/auth/login'>
              Login
            </Nav>
          </Route>
          <Route path='/'>
            <Nav to='/auth/signup'>
              Register
            </Nav>
          </Route>
        </Switch>
      </Navigation>
    </Container>
  )
};

export default Registration;