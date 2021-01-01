import React from 'react';
import styled from 'styled-components';
import { Product } from '../../types';
import { useQuery } from '@apollo/react-hooks'
import { GET_STORE, GET_STORE_PRODUCTS } from '../../graphql/gql';
import { 
  useLocation,
  Switch,
  Route
} from 'react-router-dom';

// Components
import Header from './Header';
import Catalog from './Pages/Catalog';
import ProductDetails from './Pages/ProductDetails';

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
`;

const MainContent = styled.div`
  background-color: white;
  min-height: calc(100vh - 78px);
  width: 100%;
`;

const Store = () => {
  const location = useLocation();
  const storeEndpoint = location.pathname.split('/')[2];
  const productId = location.pathname.split('/')[3];

  const { data: storeData } = useQuery(GET_STORE, {
    variables: { storeEndpoint }
  });

  const { data: productsData } = useQuery(GET_STORE_PRODUCTS, {
    variables: { storeEndpoint }
  });

  const storeName = storeData && storeData.getStore.name;
  const products = productsData && productsData.getStoreProducts;

  const getProduct = () => {
    return products.filter((product: Product) => {
      return productId === product.id.toString()
    })[0];
  };

  return (
    <Container>
      <Header storeName={storeName}/>

      <MainContent>
        <Switch>

          <Route path='/store/:storeEndpoint/:productId'>
            <ProductDetails 
              product={productId && productsData && getProduct()}
            />
          </Route>

          <Route path='/store/:storeEndpoint'>
            <Catalog 
              storeEndpoint={ storeEndpoint }
              products={products}
            />
          </Route>

        </Switch>
      </MainContent>
    </Container>
  )
};

export default Store;