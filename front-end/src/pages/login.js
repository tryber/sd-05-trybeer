import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import validateLogin from '../services/validateLogin';
import { checkUser } from '../services/api';
import Context from '../context/Context';
import './css/login.css';
import logo from '../images/logo.png';

const Login = () => {
  const { setUserEmail, setUserName, userEmail } = useContext(Context);
  const [password, setPassword] = useState('');
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [designatedRoute, setDesignetedRoute] = useState(undefined);

  useEffect(() => {
    setIsLoginValid(validateLogin(userEmail, password));
  }, [userEmail, password]);

  const handleRoute = async (ema, pass) => {
    const userRole = await checkUser(ema, pass);
    if (userRole) {
      localStorage.setItem('role', userRole.role);
      localStorage.setItem('token', userRole.token);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('cart', JSON.stringify([]));
      setUserName(userRole.name);
    }
    switch (userRole.role) {
      case 'client':
        setDesignetedRoute('/products');
        break;
      case 'administrator':
        setDesignetedRoute('/admin/orders');
        break;
      default:
        break;
    }
  };

  return (
    <div className="login">
      <div className="input-data">
        <label htmlFor="email-input">
          Email
          <input
            data-testid="email-input"
            name="email-input"
            type="text"
            onChange={ (event) => setUserEmail(event.target.value) }
          />
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            name="password-input"
            data-testid="password-input"
            type="password"
            onChange={ (event) => setPassword(event.target.value) }
          />
        </label>
        <div className="buttons">
          <button
            type="submit"
            data-testid="signin-btn"
            className="btn-login"
            disabled={ !isLoginValid }
            onClick={ () => handleRoute(userEmail, password) }
          >
            ENTRAR
          </button>
          {designatedRoute !== undefined ? <Redirect to={ designatedRoute } /> : null}
          <button type="submit" data-testid="no-account-btn" className="btn-register">
            <Link style={{color: 'black'}} to="/register">
              Ainda não tenho conta
            </Link>
          </button>
        </div>
      </div>
      <img src={ logo } alt="logo" className="logo" />
    </div>
  );
};

export default Login;
