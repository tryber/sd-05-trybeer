module.exports = ({ mysqlConnection }) => {
  const { sale, sales_product, product } = mysqlConnection;

  const insertSale = async ([
    user_id,
    total_price,
    delivery_address,
    delivery_number,
    sale_date,
    status,
  ]) =>
    await sale.create({
      user_id,
      total_price,
      delivery_address,
      delivery_number,
      sale_date,
      status,
    });

  const insertProductSale = async (data) =>
    await sales_product.bulkCreate(data, {
      attributes: ['sale_id', 'product_id', 'quantity'],
    });

  const updateStatus = async (status, id) =>
    await sale.update({ status }, { where: { id } });

  const orderById = async (id) => await sale.findOne({ where: { id } });

  const orderByUserId = async (user_id) =>
    await sale.findAll({ where: { user_id } });

  const allSales = async () =>
    await sale.findAll({
      order: [
        ['status', 'ASC'],
        ['sale_date', 'ASC'],
      ],
    });

  const detailOrder = async (id) =>
    await sale.findOne({
      where: { id },
      include: [{ model: product, as: 'product', required: true }],
    });

  return {
    insertSale,
    insertProductSale,
    updateStatus,
    orderById,
    allSales,
    detailOrder,
    orderByUserId,
  };
};
