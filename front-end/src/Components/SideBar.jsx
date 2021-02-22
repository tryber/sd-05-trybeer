import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ourLogo from '../fetch-beer-3.png';


import { clear } from '../Redux/Actions/user';
import Item from './SidebarItem';

const sideBarStyle = {
  background: 'var(--orange)',
  color: 'var(--white)',
};

const SideBar = ({ logout }) => {

  return (
    <ul id="slide-out" className="sidenav" style={ sideBarStyle }>
      <div className="horizontal-center">
        <img className="circle" src={ourLogo} style={{width: '100px'}} />
      </div>
        <li className="divider"></li>
      <Item action="side-menu-item-products">Produtos</Item>
      <Item action="side-menu-item-orders">Meus Pedidos</Item>
      <Item action="side-menu-item-my-orders">
        Pedidos
      </Item>
      <Item action="side-menu-item-my-profile">Meu Perfil</Item>
      <Item
        action="side-menu-item-logout"
        to="/login"
        onClick={ () => { logout(); } }
      >
        Sair
      </Item>
    </ul>
  );
};

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(clear()),
});

export default connect(() => ({}), mapDispatchToProps)(SideBar);
