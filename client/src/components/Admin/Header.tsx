import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
  height: 56px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid transparent;
  -webkit-box-shadow:0px 1px 1px lightgrey;
  -moz-box-shadow:0px 1px 1px lightgrey;
  box-shadow:0px 1px 1px lightgrey;
  z-index: 1;
`;

const LogoContainer = styled.div`
  height: 100%;
  padding: 8px;

  .logo {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 6px 8px;
    border-radius: 3px;

    &:hover {
      background-color: lightgrey;
      cursor: pointer;
    }

    ion-icon {
      font-size: 30px;
      margin-right: 11px;
    }

    .store-name {
      display: inline-block;
      font-weight: 500;
      font-size: 14px;
    }
  }
`;

const ProfileContainer = styled.div`
  height: 100%;
  padding: 8px;
  align-self: flex-end;

  .profile {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 6px 8px;
    border-radius: 3px;

    &:hover {
      background-color: lightgrey;
      cursor: pointer;
    }

    &-logo {
      border-radius: 50%;
      height: 32px;
      width: 32px;
      background-color: pink;
      margin-right: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-name {

    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to='/admin'>
          <div className='logo'>
            {/* @ts-ignore */}
            <ion-icon name="aperture"></ion-icon>
            <p className='store-name'>jeffreycao</p>
          </div>
        </Link>
      </LogoContainer>
      <ProfileContainer>
        <div className='profile'>
          <div className='profile-logo'>JC</div>
          <div className='profile-name'>Jeffrey Cao</div>
        </div>
      </ProfileContainer>
    </HeaderContainer>
  )
};

export default Header;