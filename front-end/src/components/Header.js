import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import SideBar from './SideBar';
import sidebaricon from '../images/sidebaricon.png';
import logo3 from '../images/logo3.png';
import logoT from '../images/logotexto.png';
import './cssComponents/header.css';

export default function Header({ children }) {
  // const userInfo = JSON.parse(localStorage.getItem('role') || '{}');
  const userInfo = localStorage.role || '';
  const [btnBurguer, setBtnBurguer] = useState(userInfo === 'administrator');
  // if (!userInfo) return <Redirect to="/login" />;
  // document.title = children === 'Products' ? 'TryBeer' : children;
  return (
    <div className="xtudo">
      <header className="sandubao">
        <button
          className="bamburguer"
          data-testid="top-hamburguer"
          onClick={() => setBtnBurguer(!btnBurguer)}
          type="button"
        >
          <img
            id="btn-hmb"
            height="30px"
            width="30px"
            src={sidebaricon}
            alt="Hamburguer menu icon"
          />
        </button>
        <span
          style={{ paddingLeft: '30px' }}
          className="title"
          data-testid="top-title"
        >
          {children === 'Products' ? 'TryBeer' : children}
        </span>
        <img
          src={logo3}
          alt="logomenu"
          width="50px"
          style={{
            position: 'absolute',
            right: '10px',
            top: 'calc(50% - 25px)',
          }}
        />{' '}
        <img src={logoT} alt="logotexto" height="50px" style={{marginLeft:'60px'}}/>
      </header>
      <div>
        {btnBurguer && <SideBar userRole={userInfo} active={btnBurguer} />}
      </div>
    </div>
  );
}
// Header.propTypes = {
//   children: PropTypes.string.isRequired,
// };
