const socketIo = require('socket.io');
const { checkToken } = require('../auth/jwt.auth');

const users = {};

const formatMessage = (from, to) => (message) => ({
  from,
  to,
  message,
  createdAt: new Date(),
});

const run = (...server) => async ({ mongoConnection, mysqlConnection }) => {
  // Setup connection
  const io = socketIo(...server);
  const { user } = mysqlConnection; 

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

    // Criei esse socket para uma versão mais robusta do chat
    socket.on('message', async ({ message, to }) => {
      if(!users[socket.id]) return;
      const messageCollection = await mongoConnection('messages');
      const [client] = Object.entries(users)
        .filter(([_, client]) => (client.id === to));
      
      // Aqui vou registrar o buffer no mongo
      // Preciso buscar os dados do 'to' para configurar o messageBuff
      const messageBuffer = formatMessage(users[socket.id], {})(message);

      if (client && client.length) { // Verifica se o cliente está online
        const [clientSocket] = client;
        messageBuffer.to = users[clientSocket];
        io.emit(clientSocket, messageBuffer);
      } else if (to) {
        // Caso o cliente esteja offline, faz a busca no banco de dados
        try {
          const { dataValues } = await user.findOne({
            where: { id: to },
            attributes: ['id', 'name', 'email', 'role'],
          });
          messageBuffer.to = dataValues;
        } catch (err) {
          console.error(err.message);
        }
      }
      await messageCollection.insertOne(messageBuffer);
      io.emit('loja', messageBuffer);
      io.emit(socket.id, messageBuffer);
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
