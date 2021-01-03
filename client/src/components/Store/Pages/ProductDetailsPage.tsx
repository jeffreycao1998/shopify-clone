import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Product, Cart, CartProduct, CartStore } from '../../../types/types';

// Components
import Button from '../Core/Button';

const Container = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1000px;
  padding: 55px;
  background-color: white;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 750px) {
    flex-direction: column;
    padding: 24px;
  }
`;

type ImageContainerProps = {
  clientWidth: number
}

const ImageContainer = styled.div`
  height: ${({clientWidth}: ImageContainerProps) => ((clientWidth - 100) * .48 * .95) * .95 }px;
  width: ${({clientWidth}: ImageContainerProps) => ((clientWidth - 100) * .48) * .95}px;
  max-width: 364px;
  max-height: 346px;

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media only screen and (max-width: 750px) {
    height: ${({clientWidth}: ImageContainerProps) => ((clientWidth - 100) * .95) * .95 }px;
    width: ${({clientWidth}: ImageContainerProps) => (clientWidth - 100) * .95}px;
    margin-bottom: 32px;
    align-self: center;
  }
`;

const MetaInfo = styled.div`
  width: 50%;
  max-width: 364px;

  .details {
    width: 100%;
    margin-bottom: 36px;

    .name {
      margin-bottom: 12px;
    }

    .price {

    }
  }

  .action-buttons {
    width: 100%;
    margin-bottom: 48px;
  }

  @media only screen and (max-width: 750px) {
    width: 100%;
    max-width: 400px;
  }
`;

type Props = {
  product: Product
  cartProducts: Array<CartProduct>
  setCartProducts: React.Dispatch<React.SetStateAction<Array<CartProduct>>>
  storeEndpoint: string
};

const ProductDetailsPage = ({ product, cartProducts, setCartProducts, storeEndpoint }: Props) => {
  const [clientWidth, setClientWidth] = useState(document.body.clientWidth);
  window.addEventListener('resize', () => {
    setClientWidth(document.body.clientWidth);
  });

  if (!product) return null;
  
  const handleAddToCart = (product: Product) => {
    // const newCart = JSON.parse(JSON.stringify(cart));

    // let cartStore = newCart.filter((cartStore: CartStore) => cartStore.endpoint === storeEndpoint)[0];

    // // add store to cart
    // if (!cartStore) {
    //   cartStore = {
    //     endpoint: storeEndpoint,
    //     products: []
    //   };
    //   newCart.push(cartStore);
    // }

    let targetProduct = cartProducts.filter((cartProduct: CartProduct) => cartProduct.id === product.id)[0];
    let otherProducts = cartProducts.filter((cartProduct: CartProduct) => cartProduct.id !== product.id);

    // add product to cart and initialize quantity
    if (!targetProduct) {
      targetProduct = {
        ...product,
        quantity: 0
      };
    }

    targetProduct.quantity += 1;
    setCartProducts([...otherProducts, targetProduct]);
  };

  return (
    <Container>
      <ImageContainer clientWidth={clientWidth}>
        <img className='image' src={product.images[0].dataUrl} alt={product.name} />
      </ImageContainer>
      <MetaInfo>
        <div className='details'>
          <h1 className='name'>jefeff</h1>
          <h3 className='price'>$12.00</h3>
        </div>
        <div className='action-buttons'>
          <Button 
            text='ADD TO CART'
            color='white'
            onClick={() => handleAddToCart(product)}
          />
        </div>
        <p className='description'>
          { product.description }
        </p>
      </MetaInfo>
    </Container>
  );
};

export default ProductDetailsPage;