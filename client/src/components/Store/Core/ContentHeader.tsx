import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 152px;
  width: 100%;
  border-bottom: 1px solid lightgrey;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
`;

type Props = {
  text: string
}

const ContentHeader = ({ text }: Props) => {
  return (
    <Container>
      <Title>{ text }</Title>
    </Container>
  )
};

export default ContentHeader;