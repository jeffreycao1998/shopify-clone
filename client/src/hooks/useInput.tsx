import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  name: string
  type: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 12px;
    font-size: 14px;
  }

  input {
    padding: 5px 12px;
    border: 1px solid lightgrey;
    border-radius: 3px;
    overflow: hidden;
    font-size: 14px;
    line-height: 1.35;
  }

  textarea {
    padding: 8px;
    border: 1px solid lightgrey;
    border-radius: 3px;
    overflow: hidden;
    font-size: 14px;
    line-height: 1.35;
    resize: none;
    min-height: 150px;
  }
`;

const InputHook = ({ name, type }: Props) => {
  const [value, setValue] = useState('');
  const input = (
    <Container>
      <label htmlFor={name}>{name}</label>
      <input id={name} value={value} onChange={e => setValue(e.target.value)} type={type} />
    </Container>
  )
  const textarea = (
    <Container>
      <label htmlFor={name}>{name}</label>
      <textarea id={name} value={value} onChange={e => setValue(e.target.value)} />
    </Container>
  )

  if (type === 'textarea') {
    return [value, textarea]
  } else {
    return [value, input]
  }
};

export default InputHook;