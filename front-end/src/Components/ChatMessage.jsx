import React from 'react';

const containerStyle = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
};

const cardStyle = {
  display: 'flex',
  width: '90%',
  flexDirection: 'column',
  // alignItems: 'center',
  // justifyContent: 'space-around',
};

const cardPhotoStyle = {
  width: '20%',
  // margin: '0 12px',
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
};

const ChatMessage = ({ buffer, isSelf }) => {
  const { from = store, message, createdAt } = buffer;
  const date = new Date(createdAt);
  const flexDirection = isSelf ? 'row-reverse' : 'row';
  const messageAlign = isSelf ? 'right' : 'left';
  return (
    <div style={{ ...containerStyle, flexDirection }}>
      <div
        className={`card-panel space-around   ${
          isSelf ? 'blue-mid-bg' : 'blue-dark-bg'
        } lighten-3 z-depth-1`}
        style={{ ...cardStyle }}
      >
        <div>
          <span data-testid="text-message" className="white-mid-cl">
            {message}
          </span>
        </div>

        <div className="space-between">

          <div style={{ ...cardMessageStyle, textAlign: messageAlign }}>
            <span className="white-mid-cl">
              <small data-testid="nickname">{from?.email}</small> -{' '}
              <small data-testid="message-time">{getTime(date)}</small>
            </span>
          </div>

          <div>
            <img
              src={`https://ui-avatars.com/api/?name=${from?.email}&size=32`}
              alt=""
              className="circle responsive-img"
            />
          </div>


        </div>

      </div>
    </div>
  );
};

export default ChatMessage;
