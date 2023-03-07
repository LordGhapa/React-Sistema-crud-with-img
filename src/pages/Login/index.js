import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login(props) {
  const dispatch = useDispatch();
  // eslint-disable-next-line react/prop-types
  const prevPath = props?.location?.state?.prevPath ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector((state) => state.auth.isLoading);

  function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
    }
    if (password.length < 6 || password.length > 50) {
      formErrors = true;
    }

    if (formErrors) {
      toast.error('Email ou Senha Invalida');
      return;
    }

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          placeholder='Digite Seu Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          value={password}
          placeholder='Digite Sua Senha'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Acessar </button>
      </Form>
    </Container>
  );
}
