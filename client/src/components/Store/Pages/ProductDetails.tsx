import React from 'react';
import styled from 'styled-components';
import { Product } from '../../../types';

const Container = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1100px;
  padding: 55px;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const ImageContainer = styled.div`
  
`;

type Props = {
  product: Product
};

const ProductDetails = ({ product }: Props) => {
  console.log(product);

  return (
    <Container>
      <ImageContainer>

      </ImageContainer>
    </Container>
  );
};

export default ProductDetails;