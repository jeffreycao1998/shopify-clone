import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavContainer = styled.div`
  width: 240px;
  height: 100%;
  border-right: 1px solid transparent;
  -webkit-box-shadow: 1px 1px 1px lightgrey;
  -moz-box-shadow: 1px 1px 1px lightgrey;
  box-shadow: 1px 1px 1px lightgrey;
  position: fixed;
  left: 0;
  top: 56px;
  padding: 12px 8px;
`;

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Category = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding-left: 12px;
  border-radius: 3px;
  text-decoration: none;

  &:hover {
    background-color: lightgrey;
    cursor: pointer;
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

const Navigation = () => {
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
    <NavContainer>
      {
        categories.map(category => {
          return (
            <CategoryContainer key={category.name}>
              <Category to={category.route}>
                {/* @ts-ignore */}
                <ion-icon name={category.icon} />
                <p className='category-name'>{category.name}</p>
              </Category>
            </CategoryContainer>
          )
        })
      }
    </NavContainer>
  )
};

export default Navigation;