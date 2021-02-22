const { Router } = require('express');
<<<<<<< HEAD
const usersRequests = require('../services/usersRequests');
const userServices = require('../services/users.service')(usersRequests);

=======
>>>>>>> Lizzard/clear

const service = require('../services/users.service');
const requests = require('../services/usersRequests');

module.exports = ({ mongoConnection, mysqlConnection }) => {
  const user = Router();
  const { register, update, login } = service(mongoConnection, requests({ mysqlConnection }));

  user.get('/', (_req, res) => {
    res.status(200).json({});
  });

  // endpoint de registro
  user.post('/register', register, (req, res) => {
    res.status(201).json(req.data);
  });

  user.post('/update', update, (req, res) => {
    res.status(200).json(req.data);
  });

  user.post('/', login, (req, res) => {
    res.status(200).json(req.data);
  });

  return user;
}
