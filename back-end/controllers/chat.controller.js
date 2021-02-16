const socketIo = require('socket.io');
const { checkToken } = require('../auth/jwt.auth');

const users = {};

const formatMessage = (from, to) => (message) => ({
  from,
  to,
  message,
  createdAt: new Date(),
});

const run = (...server) => async (connection) => {
  // Setup connection
  const io = socketIo(...server);

  io.on('connection', async (socket) => {

    socket.on('init_user', async (token) => {
      try {
        const { payload } = checkToken(token);
        users[socket.id] = payload;
      } catch ({ message }) {
        console.error(message);
      }
    });

    socket.on('test_message', async ({ message }) => {
      const messageBuffer = formatMessage(users[socket.id], {})(message);
      io.emit(socket.id, [messageBuffer]);
    });

    socket.on('message', async ({ message, to }) => {
      const [client] = Object.entries(users)
        .filter(([_, client]) => (client.id === to));
      
      // Aqui vou registrar o buffer no mongo
      // Preciso buscar os dados do 'to' para configurar o messageBuffer
      const messageBuffer = formatMessage(users[socket.id], {})(message);

      if (client.length) { // Verifica se o cliente está online
        const [clientSocket] = client;
        messageBuffer.to = users[clientSocket];
        io.emit(clientSocket, messageBuffer);
      };
      // const messageCollection = await connection('messages');
    });

    socket.on('disconnect', () => {
      delete users[socket.id];
      socket.disconnect(0);
    });
  });
};

module.exports = {
  users,
  run,
}
