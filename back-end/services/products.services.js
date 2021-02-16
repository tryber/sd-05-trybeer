const rescue = require('express-rescue');
const productsModel = require('../models2/products.model');
const {
  getProducts,
  productById,
  createProduct,
} = require('../services/productsRequests');

const getAllProducts = rescue(async (req, res, next) => {
  const allProducts = await getProducts();
  if (!allProducts || allProducts.sqlMessage)
    throw new Error('Não existem produtos');
  const dataValues = allProducts.map((item) => item.dataValues);
  // console.log(allProducts);
  req.data = dataValues;
  next();
});

const getProductById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const product = await productById(id);
  if (!product) throw new Error('Não tem este produto');
  req.data = product;
  next();
});

const addProduct = rescue(async (req, res, next) => {
  await createProduct(req.body);
  req.data = { message: 'inseriu um novo produto' };
  next();
});

module.exports = { getAllProducts, getProductById, addProduct };
