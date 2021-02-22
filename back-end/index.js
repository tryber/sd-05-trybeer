const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connections
const mongoConnection = require('./models/mongodb.model');
const mysqlConnection = require('./models');

// Controllers
const userController = require('./controllers/users.controller');
const productsController = require('./controllers/products.controller');
const salesController = require('./controllers/sales.controller');
const chatController = require('./controllers/chat.controller');

// Setup
const app = express();
const server = require('http').createServer(app);
const serverConfig = {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
};

app.use(cors());
app.use(bodyParser.json());

app.use('/', userController({ mongoConnection, mysqlConnection }));
app.use('/products', productsController);
app.use('/sales', salesController);

const chatConnections = {
  mongoConnection,
  mysqlConnection,
};
chatController.run(server, serverConfig)(chatConnections);

const errorMiddleware = (err, _req, res, _next) => {
  console.error(err);
  const { message } = err;
  res.status(500).json({ message });
};

app.use(errorMiddleware);

server.listen('3001', () => {
  console.log('Tô on');
});
