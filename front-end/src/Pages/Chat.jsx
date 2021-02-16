import React, { useEffect, useState } from 'react';
import Restrict from '../Components/Restrict';
import Header from '../Components/Header';
import ChatMessage from '../Components/ChatMessage';
import helper from '../Helper';

import Input from '../Components/Input';

const pageStyle = {
  justifyContent: 'center',
};

const containerStyle = {
  justifyContent: 'space-between',
  height: '250px',
};

const Chat = ({ history, socket }) => {

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    socket.on(socket.id, (chatMessages) => {
      setChat(chatMessages);
    });
  },[]);

  const messageHandle = () => ({ target: { value } }) => {
    setMessage(value);
  };

  const isSelfMessage = (msg) => socket.id === msg?.from.socketId;

  return (
    <Restrict>
      <Header pathname={ history.location.pathname } />
      <div className="container-main" style={pageStyle}>
        <div className="container-screen" style={containerStyle}>
          { chat.map((chatBuffer) => (
            <ChatMessage
              key={chatBuffer.createdAt}
              buffer={chatBuffer}
              isSelf={isSelfMessage(chatBuffer)}
            />
          )) }
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Input placeholder="Insira sua mensagem aqui" onChange={messageHandle()} />
            <button
              className="btn"
              onClick={() => { socket.emit('message', { message, to: 2 }) }}
              style={{ marginLeft: '8px' }}
            >
              <i class="material-icons">send</i>
            </button>
          </div>
        </div>
      </div>
    </Restrict>
  );
};

export default helper.Socket(Chat);
