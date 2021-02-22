import React from 'react';

const containerStyle = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
};

const cardStyle = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
};

const getTime = (date) => {
  const hh = date.getHours();
  const mm = date.getMinutes();
  return `${hh}:${mm >= 10 ? '' : '0'}${mm}`;
}

const ChatMessage = ({ buffer }) => {
  const date = new Date(buffer.createdAt);
  return (
    <div style={containerStyle} data-testid="new-transmission-line-btn">
      <div
        className={`card-panel lighten-3 z-depth-1`}
        style={cardStyle}
      >
        <div className="card-content">
          <span className="card-title" data-testid="profile-name">
            { buffer.from.email }
          </span>
          <p data-testid="last-message">
            Última mensagem às { getTime(date) }
          </p>
        </div>
      </div>
  </div>  
  );
};

export default ChatMessage;
