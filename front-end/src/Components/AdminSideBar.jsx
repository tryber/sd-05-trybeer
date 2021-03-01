import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clear } from '../Redux/Actions/user';

const sideBarStyle = {
  background: 'var(--orange)',
  color: 'var(--white)',
  height: '300vh',
  width: '25vw',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  float: 'left',
};

const sidebarItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--orange-bright)',
  padding: '8px',
  margin: '1px',
};

const AdminSideBar = ({ logout }) => (
  <div className="admin-side-bar-container" style={sideBarStyle}>
    <nav>
      <Link
        style={sidebarItemStyle}
        to="/admin/orders"
        data-testid="side-menu-item-orders"
      >
        Pedidos
      </Link>
      <Link
        style={sidebarItemStyle}
        to="/admin/profile"
        data-testid="side-menu-item-profile"
      >
        Perfil
      </Link>
      <Link
        style={sidebarItemStyle}
        to="/admin/chats"
        data-testid="side-menu-item-chat"
      >
        Conversas
      </Link>
      <Link
        style={sidebarItemStyle}
        onClick={() => logout()}
        to="/login"
        data-testid="side-menu-item-logout"
      >
        Sair
      </Link>
    </nav>
  </div>
);

AdminSideBar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(clear()),
});

export default connect(null, mapDispatchToProps)(AdminSideBar);
