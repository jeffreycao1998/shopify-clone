import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Product } from '../../../types/types';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const ContentHeader = styled.div`
  height: 152px;
  width: 100%;
  border-bottom: 1px solid lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 750px) {
    height: 108px;
  }
`;

const ActionBar = styled.div`
  height: 55px;
  padding: 0 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgrey;

  .total-products {
    font-size: 13px;
    font-style: italic;
  }
`;

const ProductsContainer = styled.div`
  background-color: white;
  padding: 55px;
  border-bottom: 1px solid lightgrey;
  display: flex;
  flex-wrap: wrap;
`;

const ProductContainer = styled(Link)`
  margin: 0 35px 35px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    .image {
      opacity: 0.7;
    }

    .name {
      border-bottom: 1px solid black;
    }
  }

  .image {
    width: 185px;
    height: 185px;
    object-fit: cover;
    margin-bottom: 12px;
  }

  .name {
    display: inline-block;
    line-height: 94%;
    border-bottom: 1px solid transparent;
    margin-bottom: 3px;
  }
`;

type Props = {
  storeEndpoint: string
  products: Array<Product>
};

const CatalogPage = ({ storeEndpoint, products }: Props) => {
  if (!products) return null;

  return (
    <Container>
      <ContentHeader>
        <h1>Products</h1>
      </ContentHeader>

      <ActionBar>
        <div></div>
        <p className='total-products'>{ products.length } product(s)</p>
      </ActionBar>

      <ProductsContainer>
        {
          products.map((product: Product) => {
            return (
              <ProductContainer 
                key={product.id}
                to={`/store/${storeEndpoint}/${product.id}`}
              >
                <img className='image' src={product.images[0].dataUrl} alt={product.name}/>
                <h4 className='name'>{ product.name }</h4>
                <h4 className='price'>${(product.price / 100).toFixed(2)}</h4>
              </ProductContainer>
            );
          })
        }
      </ProductsContainer>

    </Container>
  );
};

export default CatalogPage;