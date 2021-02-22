import React, { useEffect, useState } from 'react';
import Restrict from '../Components/Restrict';
import Header from '../Components/Header';
import ChatMessage from '../Components/ChatMessage';
import helper from '../Helper';

import Input from '../Components/Input';

const containerStyle = {
  justifyContent: 'space-between',
  minHeight: '90vh',
};

const Chat = ({ history, to, socket }) => {

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const { messages } = helper.getUserData();
    setChat(messages);
  }, []);

  useEffect(() => {
    socket.on(socket.id, (newMessage) => {
      setChat([...chat, newMessage]);
    });
  },[chat]);

  const messageHandle = () => ({ target: { value } }) => {
    setMessage(value);
  };

  const isSelfMessage = (msg) => {
    const { id } = helper.getUserData();
    return socket.id === msg?.from.socketId || msg?.from.id === id;
  };

  return (
    <Restrict>
      <Header pathname={ history.location.pathname } />
      <div className="container-main">
        <div className="container-screen" style={containerStyle}>
          <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            { chat.map((chatBuffer) => (
              <ChatMessage
                key={chatBuffer.createdAt}
                buffer={chatBuffer}
                isSelf={isSelfMessage(chatBuffer)}
              />
            )) }
          </div>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Input
              placeholder="Insira sua mensagem aqui"
              test="message-input"
              onChange={messageHandle()}
            />
            <button
              className="btn"
              data-testid="send-message"
              onClick={() => { socket.emit('message', { message, to }) }}
              style={{ marginLeft: '8px' }}
            >
              <i className="material-icons">send</i>
            </button>
          </div>
        </div>
      </div>
    </Restrict>
  );
};

export default helper.Socket(Chat);
