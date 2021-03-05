const { Router } = require('express');
const productsRequests = require('../services/productsRequests')
const productsServices = require('../services/products.services')(productsRequests);

const products = Router();

products.get('/', productsServices.getAllProducts, (req, res) => {
  res.status(200).json(req.data);
});

products.get('/:id', productsServices.getProductById, (req, res) => {
  res.status(200).json(req.data);
});

products.post('/', productsServices.addProduct, (req, res) => {
  res.status(200).json(req.data);
});

module.exports = products;
