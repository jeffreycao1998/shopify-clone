import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import cookie from 'cookie';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks'
import { USER_REGISTER } from '../../../graphql/gql';
import { colors } from '../../../theme';
import { useInput } from '../../../hooks';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 60px;
  border-radius: 5px;
  background-color: #f0f1f2;
  padding: 48px 48px 24px 48px;

  div:not(:last-child) {
    margin-bottom: 24px;
  }

  input {
    border: 1px solid grey;
    padding: 12px 12px;
  }
`;

const Text = styled.p`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
`;

const CreateStoreBtn = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: white;
  background-color: ${colors.BrandGreen};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.BrandGreenDarker};
  }
`;

const ErrorMsg = styled.p`
  color: ${colors.Error};
  font-weight: 500;
  bottom: 10px;
  left: 48px;
  height: 24px;
  font-size: 14px;
`;

const Registration = () => {
  const [email, emailInput] = useInput({ name: 'Email address', type: 'text', placeholder: 'jeffcao05@gmail.com' })
  const [password, passwordInput] = useInput({ name: 'Password', type: 'password', placeholder: 'S3CR3t P@$$' })
  const [storeName, storeNameInput] = useInput({ name: 'Your store name', type: 'text', placeholder: 'Gucci Clone' })
  const [errorMsg, setErrorMsg] = useState('');

  const [userRegister] = useMutation(USER_REGISTER);

  const createStore = () => {
    const missingFields = [];

    if (!email) {
      missingFields.push('email');
    }
    if (!password) {
      missingFields.push('password');
    }
    if (!storeName) {
      missingFields.push('store name');
    }

    if (missingFields.length) {
      setErrorMsg(`Missing field${missingFields.length > 1 ? 's' : ''} ${missingFields.join(', ')}!`);
    } else {
      userRegister({
        variables: {
          email,
          password,
          storeName
        }
      })
      .then(res => {
        const jwt = res.data.userRegister.token;
        cookie.serialize('jwt', jwt);
        const cookies = cookie.parse('jwt');
        console.log(cookies);
      })
      .catch(err => setErrorMsg(err.message.split('error: ')[1]));
    }
  };

  useEffect(() => {
    setErrorMsg('');
  },[email, password, storeName]);

  return (
    <Container>

      <Form>
        <Text>Registration</Text>

        { emailInput }
        { passwordInput }
        { storeNameInput }

        <CreateStoreBtn onClick={createStore}>
          Create your store
        </CreateStoreBtn>
        <Link to='/auth/signup'>Already have an account? Login</Link>

        <ErrorMsg>{ errorMsg }</ErrorMsg>
      </Form>

    </Container>
  )
};

export default Registration;