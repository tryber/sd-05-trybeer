import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const containerStyle = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
};

const cardStyle = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  color: 'black',
};

const getTime = (date) => {
  const hh = date.getHours();
  const mm = date.getMinutes();
  return `${hh}:${mm >= 10 ? '' : '0'}${mm}`;
}

const ChatMessage = ({ buffer }) => {

  const [redirect, setRedirect] = useState(null);
  const date = new Date(buffer.createdAt);
  if (redirect) return <Redirect to={ redirect } />;
  return (
    <div
      style={containerStyle}
      data-testid="new-transmission-line-btn"
      onClick={ () => {
        setRedirect(`/admin/chat/${buffer?.from.id}`);
      }}
    >
      <div
        className={`blue-mid-bg card margin-small`}
        style={cardStyle}
      >
        <div className="card-content">
          <span className="card-title white-mid-cl" data-testid="profile-name">
            { buffer.from.email }
          </span>
          <small className="white-mid-cl" data-testid="last-message">
            Última mensagem às { getTime(date) }
          </small>
        </div>
      </div>
  </div>  
  );
};

export default ChatMessage;
