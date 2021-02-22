import React from 'react';

const containerStyle = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
};

const cardStyle = {
  display: 'flex',
  width: '90%',
  alignItems: 'center',
};

const cardPhotoStyle = {
  width: '20%',
  margin: '0 12px',
};

const cardMessageStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '80%',
};

const store = {
  email: 'Loja',
};

const getTime = (date) => {
  const hh = date.getHours();
  const mm = date.getMinutes();
  return `${hh}:${mm >= 10 ? '' : '0'}${mm}`;
}

const ChatMessage = ({ buffer, isSelf }) => {
  const { from = store, message, createdAt } = buffer;
  const date = new Date(createdAt);
  const flexDirection = isSelf ? 'row-reverse' : 'row';
  const messageAlign = isSelf ? 'right' : 'left';
  return (
    <div style={{ ...containerStyle, flexDirection }}>
      <div
        className={`card-panel ${isSelf ? 'yellow' : 'grey'} lighten-3 z-depth-1`}
        style={{ ...cardStyle, flexDirection }}
      >
        <div style={cardPhotoStyle}>
          <img
            src={`https://ui-avatars.com/api/?name=${from?.email}&size=48`}
            alt=""
            className="circle responsive-img"
          />
        </div>
        <div style={{ ...cardMessageStyle, textAlign: messageAlign }}>
          <span className="green-text">
            <small data-testid="nickname">{from?.email}</small> -
            <small data-testid="message-time">{getTime(date)}</small>
          </span>
          <hr />
          <span
            data-testid="text-message"
            className="black-text"
          >
            { message }
          </span>
        </div>
      </div>
    </div>  
  );
};

export default ChatMessage;
