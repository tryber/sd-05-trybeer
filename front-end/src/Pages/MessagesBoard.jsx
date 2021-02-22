import React, { useEffect, useState } from 'react';
import Restrict from '../Components/Restrict';
// import Header from '../Components/Header';
import AdminSideBar from '../Components/AdminSideBar';
import CardMessage from '../Components/CardMessage';
import helper from '../Helper';

const containerStyle = {
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
};

const MessagesBoard = () => {

  const [lastMessages, setLastMessages] = useState([]);

  useEffect(() => {
    const { id } = helper.getUserData();
    const m = helper.getChatMessages() || [];
    const messageGroup = {};
    m.forEach(({ from }, i) => {
      if (from.id !== id) messageGroup[from.email] = m[i];
    });
    setLastMessages(Object.values(messageGroup));
  }, []);

  return (
    <Restrict>
      <AdminSideBar />
      <div className="container-main">
        <div className="container-screen" style={containerStyle}>
          {
            lastMessages.length
              ? lastMessages.map(message => (
                <CardMessage buffer={message} key={message.createdAt} />
              ))
              : <div>Nenhuma conversa por aqui.</div>
          }
        </div>
      </div>
    </Restrict>
  );
};

export default MessagesBoard;
