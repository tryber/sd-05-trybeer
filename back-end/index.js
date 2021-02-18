const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// creating App
const app = express();

// Models
const mongoModel = require('./models/mongodb.model');

// Controllers
const userController = require('./controllers/users.controller');
const productsController = require('./controllers/products.controller');
const salesController = require('./controllers/sales.controller');
const chatController = require('./controllers/chat.controller');

// Static images
app.use('/images', express.static(__dirname + '/images'));

// Setup
const server = require('http').createServer(app);
const serverConfig = {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
};

app.use(cors());
app.use(bodyParser.json());
app.use('/', userController);

app.use('/products', productsController);
app.use('/sales', salesController);

chatController.run(server, serverConfig)(mongoModel);

const errorMiddleware = (err, _req, res, _next) => {
  console.error(err);
  const { message } = err;
  res.status(500).json({ message });
};

app.use(errorMiddleware);

server.listen('3001', () => {
  console.log('Tô on');
});
