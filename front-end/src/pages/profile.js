import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { updateUserName } from '../services/api';
import Header from '../components/Header';
import Context from '../context/Context';
import './css/profile.css';

const Profile = () => {
  // const [email, setEmail] = useState('');
  const { userEmail, userName, setUserName } = useContext(Context);
  const { role } = localStorage;
  const nameSize = 12;
  const [disableBtn, setDisableBtn] = useState(false);
  const handleChange = (event) => {
    setUserName(event.target.value);
    if (userName.length >= nameSize) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userData = { name: userName, email: userEmail };
    const response = await updateUserName(userData, localStorage.token);
    const saveButton = document.querySelectorAll('button')[1];
    saveButton.innerText = 'Atualização concluída com sucesso';
    return response;
  };
  if (!localStorage.token) return <Redirect to="/login" />;
  return (
    <div>
      <div className="cabeça">
        <Header></Header>
        {/* {role === 'administrator' ? 'Perfil' : 'Meu perfil'} */}
      </div>
      <div>
        <span className="profile-title">Perfil</span>
        <form className="user-profile">
          <label htmlFor="name" data-testid="profile-name">
            {/* {role === 'administrator' ? userName : 'Nome'} */}
            Nome
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input
              name="name"
              type="text"
              data-testid="profile-name-input"
              minLength="12"
              placeholder={userName}
              required
              onChange={(event) => handleChange(event)}
              readOnly={role === 'administrator'}
            />
          </label>{' '}
          <br />
          <label htmlFor="email" id="lblEmail" data-testid="profile-email">
            {/* {role === 'administrator' ? 'Email' : 'Email'} */} Email
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input
              name="email"
              type="email"
              data-testid="profile-email-input"
              placeholder={userEmail}
              readOnly
            />
          </label>
          <br />
          <button
            className="save-btn"
            type="button"
            data-testid="profile-save-btn"
            disabled={!disableBtn}
            onClick={(e) => handleUpdate(e)}
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
