import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { registerUserAct } from '../Redux/Actions/user';

import Input from '../Components/Input';

const pageStyle = {
  justifyContent: 'center',
};

const Register = ({ registerUser, userError }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [isDisabled, isSetDisabled] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  function validate() {
    const validName = /^[a-zA-Z ]{12}[a-zA-Z ]*$/.test(name);
    const validEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email);
    const validSenha = /^[^W_]{5,100}$/.test(password);
    if (validName && validEmail && validSenha) isSetDisabled(false);
    else isSetDisabled(true);
  }

  if (shouldRedirect && !userError) {
    if (!isSeller) {
      return <Redirect to="/products" />;
    }
    return <Redirect to="/admin/orders" />;
  }

  async function registerHandle() {
    const role = isSeller ? 'administrator' : 'client';
    await registerUser({
      name,
      email,
      password,
      role,
    });

    setShouldRedirect(true);
  }

  return (
    <div className="container-main" id="Register" style={ pageStyle }>
      <div className="container-screen">
        <Input 
          test="signup-name"
          label="Nome"
          placeholder="Digite seu nome"
          onChange={ (e) => {
            setName(e.target.value);
            validate();
          } }
        />
        <Input 
          test="signup-email"
          label="Email"
          type="email"
          placeholder="Digite seu e-mail"
          onChange={ (e) => {
            setEmail(e.target.value);
            validate();
          } }
        />
        <Input 
          test="signup-password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          onChange={ (e) => {
            setPassword(e.target.value);
            validate();
          } }
        />
        <label data-testid="signup-seller">
          <input
            type="checkbox"
            onChange={ ({ target: { checked } }) => {
              setIsSeller(checked);
            } }
          />
          <span>Quero Vender</span>
        </label>
        <button
          disabled={ isDisabled }
          type="button"
          className="btn btn-large"
          data-testid="signup-btn"
          onClick={ () => registerHandle() }
        >
          Cadastrar
        </button>
        { userError && <p>E-mail already in database.</p> }
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: propTypes.func.isRequired,
  userError: propTypes.string.isRequired,
};

const mapStateToProps = ({ userRequestReducer }) => ({
  userError: userRequestReducer.error,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (newUserData) => dispatch(registerUserAct(newUserData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
