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
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: .8px;
  width: 100%;
  height: 44px;
  user-select: none;
  cursor: pointer;
  
  ${({color}: Props) => {
    if (color === 'white') {
      return `
        color: ${colors.Ink};
        background-color: white;
        border: 1px solid black;
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