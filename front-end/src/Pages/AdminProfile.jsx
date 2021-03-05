import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AdminSideBar from '../Components/AdminSideBar';
import getUserData from '../../src/Services/utils';

import Restrict from '../Components/Restrict';

const AdminProfile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const user = getUserData();
    if (!user) return;
    setEmail(user.email);
    setName(user.name);
  }, []);

  return (
    <Restrict>
      <div>
        <AdminSideBar />
        <div className="responsive-list">
          <div className="card" style={{ margin: ' 16px 16px' }}>
            <div className="space-between">
              <span>Nome: </span>
              <span data-testid="profile-name">{name}</span>
            </div>
            <br />
            <div className="space-between">
              <span>Email: </span>
              <span data-testid="profile-email">{email}</span>
            </div>
          </div>
        </div>
      </div>
    </Restrict>
  );
};

AdminProfile.propTypes = {
  userData: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.userRequestReducer.userData,
});

export default connect(mapStateToProps)(AdminProfile);
