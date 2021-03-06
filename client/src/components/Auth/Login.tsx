import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks'
import { USER_LOGIN } from '../../graphql/gql';
import { colors } from '../../theme';
import { useInput } from '../../hooks';

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

const Login = () => {
  const [email, emailInput] = useInput({ name: 'Email address', type: 'email', placeholder: 'example@hotmail.com' })
  const [password, passwordInput] = useInput({ name: 'Password', type: 'password', placeholder: '123' })
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  const [userLogin] = useMutation(USER_LOGIN);

  const login = () => {
    const missingFields = [];

    if (!email) {
      missingFields.push('email');
    }
    if (!password) {
      missingFields.push('password');
    }
    if (missingFields.length) {
      setErrorMsg(`Missing field${missingFields.length > 1 ? 's' : ''} ${missingFields.join(', ')}!`)
    } else {
      userLogin({
        variables: {
          email,
          password
        }
      })
      .then(res => {
        const jwt = res.data.userLogin.token;
        cookies.set('jwt', jwt);
        history.push('/admin')
      })
      .catch(err => setErrorMsg(err.message));
    }
    
  };

  useEffect(() => {
    setErrorMsg('');
  },[email, password]);

  return (
    <Container>

      <Form>
        <Text>Login</Text>

        { emailInput }
        { passwordInput }

        <CreateStoreBtn onClick={login}>
          Log In
        </CreateStoreBtn>
        <Link to='/auth/signup'>Don't have an account? Register</Link>

        <ErrorMsg>{ errorMsg }</ErrorMsg>
      </Form>

    </Container>
  )
};

export default Login;