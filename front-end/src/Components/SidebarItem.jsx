import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const LAST = -1;

const sidebarStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'var(--darkest)',
  padding: '8px 16px',
  margin: '1px',
};

const SideBarItem = ({ children, action, to, onClick }) => {
  const [redirect, setRedirect] = useState(null);

  if (redirect) return <Redirect to={ redirect } />;

  return (
    <li>
      <div
        className="sidenav-close"
        data-testid={ action }
        onClick={ () => {
          if (typeof onClick === 'function') onClick();
          setRedirect(to || `/${action.split('-').slice(LAST)}`);
        }}
        style={ sidebarStyle }
      >
        {children}
      </div>
    </li>
  );
};

SideBarItem.propTypes = {
  action: PropTypes.shape({
    split: PropTypes.func,
  }).isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
};

export default SideBarItem;
