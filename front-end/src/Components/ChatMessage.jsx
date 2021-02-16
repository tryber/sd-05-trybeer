import React from 'react';

const cardStyle = {
  width: '100%',
};

const cardPhotoStyle = {
  width: '20%',
};

const cardMessageStyle = {
  width: '80%',
};

const ChatMessage = ({ buffer }) => {
  console.log(buffer)
  return (
    <div style={cardStyle}>
      <div className="card-panel grey lighten-5 z-depth-1">
        <div style={cardPhotoStyle}>
          <img src="images/yuna.jpg" alt="" className="circle responsive-img" />
        </div>
        <div style={cardMessageStyle}>
          <span className="black-text">
            { buffer.message }
          </span>
        </div>
      </div>
    </div>  
  );
};

export default ChatMessage;
