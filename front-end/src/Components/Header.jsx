import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import titleForHeader from '../Helper/titleForHeader';
import SideBar from './SideBar';

import M from 'materialize-css';

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  background: 'var(--dark)',
  color: 'var(--white)',
  margin: 0,
  padding: '8px',
};

const Header = ({ pathname }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [redirect, setRedirect] = useState(null);

  // func que retorna o título do header baseado no caminho
  const title = titleForHeader(pathname);

  useEffect(() => {
    const sidenav = document.querySelector('.sidenav');
    M.Sidenav.init(sidenav, {});
  }, [])
  
  const toggleDrawer = () => () => {
    setShowSideBar(!showSideBar);
  };

  if (redirect) return <Redirect to={ redirect } />;

  return (
    <div pathname={ pathname }>
      <div style={ headerStyle }>
        <button
          data-target="slide-out"
          data-testid="top-hamburguer"
          className="sidenav-trigger btn-flat"
          onClick={ toggleDrawer() }
        >
          <i
            className="material-icons"
            style={ { color: 'var(--white)', fontSize: '32px' } }>
              menu
          </i>
        </button>
        <h3 data-testid="top-title">{ title }</h3>
        <div style={ { marginRight: '70px' } } />
        <span
          className="side-menu-container"
          style={ { display: showSideBar ? 'block' : 'none' } }
        >
          .
        </span>
      </div>
      <SideBar redirect={ setRedirect }/>
    </div>
  );
};

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Header;
