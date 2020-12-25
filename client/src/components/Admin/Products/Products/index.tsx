import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../../../theme';

// Components
import { ContainerRounded, Button } from '../../Core';

const Container = styled.div`
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 32px 0;

  .header {
    font-size: 20px;
    font-weight: 500;
  }
`;

const ContentContainer = styled(ContainerRounded)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const Tabs = styled.ul`
  display: flex;
  margin: 1px 8px 0 8px;
  height: 52px;
  margin-bottom: 1px solid lightgrey;
`;

type TabProps = {
  selected: boolean
}

const Tab = styled.li`
  height: 100%;
  padding: 8px 16px;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid ${({selected}: TabProps) => selected ? colors.BrandGreen : 'transparent'};
  color: ${({selected}: TabProps) => selected ? colors.Ink : 'grey'};
  font-size: 14px;
  user-select: none;
  cursor: pointer;

  &:hover {
    border-bottom: 3px solid ${({selected}: TabProps) => selected ? colors.BrandGreen : 'darkgrey'};
    color: ${colors.Ink};
  }
`;

const UsersProducts = styled.div`

`;

const TableHeadings = styled.div`
  height: 56px;
  padding: 10px 0;
  display: flex;
  align-items: center;

  .selector-all {
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    input {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }

  .product-image {
    width: 83px;
  }
  .product-name {
    width: 200px;
    font-weight: 500;
    font-size: 15px;
  }
  .product-price {
    width: 100px;
    font-weight: 500;
    font-size: 15px;
  }
`;

const Product = styled.div`
  width: 100%;
  height: 88px;
  padding: 12px 0;
  border-top: 1px solid lightgrey;
  display: flex;

  .selector {
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    input {
      height: 18px;
      width: 18px;
      cursor: pointer;
    }
  }

  img {
    width: 63px;
    height: 63px;
    margin-right: 20px;
    border-radius: 3px;
    padding: 0 2px;
  }

  .text {
    display: flex;
    padding: 4px 0;

    .product-name {
      width: 200px;
    }
    .product-price {
      width: 100px;
    }
  }
`;

const Products = () => {
  const [tab, setTab] = useState('all');

  const [selectedProducts, setSelectedProducts] = useState([] as Array<string>);

  const products = [
    {
      id: '1',
      imageUrl: 'data:image/jpeg;base64,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',
      name: 'Jeff1',
      price: 910,
    },
    {
      id: '2',
      imageUrl: 'data:image/jpeg;base64,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',
      name: 'Jeff2',
      price: 1312,
    },
    {
      id: '3',
      imageUrl: 'data:image/jpeg;base64,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',
      name: 'Jeff3',
      price: 12333,
    },
    {
      id: '4',
      imageUrl: 'data:image/jpeg;base64,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',
      name: 'Jeff4',
      price: 9934,
    },
  ];

  const selectProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(prev => {
        return prev.filter(currProductId => currProductId !== productId);
      })
    } else {
      setSelectedProducts(prev => {
        return [...prev, productId];
      })
    }
  };

  const selectAllProducts = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product.id));
    }
  };

  return (
    <Container>

      <Header>
        <p className='header'>Products</p>
        <div className='add-product-btn'>
          <Link to='/admin/products/new'><Button text='Add product' color='green' /></Link>
        </div>
      </Header>

      <ContentContainer>
        <Tabs>
          <Tab selected={tab === 'all'} onClick={() => setTab('all')}>All</Tab>
          <Tab selected={tab === 'active'} onClick={() => setTab('active')}>Active</Tab>
          <Tab selected={tab === 'draft'} onClick={() => setTab('draft')}>Draft</Tab>
          <Tab selected={tab === 'archived'} onClick={() => setTab('archived')}>Archived</Tab>
        </Tabs>

        <UsersProducts>
          <TableHeadings>
            <div className='selector-all' onClick={selectAllProducts}>
              <input type='checkbox' checked={selectedProducts.length === products.length}/>
            </div>
            <span className='product-image'/>
            <h4 className='product-name'>Product</h4>
            <h4 className='product-price'>Price</h4>
          </TableHeadings>
          {
            products.map(product => {
              return (
                <Product key={product.id}>
                  <div className='selector' onClick={() => selectProduct(product.id)}>
                    <input type='checkbox' checked={selectedProducts.includes(product.id)}/>
                  </div>
                  <img src={product.imageUrl} alt={product.name}/>
                  <div className='text'>
                    <h5 className='product-name'>{product.name}</h5>
                    <h5 className='product-price'>${(product.price / 100).toFixed(2)}</h5>
                  </div>
                </Product>
              )
            })
          }
        </UsersProducts>
      </ContentContainer>

    </Container>
  )
};

export default Products;