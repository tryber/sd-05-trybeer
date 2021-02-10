import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../Helper/fetch';
import Input from '../Components/Input';
import { registerData } from '../Helper/localStorageHandle';
import getUserData from '../Helper/getUserData';

import M from 'materialize-css';

const pageStyle = {
  justifyContent: 'center',
};

const containerStyle = {
  justifyContent: 'space-between',
  height: '250px',
};

const loginUser = async ({ email, password }) => {
  const {
    message = null,
    ...user
  } = await login({ email, password });
  if (message) return { error: message };
  return { user };
}

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isDisabled, isSetDisabled] = useState(true);
  const [register, setRegister] = useState(false);
  const [userData, setUserData] = useState(getUserData());

  function validaInput(xEmail, xSenha) {
    const regexEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    const regexSenha = /^[^W_]{6,100}$/;
    if (regexEmail.test(xEmail) && regexSenha.test(xSenha)) {
      isSetDisabled(false);
    } else {
      isSetDisabled(true);
    }
  }

  useEffect(() => {
    validaInput(email, password);
  }, [email, password]);

  if (register) return <Redirect to="/register" />;
  if (userData) {
    if (userData.role === 'client') return <Redirect to="/products" />;
    if (userData.role === 'administrator') return <Redirect to="/admin/orders" />;
  }
  return (
    <div className="container-main" style={ pageStyle }>
      <div className="container-screen" style={ containerStyle }>
        <Input
          test="email-input"
          label="Email"
          type="email"
          id="input_email"
          onChange={ (e) => setEmail(e.target.value) }
        />
        <Input
          test="password-input"
          label="Senha"
          type="password"
          id="input_password"
          onChange={ (e) => setPassword(e.target.value) }
        />
        <div style={ { display: 'flex', flexDirection: 'column' } }>
          <button
            className="btn btn-large"
            disabled={ isDisabled }
            data-testid="signin-btn"
            type="submit"
            onClick={ async () => {
              const res = await loginUser({ email, password });
              if (!res.error) {
                registerData({ token: res?.user.token });
                setUserData(res?.user.user);
              }
              M.toast({ html: '<p>Email ou senha incorretos!</p>', classes: 'red lighten-2' })
            }}
          >
            ENTRAR
          </button>
          <button
            className="btn btn-small"
            data-testid="no-account-btn"
            onClick={ () => setRegister(true) }
          >
            Ainda não tenho conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
