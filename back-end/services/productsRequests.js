const { product } = require('../models');

const getProducts = () => product.findAll();

const productById = (id) => product.findOne({ where: { id } });

const createProduct = (name, price, urlImage) =>
  product.create({ name, price, urlImage });

const deleteProduct = (id) => product.destroy({ where: { id } });

module.exports = { getProducts, productById, createProduct, deleteProduct };
