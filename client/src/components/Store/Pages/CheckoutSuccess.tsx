import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CartProduct } from '../../../types/types';

const Container = styled.div`
  padding: 55px;
`;

type Props = {
  redirectUrl: string
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>
}

const CheckoutSuccess = ({ redirectUrl, setCartProducts }: Props) => {
  useEffect(() => {
    setCartProducts([]);
  },[]);

  return (
    <Container>
      <Link to={redirectUrl}>Click here to continue shopping!</Link>
    </Container>
  )
};

export default CheckoutSuccess;