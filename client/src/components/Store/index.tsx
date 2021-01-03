import React, { useState } from 'react';
import styled from 'styled-components';
import { Product, Cart } from '../../types';
import { useQuery } from '@apollo/react-hooks'
import { GET_STORE, GET_STORE_PRODUCTS } from '../../graphql/gql';
import { 
  useLocation,
  Switch,
  Route
} from 'react-router-dom';

// Components
import Header from './Header';
import CatalogPage from './Pages/CatalogPage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import CartPage from './Pages/CartPage';

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
  const [cart, setCart] = useState([] as Cart);
  // const [cart, setCart] = useState([
  //   {
  //     endpoint: 'goodstorename',
  //     products: [
  //       {
  //         id: 3,
  //         description: '- cool pic',
  //         name: 'jeff jeff',
  //         images: [
  //           {
  //             id: 9,
  //             dataUrl: 'https://i.imgur.com/jwkpDCM.jpg'
  //           }
  //         ],
  //         price: 10001,
  //         quantity: 2
  //       }
  //     ]
  //   }
  // ] as Cart);

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
      <Header 
        storeName={storeName} 
        storeEndpoint={storeEndpoint}
        cart={cart}
      />

      <MainContent>
        <Switch>

          <Route path='/store/:storeEndpoint/cart'>
            <CartPage
              cart={cart}
              setCart={setCart}
              storeEndpoint={storeEndpoint}
            />
          </Route>

          <Route path='/store/:storeEndpoint/:productId'>
            <ProductDetailsPage
              product={productId && productsData && getProduct()}
              cart={cart}
              setCart={setCart}
              storeEndpoint={storeEndpoint}
            />
          </Route>

          <Route path='/store/:storeEndpoint'>
            <CatalogPage
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