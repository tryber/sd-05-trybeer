import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Restrict from '../Components/Restrict';
import Header from '../Components/Header';

import getUserData from '../Services/utils';
import { updateUserAct } from '../Redux/Actions/user';

const changeInput = (event, setFunction) => setFunction(event.target.value);

const containerStyle = {
  justifyContent: 'space-between',
  height: '250px',
  marginTop: '250px',
};


function Profile({ history, updateUser }) {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [changed, setChanged] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const user = getUserData();
    if (!user) return;
    setId(user.id);
    setEmail(user.email);
    setName(user.name);
  }, []);

  return (
    <Restrict>
      <Header pathname={history.location.pathname} />
      <div className="container-main">
        <div className="container-screen" style={containerStyle}>
          <div
            style={{ display: 'flex', flexDirection: 'column' }}
            className="card"
          >
            <strong>Perfil</strong>
            <form>
              <p>Nome:</p>
              <input
                type="text"
                data-testid="profile-name-input"
                value={name}
                onChange={(event) => {
                  changeInput(event, setName);
                  setChanged(true);
                }}
              />
              <p>Email :</p>
              <input
                type="email"
                data-testid="profile-email-input"
                value={email}
                readOnly
              />
            </form>
            <button
              className="btn btn-flat yellow-main-bg blue-mid-cl"
              disabled={!changed}
              data-testid="profile-save-btn"
              onClick={() => {
                updateUser({ id, name });
                setShouldRefresh(true);
              }}
              type="button"
            >
              Salvar
            </button>
            {shouldRefresh && <p>Atualização concluída com sucesso</p>}
          </div>
        </div>
      </div>
    </Restrict>
  );
}

Profile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateUser: (data) => dispatch(updateUserAct(data)),
});

export default connect(null, mapDispatchToProps)(Profile);
