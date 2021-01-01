import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { colors } from '../../../theme';

type Props = {
  text?: string
  onClick?: () => void
  color?: 'green' | 'white' | 'red'
}

const ButtonContainer = styled.div`
  display: inline-block;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
  
  ${({color}: Props) => {
    if (color === 'green') {
      return `
        color: white;
        background-color: ${colors.BrandGreen};
      `
    } else if (color === 'white') {
      return `
        color: ${colors.Ink};
        background-color: white;
        border: 1px solid darkgrey;

        &:hover {
          background-color: transparent;
        }
      `
    } else if (color === 'red') {
      return `
        color: white;
        background-color: ${colors.ErrorLight};
      `
    }
  }}
`;

const Button = ({ text, onClick, color }: Props) => {
  return (
    <ButtonContainer color={color} onClick={onClick}>
      { text }
    </ButtonContainer>
  )
}

export default Button;