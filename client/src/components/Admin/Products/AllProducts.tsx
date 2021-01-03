import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_USERS_PRODUCTS, DELETE_PRODUCTS } from '../../../graphql/gql';
import { Link } from 'react-router-dom';
import { colors } from '../../../theme';
import { Product, Message } from '../../../types/types';

// Components
import { ContainerRounded, Button, AddToCollectionsModal, Notification } from '../Core';

const Container = styled.div`
padding: 16px 32px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 16px 0;

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
  padding: 1px 8px 0 8px;
  height: 52px;
  border-bottom: 1px solid lightgrey;
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

  .actions-container {
    padding-right: 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .product-name {
    width: 200px;
    font-weight: 500;
    font-size: 14px;
  }
  .product-price {
    width: 100px;
    font-weight: 500;
    font-size: 14px;
  }
`;

const UserProduct = styled.div`
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
    height: ${63 * .95}px;
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
  const [selectedProducts, setSelectedProducts] = useState([] as Array<number>);
  const [showAddToCollectionModal, setShowAddToCollectionModal] = useState(false);
  const [message, setMessage] = useState({} as Message);

  const { data, refetch: refetchProducts } = useQuery(GET_USERS_PRODUCTS);
  const [deleteProducts] = useMutation(DELETE_PRODUCTS);

  useEffect(() => {
    refetchProducts();
  },[]);

  const products = data && data.getUsersProducts;
  
  if (!products) return null;

  const selectProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(prev => {
        return prev.filter(currProductId => currProductId !== productId);
      });
    } else {
      setSelectedProducts(prev => {
        return [...prev, productId];
      });
    }
  };

  const selectAllProducts = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product: Product) => product.id));
    }
  };

  const handleDeleteProducts = () => {
    deleteProducts({
      variables: { productIds: selectedProducts }
    })
    .then(res => {
      setSelectedProducts([]);
      refetchProducts();
      setMessage({ success: `Deleted ${res.data.deleteProducts.amount} product(s)` });
    })
    .catch(err => {
      setMessage({ error: err.message });
    });
  };
  
  return (
    <Container>

      <Header>
        <p className='header'>Products</p>
        <div className='add-product-btn'>
          <Link to='/admin/products/new'><Button text='Add product' color='green' /></Link>
        </div>
      </Header>

      <Notification message={message}/>

      <ContentContainer>
        <Tabs>
          <Tab selected={tab === 'all'} onClick={() => setTab('all')}>All</Tab>
        </Tabs>

        <UsersProducts>
          <TableHeadings>
            <div className='selector-all' onClick={selectAllProducts}>
              <input type='checkbox' checked={selectedProducts.length === products.length}/>
            </div>
            <span className='product-image'/>
            {
              selectedProducts.length > 0
              ? 
                <div className='actions-container'>
                  <div className='add-to-collection-btn'>
                    <Button
                      text='Add to collection'
                      color='white'
                      onClick={() => setShowAddToCollectionModal(true)}
                    />
                  </div>
                  <div className='delete-btn'>
                    <Button
                      text='Delete'
                      color='red'
                      onClick={handleDeleteProducts}
                    />
                  </div>
                </div>
              : <>
                  <h4 className='product-name'>Product</h4>
                  <h4 className='product-price'>Price</h4>
                </>
            }
          </TableHeadings>
          {
            products && products.map((product: Product) => {
              return (
                <UserProduct key={product.id}>
                  <div className='selector' onClick={() => selectProduct(product.id)}>
                    <input type='checkbox' checked={selectedProducts.includes(product.id)}/>
                  </div>
                  <img src={product.images[0].dataUrl} alt={product.name}/>
                  <div className='text'>
                    <h5 className='product-name'>{product.name}</h5>
                    <h5 className='product-price'>${(product.price / 100).toFixed(2)}</h5>
                  </div>
                </UserProduct>
              )
            })
          }
        </UsersProducts>

        {
          showAddToCollectionModal &&
          <AddToCollectionsModal 
            selectedProducts={selectedProducts}
            setShowAddToCollectionsModal={setShowAddToCollectionModal}
            setMessage={setMessage}
          />
        }

      </ContentContainer>

    </Container>
  )
};

export default Products;