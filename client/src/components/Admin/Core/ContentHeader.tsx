import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  .header {
    line-height: 0.1;
    margin-left: 16px;
    font-size: 20px;
    font-weight: 500;
  }
`;

const GoBackContainer = styled.div`
  height: 36px;
  width: 34px;
  border-radius: 1px solid lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 5px;

  ion-icon {
    font-size: 20px;
  }
`;

type Props = {
  route?: string
  text: string
}

const ContentHeader = ({ route, text }: Props) => {
  return (
    <HeaderContainer>
      {
        route &&
        <Link to={route}>
          <GoBackContainer>
            {/* @ts-ignore */}
            <ion-icon name="arrow-back-outline"></ion-icon>
          </GoBackContainer>
        </Link>
      }
      <p className='header'>{ text }</p>
    </HeaderContainer>
  )
};

export default ContentHeader;