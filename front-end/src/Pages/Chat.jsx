import React, { useEffect, useState } from 'react';
import Restrict from '../Components/Restrict';
import Header from '../Components/Header';
import ChatMessage from '../Components/ChatMessage';
import helper from '../Helper';

const pageStyle = {
  justifyContent: 'center',
};

const containerStyle = {
  justifyContent: 'space-between',
  height: '250px',
};


const Chat = ({ history, socket }) => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on(socket.id, (message) => {
      setMessages(message);
    });
  },[]);

  return (
    <Restrict>
      <Header pathname={ history.location.pathname } />
      <div className="container-main" style={pageStyle}>
        <div className="container-screen" style={containerStyle}>
          { messages.map((message) => <ChatMessage buffer={message}/>) }
          <button
            onClick={() => { socket.emit('test_message', { message: 'olá mundo!' }) }}
          >asd</button>
        </div>
      </div>
    </Restrict>
  );
};

export default helper.Socket(Chat);
