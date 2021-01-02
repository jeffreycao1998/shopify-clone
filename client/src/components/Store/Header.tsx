import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  height: 78px;
  width: 100%;
  border-bottom: 1px solid lightgrey;
  background-color: white;
  padding: 0 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 750px) {
    height: 51px;
    padding: 0 24px;
  }
`;

const StoreName = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 20px;
  width: 33%;
  letter-spacing: 1.35px;
  cursor: pointer;

  a {
    text-decoration: none;
  }

  @media only screen and (max-width: 750px) {
    width: 50%;
    font-size: 18px;
  }
`;

const Actions = styled.ul`
  width: 33%;
  display: flex;
  justify-content: flex-end;
  list-style: none;

  ion-icon {
    font-size: 28px;
    padding: 10px;
    cursor: pointer;

    &:hover {
      color: #636363;
    }
  }
`;

type Props = {
  storeName: string
  storeEndpoint: string
};

const Header = ({ storeName, storeEndpoint }: Props) => {
  return (
    <Container>

      <StoreName>
        <Link to={`/store/${storeEndpoint}`}>{ storeName }</Link>
      </StoreName>
      

      <Actions>
        {/* @ts-ignore */}
        <ion-icon name="cart-outline"></ion-icon>
      </Actions>

    </Container>
  );
};

export default Header;