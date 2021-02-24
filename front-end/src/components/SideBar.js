import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import './cssComponents/sideBar.css';
import './cssComponents/sideBar.css';
import Context from '../context/Context';

export default function SideBar({ userRole, active }) {
  const { setCart, setTotal } = useContext(Context);
  const handleClick = () => {
    localStorage.clear();
    setCart([]);
    setTotal(0);
  };
  return (
    <aside>
        {userRole === 'client' && (
      <aside className={`side-container ${active && 'appear'}`}>
          <div className={`${active && 'side-menu-container'} side-bar`}>
            <Link
              style={{ color: 'white' }}
              className="opened-menu"
              to="/products"
              data-testid="side-menu-item-products"
            >
              Produtos
            </Link>
            <Link
              style={{ color: 'white' }}
              className="opened-menu"
              to="/orders"
              data-testid="side-menu-item-my-orders"
            >
              Pedidos
            </Link>
            <Link
              style={{ color: 'white' }}
              className="opened-menu"
              to="/profile"
              data-testid="side-menu-item-my-profile"
            >
              Perfil
            </Link>
            <Link
              className="opened-menu"
              to="/login"
              onClick={handleClick}
              data-testid="side-menu-item-logout"
              style={{ color: 'white' }}
            >
              Sair
            </Link>
          </div>
        </aside>)}
      {userRole === 'administrator' && (
        <div className={`side-container ${active && 'appear'}`}>
          <div className={`${active && 'side-menu-container'} side-bar`}>
            <Link className="opened-menu" to="/admin/orders" data-testid="side-menu-item-orders">
              Pedidos
            </Link>
            <Link className="opened-menu" to="/admin/profile" data-testid="side-menu-item-profile">
              Perfil
            </Link>
            <Link className="opened-menu" to="/login" data-testid="side-menu-item-logout">
              Sair
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
SideBar.propTypes = {
  userRole: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
