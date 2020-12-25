import React from 'react';
import styled from 'styled-components';
import { ContainerRounded, Button } from './Core';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
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

const Home = () => {
  return (
    <HomeContainer>
      <AddProduct>
        <h4 className='title'>Add your first product</h4>
        <p className='subtitle'>Add physical items, digital downloads, services, or anythign else you dream up.</p>
        <Link to='/admin/products/new'>
          <Button text='Add product' color='green'/>
        </Link>
      </AddProduct>
    </HomeContainer>
  )
};

export default Home;