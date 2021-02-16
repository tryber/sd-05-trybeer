const socketIo = require('socket.io');
const { checkToken } = require('../auth/jwt.auth');

const users = {};

const formatMessage = (from, to) => (message) => ({
  from,
  to,
  message,
  createdAt: new Date(),
});

const run = (...server) => async ({ mongoConnection, userConnection }) => {
  // Setup connection
  const io = socketIo(...server);

  io.on('connection', async (socket) => {

    socket.on('init_user', async (token) => {
      try {
        const { payload } = checkToken(token);
        users[socket.id] = { ...payload, socketId: socket.id };
      } catch ({ message }) {
        console.error(message);
      }
    });

    socket.on('test_message', async ({ message }) => {
      const messageBuffer = formatMessage(users[socket.id], {})(message);
      io.emit(socket.id, [messageBuffer]);
    });

    socket.on('message', async ({ message, to }) => {
      const messageCollection = await mongoConnection('messages');
      const [client] = Object.entries(users)
        .filter(([_, client]) => (client.id === to));
      
      // Aqui vou registrar o buffer no mongo
      // Preciso buscar os dados do 'to' para configurar o messageBuff
      const messageBuffer = formatMessage(users[socket.id], {})(message);

      if (client && client.length) { // Verifica se o cliente está online
        const [clientSocket] = client;
        messageBuffer.to = users[clientSocket];
      } else {
        // Caso o cliente esteja offline, faz a busca no banco de dados
        try {
          const { dataValues } = await userConnection.findOne({
            where: { id: to },
            attributes: ['id', 'name', 'email', 'role'],
          });
          messageBuffer.to = dataValues;
        } catch (err) {
          console.error(err.message);
        }
      }
      await messageCollection.insertOne(messageBuffer);
      io.emit('room', messageBuffer);
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
