import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Container = styled.div`

`;

const DarkOverlay = styled.div`
  display: none;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0,0,0,0.4);

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

type NavContainerProps = {
  showNavMenu: boolean
};

const NavContainer = styled.div`
  width: 240px;
  height: calc(100% - 56px);
  border-right: 1px solid transparent;
  -webkit-box-shadow: 1px 1px 1px lightgrey;
  -moz-box-shadow: 1px 1px 1px lightgrey;
  box-shadow: 1px 1px 1px lightgrey;
  position: fixed;
  left: 0;
  top: 56px;
  padding: 12px 8px;
  background-color: #f4f4f2;

  .logo-container {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    width: 359px;
    height: 100%;
    padding: 0;
    top: 0;
    left: ${({showNavMenu}: NavContainerProps) => showNavMenu ? 0 : -359}px;
    z-index: 2;
    transition: all 0.2s ease-in-out;

    .close-nav-menu {
      position: absolute;
      right: -50px;
      top: 16px;
      border-radius: 50%;
      height: 30px;
      width: 30px;
      cursor: pointer;

      &:hover {
        background-color: #bbbbbb;
      }
      
      ion-icon {
        font-size: 30px;
        color: white;
      }
    }

    .logo-container {
      display: block;
      padding: 6px;
      background-color: white;

      a {
        text-decoration: none;
      }

      .logo-content-container {
        display: flex;
        align-items: center;
        padding: 6px 8px;

        &:hover {
          background-color: lightgrey;
          cursor: pointer;
        }

        ion-icon {
          font-size: 30px;
          margin-right: 11px;
        }

        .store-name {
          font-weight: 500;
          font-size: 14px;
        }
      }
      
    }
  }
`;

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2px 0;

  @media only screen and (max-width: 768px) {
    padding: 0 8px;
  }
`;

type CategoryProps = {
  selected?: boolean
}

const Category = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding-left: 12px;
  border-radius: 3px;
  text-decoration: none;
  ${({selected}: CategoryProps) => selected ? 'background-color: lightgrey;' : ''};
  cursor: pointer;

  &:hover {
    background-color: lightgrey;
  }

  ion-icon {
    font-size: 20px;
    margin-right: 16px;
  }

  .category-name {
    line-height: .01;
    font-weight: 500;
    font-size: 14px;
  }
`;

type Props = {
  storeEndpoint: string
  showNavMenu: boolean
  setShowNavMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const Navigation = ({ storeEndpoint, showNavMenu, setShowNavMenu }: Props) => {
  const location = useLocation();

  const categories = [
    {
      icon: 'home',
      name: 'Home',
      route: '/admin',
    },
    {
      icon: 'pricetag',
      name: 'Products',
      route: '/admin/products',
    },
    {
      icon: '',
      name: 'Add product',
      route: '/admin/products/new',
    },
    {
      icon: 'albums',
      name: 'Collections',
      route: '/admin/collections',
    },
    {
      icon: '',
      name: 'Create Collection',
      route: '/admin/collections/new',
    }
  ];

  return (
    <Container>
      {
        showNavMenu &&
        <DarkOverlay onClick={() => setShowNavMenu(false)} />
      }
      <NavContainer showNavMenu={showNavMenu}>
        {
          showNavMenu &&
          <div className='close-nav-menu' onClick={() => setShowNavMenu(false)}>
            {/* @ts-ignore */}
            <ion-icon name="close-outline"></ion-icon>
          </div>
        }
        <div className='logo-container'>
          <Link to='/admin'>
            <div className='logo-content-container'>
              {/* @ts-ignore */}
              <ion-icon name="aperture"></ion-icon>
              <p className='store-name'>Jeffrey Cao</p>
            </div>
          </Link>
        </div>
        {
          categories.map(category => {
            return (
              <CategoryContainer key={category.name}>
                <Category 
                  to={category.route}
                  selected={location.pathname === category.route}
                  onClick={() => setShowNavMenu(false)}
                >
                  {/* @ts-ignore */}
                  <ion-icon name={category.icon} />
                  <p className='category-name'>{category.name}</p>
                </Category>
              </CategoryContainer>
            )
          })
        }
        <CategoryContainer>
          <Category to={`/store/${storeEndpoint}`} target="_blank">
            {/* @ts-ignore */}
            <ion-icon name="storefront"></ion-icon>
            <p className='category-name'>Preview Online Store</p>
          </Category>
        </CategoryContainer>
      </NavContainer>
    </Container>
  )
};

export default Navigation;