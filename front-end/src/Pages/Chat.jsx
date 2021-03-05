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

const Chat = ({
  history,
  match: {
    params: { id = null },
  },
  socket,
}) => {

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState([]);

  const updateChat = (messages) => {
    setChat(
      id ? messages.filter(({ from: { id: sid}, to }) => (
          (String(sid) === String(id)) || (String(to.id) === String(id))
        ))
        : messages,
    );
  }

  useEffect(() => {
    let messages = helper.getChatMessages();
    updateChat(messages);
    const x = helper.getUserData().role === 'Client' ? socket.id : 'loja';

    socket.on(x, (newMessage) => {
      messages = helper.getChatMessages();
      updateChat([...messages, newMessage]);
      helper.updateChat(newMessage);
    });
    return () => {
      socket.off(x);
    }
  }, []);

  const messageHandle = () => ({ target: { value } }) => {
    setMessage(value);
  };

  const isSelfMessage = (msg) => {
    const { id: selfId } = helper.getUserData();
    return socket.id === msg?.from.socketId || msg?.from.id === selfId;
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
          <div  style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: "center" }}>
            <Input
              name="message"
              placeholder="Insira sua mensagem aqui"
              test="message-input"
              onChange={messageHandle()}
            />
            <button
              className="waves-effect waves-teal btn-flat yellow-main-bg white-mid-cl"
              data-testid="send-message"
              disabled={!message.length}
              onClick={() => {
                socket.emit('message', { message, to: id });
                document.getElementById('input_message').value = '';
                setMessage('');
              }}
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
