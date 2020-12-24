import React from 'react';
import styled from 'styled-components';

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
  height: 32px;
  padding-left: 12px;
  margin-right: 4px;
  border-radius: 3px;
  display: flex;
  align-items: center;

  ion-icon {
    font-size: 20px;
    margin-right: 16px;
  }

  &:hover {
    background-color: lightgrey;
    cursor: pointer;
  }

  .category {
    display: flex;
    align-items: center;

    &-name {
      line-height: 1px;
    }
  }

  .category-main {

  }

  .category-sub {

  }
`;

const Navigation = () => {
  const categories = [
    {
      icon: 'home',
      name: 'Home',
      subCategories: [],
    },
    {
      icon: 'pricetag',
      name: 'Products',
      subCategories: ['All products', 'Inventory']
    }
  ];

  return (
    <NavContainer>
      {
        categories.map(category => {
          return (
            <CategoryContainer>
              <div className='category category-main'>
                {/* @ts-ignore */}
                <ion-icon name={category.icon} />
                <p className='category-name'>{category.name}</p>
              </div>
              <div className='category category-sub'>
                {
                  category.subCategories.length && category.subCategories.map(subcategory => {
                    return (
                      <div className='category'>
                        <p className='category-name'>{category.name}</p>
                      </div>
                    )
                  })
                }
              </div>
            </CategoryContainer>
          )
        })
      }
    </NavContainer>
  )
};

export default Navigation;