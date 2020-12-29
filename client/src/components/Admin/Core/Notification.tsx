import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../theme';

const NotificationContainer = styled.div`
  border: 1px solid #02a302;
  background-color: #edf8ed;
  padding: 20px 42px 18px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-weight: 500;

  ion-icon {
    color: ${colors.BrandGreen};
    font-size: 28px;
    margin-right: 12px;
  }
`;

type Props = {
  message: string
}

const Notification = ({ message }: Props) => {
  return (
    message
    ? <NotificationContainer>
        {/* @ts-ignore */}
        <ion-icon name="checkmark-circle"></ion-icon>
        { message }
      </NotificationContainer>
    : null
  );
};

export default Notification;