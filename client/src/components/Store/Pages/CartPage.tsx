import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Product, Cart, CartProduct, CartStore } from '../../../types';
import { Link } from 'react-router-dom';

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
  border-bottom: 1px solid lightgrey;
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
        font-size: 15px;
        border-bottom: 1px solid black;
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
      text-align: center;
    }
  }
  .total {
    font-size: 14px;
  }
`;

type Props = {
  cart: Cart
  setCart: React.Dispatch<React.SetStateAction<Cart>>
  storeEndpoint: string
};

const CartPage = ({ cart, setCart, storeEndpoint }: Props) => {
  const products = cart.filter(store => store.endpoint === storeEndpoint)[0].products;
  const [quantities, setQuantities] = useState({} as any);

  function initQuantities() {
    const newQuantities = {} as any;

    products.forEach(product => {
      newQuantities[product.id] = product.quantity
    });
    setQuantities({...newQuantities});
  };

  const handleQuantityChange = (e: any, product: CartProduct) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity === 0) return;

    setQuantities((prev: any) => {
      return {
        ...prev,
        [product.id]: newQuantity
      }
    });
    product.quantity = newQuantity;
  };

  useEffect(() => {
    initQuantities();
  },[]);

  // console.log(products);
  console.log(quantities);

  return (
    <Container>
      <ContentHeader>
        <h1>Your cart</h1>
        <Link to={`/store/${storeEndpoint}`}>Continue shopping</Link>
      </ContentHeader>

      <CartSummary>
        <SummaryHeader>
          <p className='product'>PRODUCT</p>
          <p className='price'>PRICE</p>
          <p className='quantity'>QUANTITY</p>
          <p className='total'>TOTAL</p>
        </SummaryHeader>
        <ProductsContainer>
          {
            products && products.map((product: CartProduct) => {
              return (
                <ProductContainer>
                  <div className='product'>
                    <div className='image'>
                      <img src={product.images[0].dataUrl} alt={product.name}/>
                    </div>
                    <div className='name'>
                      <h3>{product.name}</h3>
                      <p>Remove</p>
                    </div>
                  </div>
                  <div className='price'>
                    <p>${product.price / 100}</p>
                  </div>
                  <div className='quantity'>
                    <input type='number' value={quantities[product.id]} onChange={(e) => handleQuantityChange(e, product)}/>
                  </div>
                  <div className='total'>
                    <p>${product.price * product.quantity / 100}</p>
                  </div>
                </ProductContainer>
              )
            })
          }
        </ProductsContainer>
      </CartSummary>
    </Container>
  );
};

export default CartPage;