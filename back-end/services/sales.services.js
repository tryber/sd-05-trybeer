const rescue = require('express-rescue');
<<<<<<< HEAD
const salesModel = require('../models2/sales.model');
=======
const salesModel = require('../models/sales.model');
const { checkToken } = require('../auth/jwt.auth');
>>>>>>> Lizzard/clear

// [REFATORAR] - Somatória dos preços usando o banco e não a requisição do front
const addSale = rescue(async (req, _res, next) => {
  const { cart, street, houseNumber } = req.body;
  const { authorization } = req.headers;
  const { payload: { id } } = checkToken(authorization);

  const total = cart.itemArray.reduce((total, { price, quantity }) => (
    total + (price * Number(quantity))
  ), 0);

  const salesData = [
    id,
    total,
    street,
    houseNumber,
    new Date(),
    'Pendente',
  ];
  const saleId = await salesModel
    .insertSale(salesData)
    .then((product) => product[0].insertId);
  if (!saleId) throw new Error('deu ruim no addSale');
  const salesProductData = cart.itemArray.map((inCart) => [
    saleId,
    inCart.id,
    inCart.quantity,
  ]);
  const productSale = await salesModel.insertProductSale(salesProductData);
  if (productSale[0].affectedRows !== 1) throw new Error('Deu ruim na hora de inserir sales_products');
  req.data = { message: `pedido ${saleId} realizado com sucesso!` };
  next();
});

const getSaleById = rescue(async (req, _res, next) => {
  const { id } = req.params;
  const orders = await salesModel.orderById(id);
  if (!orders) throw new Error('não existe pedidos para este usuário');
  req.data = orders;
  next();
});

const updateStatus = rescue(async (req, _res, next) => {
  const { status, id } = req.body;
  const update = await salesModel.updateStatus(status, id);
  if (update[0].affectedRows !== 1) {
    throw new Error('deu ruim na hora de atualizar o status');
  }
  req.data = { message: 'Status atualizado com sucesso!' };
  next();
});

const getAllSales = rescue(async (req, _res, next) => {
  const allSales = await salesModel.allSales();
  if (!allSales) throw new Error('Deu ruim na hora de pegar todos as vendas');
  req.data = allSales;
  next();
});

const detailByOrderId = rescue(async (req, _res, next) => {
  const { id } = req.params;
  const detail = await salesModel.detailOrder(id);
  if (detail.length === 0) throw new Error('Deu ruim na hora de achar o detalhe da venda');
  req.data = detail;
  next();
});

module.exports = { addSale, getSaleById, getAllSales, updateStatus, detailByOrderId };
