import React from 'react';
import styled from 'styled-components';
import { ContainerRounded, Button } from './Core';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  width: 100%;
  padding: 16px 32px;
`;

const AddProduct = styled(ContainerRounded)`
  width: 100%;
  padding: 24px 16px;

  .title {
    margin-bottom: 8px;
    font-size: 16px;
  }

  .subtitle {
    margin-bottom: 24px;
    font-size: 14px;
  }
`;

const CreateCollection = styled(ContainerRounded)`
  width: 100%;
  padding: 24px 16px;

  .title {
    margin-bottom: 8px;
    font-size: 16px;
  }

  .subtitle {
    margin-bottom: 24px;
    font-size: 14px;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <AddProduct>
        <h4 className='title'>Add a product</h4>
        <p className='subtitle'>Add physical items, digital downloads, services, or anything else you dream up.</p>
        <Link to='/admin/products/new'>
          <Button text='Add product' color='green'/>
        </Link>
      </AddProduct>
      
      <CreateCollection>
        <h4 className='title'>Create a collection</h4>
        <p className='subtitle'>Use collections to organize your products into categories and galleries for your online store.</p>
        <Link to='/admin/collections/new'>
          <Button text='Create collection' color='green'/>
        </Link>
      </CreateCollection>
    </HomeContainer>
  )
};

export default Home;