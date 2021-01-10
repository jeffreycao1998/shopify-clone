import React, { useState } from 'react';
import styled from 'styled-components';
import cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom';
import { colors } from '../../theme';

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

  a {
    text-decoration: none;
  }

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

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const OpenNavMenu = styled.div`
  display: none;
  padding: 10px;
  cursor: pointer;

  &:hover {
    ion-icon {
      background-color: lightgrey;
    }
  }

  ion-icon {
    font-size: 30px;
    border-radius: 5px;
    color: black;
    padding: 4px;
  }

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

type ProfileContainerProps = {
  show: boolean;
}

const ProfileContainer = styled.div`
  height: 100%;
  padding: 8px;
  align-self: flex-end;
  position: relative;
  user-select: none;

  .profile {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 6px 8px;
    border-radius: 3px;
    background-color: ${({show}: ProfileContainerProps) => show ? 'lightgrey' : 'transparent'};

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
      font-size: 14px;
    }

    &-name {
      font-weight: 500;
      font-size: 14px;
    }
  }
`;

type ProfileDropdownProps = {
  show: boolean;
}

const ProfileDropdown = styled.div`
  padding: 8px 0;
  background-color: ${colors.Ink};
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: 60px;
  min-width: 170px;
  display: ${({show}: ProfileDropdownProps) => show ? 'block' : 'none'};

  .dropdown-btn {
    margin: 0 8px;
    padding: 10px 8px;
    display: flex;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: #353535;
    }

    ion-icon {
      color: lightgrey;
      font-size: 20px;
      margin-right: 12px;
    }

    p {
      color: lightgrey;
      font-size: 14px;
      line-height: 0;
    }
  }
`;

type Props = {
  storeName: string
  userEmail: string
  setShowNavMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ storeName, userEmail, setShowNavMenu }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const history = useHistory();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = () => {
    cookies.remove('jwt');
    history.push('/auth/login');
  };

  const openNavMenu = () => {
    setShowNavMenu(true);
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to='/admin'>
          <div className='logo'>
            {/* @ts-ignore */}
            <ion-icon name="aperture"></ion-icon>
            <p className='store-name'>{ storeName }</p>
          </div>
        </Link>
      </LogoContainer>

      <OpenNavMenu onClick={openNavMenu}>
        {/* @ts-ignore */}
        <ion-icon name="menu-outline"></ion-icon>
      </OpenNavMenu>

      <ProfileContainer onClick={toggleDropdown} show={showDropdown}>
        <div className='profile'>
          <div className='profile-logo'>Hi</div>
          <div className='profile-name'>{ userEmail }</div>
        </div>

        <ProfileDropdown show={showDropdown}>
          <div className='dropdown-btn' onClick={logout}>
            {/* @ts-ignore */}
            <ion-icon name="arrow-forward-circle"></ion-icon>
            <p>Log out</p>
          </div>
        </ProfileDropdown>
      </ProfileContainer>
    </HeaderContainer>
  )
};

export default Header;