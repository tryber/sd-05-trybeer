import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './cssComponents/sideBar.css';

export default function SideBar({ userRole, active }) {
  const handleClick = () => {
    localStorage.clear();
  };
  return (
    <aside className={`side-container ${active && 'appear'}`}>
      {userRole === 'client' && (
        <div className={`${active && 'side-menu-container'} side-bar`}>
          <Link style={{ color: 'black' }} className="opened-menu" to="/products" data-testid="side-menu-item-products">
            Produtos
          </Link>
          <Link style={{ color: 'black' }} className="opened-menu" to="/orders" data-testid="side-menu-item-my-orders">
            Meus Pedidos
          </Link>
          <Link style={{ color: 'black' }} className="opened-menu" to="/profile" data-testid="side-menu-item-my-profile">
            Meu perfil
          </Link>
          <Link
            className="opened-menu"
            to="/login"
            onClick={handleClick}
            data-testid="side-menu-item-logout"
            style={{ color: 'black' }}
          >
            Sair
          </Link>
        </div>
      )}
      {userRole === 'administrator' && (
        <div className="admin-side-bar-container side-bar">
          <div>
            <Link style={{ color: 'black' }} to="/admin/orders" data-testid="side-menu-item-orders">
              Pedidos
            </Link>
            <Link style={{ color: 'black' }} to="/admin/profile" data-testid="side-menu-item-profile">
              Meu perfil
            </Link>
          </div>
          <Link style={{ color: 'black' }} to="/login" data-testid="side-menu-item-logout">
            Sair
          </Link>
        </div>
      )}
    </aside>
  );
}
SideBar.propTypes = {
  userRole: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
