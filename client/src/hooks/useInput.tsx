import React, { useState } from 'react';
import styled from 'styled-components';

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

type Props = {
  name: string
  type: string
  placeholder?: string
}

const InputHook = ({ name, type, placeholder }: Props) => {
  const [value, setValue] = useState('');
  const clear = () => setValue('');

  const input = (
    <Container>
      <label htmlFor={name}>{name}</label>
      <input id={name} value={value} onChange={e => setValue(e.target.value)} type={type} placeholder={placeholder}/>
    </Container>
  );

  const textarea = (
    <Container>
      <label htmlFor={name}>{name}</label>
      <textarea id={name} value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder}/>
    </Container>
  );

  if (type === 'textarea') {
    return [value, textarea, clear]
  } else {
    return [value, input, clear]
  }
};

export default InputHook;