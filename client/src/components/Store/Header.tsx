import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CartProduct } from '../../types/types';

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
`;

const CartContainer = styled(Link)`
  position: relative;
  cursor: pointer;

  &:hover {
    ion-icon {
      color: #636363;
    }
  }

  ion-icon {
    font-size: 28px;
    padding: 10px;

    
  }

  .total-items {
    position: absolute;
    right: 8px;
    top: 8px;
    background-color: black;
    color: white;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 600;
    height: 15px;
    width: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

type Props = {
  storeName: string
  storeEndpoint: string
  cartProducts: Array<CartProduct>
};

const Header = ({ storeName, storeEndpoint, cartProducts }: Props) => {
  const totalCartItems = cartProducts.reduce((total, cartProduct: CartProduct) => {
    return total + cartProduct.quantity;
  },0);

  return (
    <Container>

      <StoreName>
        <Link to={`/store/${storeEndpoint}`}>{ storeName }</Link>
      </StoreName>
      
      <Actions>
        <CartContainer to={`/store/${storeEndpoint}/cart`}>
          {/* @ts-ignore */}
          <ion-icon name="cart-outline"></ion-icon>
          {
            totalCartItems > 0
            ? <p className='total-items'>{totalCartItems}</p>
            : null
          }
        </CartContainer>
      </Actions>

    </Container>
  );
};

export default Header;