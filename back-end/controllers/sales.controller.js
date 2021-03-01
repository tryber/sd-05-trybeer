const { Router } = require('express');

const service = require('../services/sales.services');
const requests = require('../services/salesRequests');

module.exports = ({ mysqlConnection }) => {
  const {
    addSale,
    getAllSales,
    updateStatus,
    getSaleByUserId,
    detailByOrderId,
  } = service(requests({ mysqlConnection }));
  const sales = Router();

  sales.get('/', getAllSales, (req, res) => {
    // todas as vendas
    res.status(200).json(req.data);
  });

  sales.get('/user/:id', getSaleByUserId, (req, res) => {
    // vendas especificas de um usuário
    res.status(200).json(req.data);
  });

  sales.post('/', addSale, (req, res) => {
    // adicionar um pedido
    res.status(201).json(req.data);
  });

  sales.get('/:id', detailByOrderId, (req, res) => {
    // obtendo os detalhes de uma venda
    res.status(200).json(req.data);
  });

  sales.put('/status', updateStatus, (req, res) => {
    // update no status do pedido
    res.status(200).json(req.data);
  });
  return sales;
};
