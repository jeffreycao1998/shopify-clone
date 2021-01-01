import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks'
import { GET_STORE } from '../../graphql/gql';

const Container = styled.div`
  height: 78px;
  width: 100%;
  border-bottom: 1px solid lightgrey;
  background-color: white;
  padding: 0 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StoreName = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 20px;
  width: 33%;
  letter-spacing: 1.35px;
`;

const NavContainer = styled.ul`
  width: 33%;
  display: flex;
  justify-content: center;
  list-style: none;
`;

type NavLinkProps = {
  selected: boolean;
};

const NavLink = styled.li`
  font-size: 15px;
  text-decoration: ${({selected}: NavLinkProps) => selected ? 'underline' : 'none'};
  padding: 3px 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
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
};

const Header = ({ storeName }: Props) => {
  const [selectedTab, setSelectedTab] = useState('catalog');

  return (
    <Container>

      <StoreName>{ storeName }</StoreName>

      <NavContainer>
        <NavLink
          selected={selectedTab === 'catalog'}
          onClick={() => setSelectedTab('catalog')}
        >
          Catalog
        </NavLink>
      </NavContainer>

      <Actions>
        {/* @ts-ignore */}
        <ion-icon name="cart-outline"></ion-icon>
      </Actions>

    </Container>
  );
};

export default Header;