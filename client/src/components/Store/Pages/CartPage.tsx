import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import env from '../../../env.json';
import { Link } from 'react-router-dom';
import { colors } from '../../../theme';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/react-hooks'
import { CREATE_STRIPE_SESSION } from '../../../graphql/gql';
import { Product, Cart, CartProduct, CartStore } from '../../../types/types';

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 55px;
`;

const ContentHeader = styled.div`
  text-align: center;
  margin-bottom: 28px;

  h1 {
    margin-bottom: 16px;
  }

  a {
    font-size: 14px;
    border-bottom: 1px solid black;
    padding: 1px 0;
    text-decoration: none;
  }
`;

const CartSummary = styled.div`
  .product {
    width: 50%;
    display: flex;
  }
  .price {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .quantity {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .total {
    width: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const SummaryHeader = styled.div`
  padding: 28px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;

  p {
    font-size: 12px;
    letter-spacing: .5px;
  }
`;

const ProductsContainer = styled.div`
  padding: 24px 0;
  margin-bottom: 48px;
  border-bottom: 1px solid lightgrey;

  > div:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const ProductContainer = styled.div`
  display: flex;

  .product {
    .image {
      margin-right: 40px;
      width: 88px;
      height: ${88 * .95}px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .name {
      font-size: 14px;

      h3 {
        margin-bottom: 3px;
        border-bottom: 1px solid transparent;
        cursor: pointer;

        &:hover {
          border-bottom: 1px solid black;
        }
      }

      p {
        display: inline-block;
        font-size: 15px;
        border-bottom: 1px solid black;
        cursor: pointer;
      }
    }
  }

  .price {
    font-size: 14px;
  }
  .quantity {
    font-size: 16px;
    font-weight: 500;

    input {
      height: 41px;
      width: 60px;
      padding: 10px 5px;
      border: 1px solid lightgrey;
      border-radius: 2px;
      text-align: center;
    }
  }
  .total {
    font-size: 14px;
  }
`;

const CartFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Subtotal = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  .title {
    text-align: right;
  }

  .price {
    display: flex;
    justify-content: flex-end;
    min-width: 100px;
    margin-left: 48px;
    font-size: 14px;
    text-align: right;
  }
`;

const Shipping = styled.div`
  margin-bottom: 48px;
  font-size: 12px;
`;

const CheckoutBtn = styled.div`
  border-radius: 2px;
  background-color: #3d3d3d;
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 18px;
  letter-spacing: .3px;
  cursor: pointer;

  &:hover {
    background-color: #636363;
  }
`;

type Props = {
  cartProducts: Array<CartProduct>
  setCartProducts: React.Dispatch<React.SetStateAction<Array<CartProduct>>>
  storeEndpoint: string
};

const CartPage = ({ cartProducts, setCartProducts, storeEndpoint }: Props) => {
  const [createStripeSession] = useMutation(CREATE_STRIPE_SESSION);

  const handleQuantityChange = (e: any, product: CartProduct) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity === 0) return;

    setCartProducts((prev: any) => {
      const targetProduct = prev.filter((cartProduct: CartProduct) => cartProduct === product)[0];
      const otherProducts = prev.filter((cartProduct: CartProduct) => cartProduct !== product);
      targetProduct.quantity = newQuantity;
      return [...otherProducts, {...targetProduct}]
    });
  };

  const handleRemoveProduct = (product: CartProduct) => {
    const newProducts = cartProducts.filter(cartProduct => cartProduct !== product);
    setCartProducts([...newProducts]);
  };

  const handleCheckout = () => {
    const formattedCartProducts = cartProducts.map((cartProduct: CartProduct) => {
      return {
        id: cartProduct.id,
        quantity: cartProduct.quantity
      }
    });

    createStripeSession({
      variables: { 
        cartProducts: formattedCartProducts,
        successUrl: `${env.SITE_URL}/store/${storeEndpoint}/success`,
        cancelUrl: `${env.SITE_URL}/store/${storeEndpoint}`
      }
    })
    .then(async (res: any) => {
      const sessionId = res.data.createStripeSession.sessionId;
      const stripe = await loadStripe(env.STRIPE_PK);
      if (stripe) {
        stripe.redirectToCheckout({ sessionId });
      }
    })
    .catch((err: any) => {
      console.log(err.message);
    })
  };

  const subtotal = cartProducts.reduce((total, cartProduct: CartProduct) => {
    return total + cartProduct.price * cartProduct.quantity;
  },0);
  
  return (
    <Container>
      <ContentHeader>
        <h1>Your cart</h1>
        <Link to={`/store/${storeEndpoint}`}>Continue shopping</Link>
      </ContentHeader>
      {
        cartProducts.length > 0
        ? <CartSummary>
            <SummaryHeader>
              <p className='product'>PRODUCT</p>
              <p className='price'>PRICE</p>
              <p className='quantity'>QUANTITY</p>
              <p className='total'>TOTAL</p>
            </SummaryHeader>
            <ProductsContainer>
              {
                cartProducts.map((product: CartProduct) => {
                  return (
                    <ProductContainer key={product.id}>
                      <div className='product'>
                        <div className='image'>
                          <img src={product.images[0].dataUrl} alt={product.name}/>
                        </div>
                        <div className='name'>
                          <h3>{product.name}</h3>
                          <p onClick={() => handleRemoveProduct(product)}>Remove</p>
                        </div>
                      </div>
                      <div className='price'>
                        <p>${(product.price / 100).toFixed(2)}</p>
                      </div>
                      <div className='quantity'>
                        <input type='number' value={product.quantity} onChange={(e) => handleQuantityChange(e, product)}/>
                      </div>
                      <div className='total'>
                        <p>${product.price * product.quantity / 100}</p>
                      </div>
                    </ProductContainer>
                  )
                })
              }
            </ProductsContainer>
            <CartFooter>
              <Subtotal>
                <span className='title'>Subtotal</span>
                <span className='price'>${subtotal / 100}</span>
              </Subtotal>
              <Shipping>
                Taxes and shipping calculated at checkout
              </Shipping>
              <CheckoutBtn onClick={handleCheckout}>
                CHECK OUT
              </CheckoutBtn>
            </CartFooter>
          </CartSummary>
        : <div>Your cart is empty!</div>
      }
    </Container>
  );
};

export default CartPage;