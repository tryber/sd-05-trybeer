const connection = require('../models2/connection.model');
const { sale, sales_product } = require('../models');

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

const allSales = () =>
  sale.findAll({
    order: [
      ['status', 'ASC'],
      ['sale_date', 'ASC'],
    ],
  });

const detailOrder = (saleId) =>
  connection
    .query(
      'SELECT sale_id, sale_date, product_id, quantity, name, price, url_image FROM Trybeer.sales_products INNER JOIN products ON sales_products.product_id = id INNER JOIN sales ON sales_products.sale_id = sales.id WHERE sale_id = ?;',
      [saleId],
    )
    .then((detail) => detail[0]);

module.exports = {
  insertSale,
  insertProductSale,
  updateStatus,
  orderById,
  allSales,
  detailOrder,
};
