import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Product, CartStore, CartProduct } from '../../types/types';
import { useQuery } from '@apollo/react-hooks'
import { GET_STORE, GET_STORE_PRODUCTS } from '../../graphql/gql';
import { 
  useHistory,
  useLocation,
  Switch,
  Route
} from 'react-router-dom';

// Components
import Header from './Header';
import CatalogPage from './Pages/CatalogPage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import CartPage from './Pages/CartPage';
import CheckoutSuccess from './Pages/CheckoutSuccess';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
`;

const MainContent = styled.div`
  background-color: white;
  min-height: calc(100vh - 78px);
  width: 100%;
`;

const Store = () => {
  const history = useHistory();
  const location = useLocation();
  const storeEndpoint = location.pathname.split('/')[2];
  const productId = location.pathname.split('/')[3];
  let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : [];
  let currentStore = cart.filter((store: CartStore) => store.endpoint === storeEndpoint)[0];

  // add currentStore to cart;
  if (!currentStore) {
    currentStore = {
      endpoint: storeEndpoint,
      products: []
    };
    cart.push(currentStore);
  }

  const [cartProducts, setCartProducts] = useState(currentStore.products as Array<CartProduct>);

  // GraphQL
  const { data: storeData, error: storeDataError } = useQuery(GET_STORE, {
    variables: { storeEndpoint }
  });
  const { data: productsData } = useQuery(GET_STORE_PRODUCTS, {
    variables: { storeEndpoint }
  });
  
  if (storeDataError) {
    history.push('/stores');
  }

  const storeName = storeData && storeData.getStore.name;
  const products = productsData && productsData.getStoreProducts; 

  const getProduct = () => {
    return products.filter((product: Product) => {
      return productId === product.id.toString()
    })[0];
  };

  // save cart in local storage everytime the cart updates
  useEffect(() => {
    const otherStores = cart.filter((store: CartStore) => store.endpoint !== storeEndpoint);
    const newCart = [
      ...otherStores,
      {
        ...currentStore,
        products: [...cartProducts]
      }
    ];
    localStorage.setItem('cart', JSON.stringify(newCart));
  },[cartProducts]);
  
  return (
    <Container>
      <Header 
        storeName={storeName} 
        storeEndpoint={storeEndpoint}
        cartProducts={cartProducts}
      />

      <MainContent>
        <Switch>

          <Route path='/store/:storeEndpoint/success'>
            <CheckoutSuccess
              redirectUrl={`/store/${storeEndpoint}`}
              setCartProducts={setCartProducts}
            />
          </Route>

          <Route path='/store/:storeEndpoint/cart'>
            <CartPage
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              storeEndpoint={storeEndpoint}
            />
          </Route>

          <Route path='/store/:storeEndpoint/:productId'>
            <ProductDetailsPage
              product={productId && productsData && getProduct()}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
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