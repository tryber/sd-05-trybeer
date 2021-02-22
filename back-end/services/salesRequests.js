const { sale, sales_product, product } = require('../models');

const insertSale = ([
  user_id,
  total_price,
  delivery_address,
  delivery_number,
  sale_date,
  status,
]) =>
  sale.create({
    user_id,
    total_price,
    delivery_address,
    delivery_number,
    sale_date,
    status,
  });

const insertProductSale = (data) =>
  sales_product.bulkCreate(data, {
    attributes: ['sale_id', 'product_id', 'quantity'],
  });

const updateStatus = (status, id) => sale.update({ status }, { where: { id } });

const orderById = (id) => sale.findOne({ where: { id } });

const orderByUserId = (user_id) => sale.findAll({ where: { user_id } });

const allSales = () =>
  sale.findAll({
    order: [
      ['status', 'ASC'],
      ['sale_date', 'ASC'],
    ],
  });

const detailOrder = (id) =>
  sale.findOne({
    where: { id },
    include: [
      { model: product, as: 'product',required: true, },
    ],
  });

module.exports = {
  insertSale,
  insertProductSale,
  updateStatus,
  orderById,
  allSales,
  detailOrder,
  orderByUserId,
};
