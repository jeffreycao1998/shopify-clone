import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../theme';
import { Message } from '../../../types/types';

type ContainerProps = {
  result: 'success' | 'error'
}

const Container = styled.div`
  border: 1px solid ${({result}: ContainerProps) => result === 'success' ? colors.BrandGreen : colors.Error};
  background-color: ${({result}: ContainerProps) => result === 'success' ? '#edf8ed' : '#fff0f1'};
  padding: 20px 42px 18px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-weight: 500;

  ion-icon {
    color: ${({result}: ContainerProps) => result === 'success' ? colors.BrandGreen : colors.Error};
    font-size: 28px;
    margin-right: 12px;
  }
`;

type Props = {
  message: Message
}

const Notification = ({ message }: Props) => {
  return (
    message.success || message.error
    ? <Container result={message.success ? 'success' : 'error'}>
        { /* @ts-ignore */ }
        { message.success ? <ion-icon name="checkmark-circle"></ion-icon> : <ion-icon name="alert-circle-outline"></ion-icon> }
        { message.success || message.error }
      </Container>
    : null
  );
};

export default Notification;