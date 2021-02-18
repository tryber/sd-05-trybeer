const rescue = require('express-rescue');
const { checkToken } = require('../auth/jwt.auth');

// [REFATORAR] - Somatória dos preços usando o banco e não a requisição do front
module.exports = (requests) => {
  const addSale = rescue(async (req, _res, next) => {
    const { cart, street, houseNumber } = req.body;
    if (!cart || !street || !houseNumber) throw new Error('Dados incorretos');
    const { authorization } = req.headers;
    const {
      payload: { id },
    } = checkToken(authorization);

    const total = cart.itemArray.reduce(
      (total, { price, quantity }) => total + price * Number(quantity),
      0,
    );

    const salesData = [id, total, street, houseNumber, new Date(), 'Pendente'];
    const saleId = await requests.insertSale(salesData);
    const { dataValues } = saleId;
    if (!saleId) throw new Error('deu ruim no addSale');
    if (saleId.sqlMessage)
      throw new Error('Deu ruim na hora de inserir sales_products');
    const salesProductData = await cart.itemArray.map((inCart) => ({
      sale_id: dataValues.id,
      product_id: inCart.id,
      quantity: inCart.quantity,
    }));
    const productSale = await requests.insertProductSale(salesProductData);
    // [REFATORAR] - mudar as validações conforme resposta do sequelize
    if (productSale.sqlMessage)
      throw new Error('Deu ruim na hora de inserir sales_products');
    req.data = { message: `pedido ${saleId} realizado com sucesso!` };
    next();
  });

  const getSaleByUserId = rescue(async (req, _res, next) => {
    const { id } = req.params;
    const orders = await requests.orderByUserId(id);
    if (!orders) throw new Error('não existe pedidos para este usuário');
    if (orders.sqlMessage) {
      throw new Error('deu ruim na hora de atualizar o status');
    }
    req.data = orders;
    next();
  });

  const updateStatus = rescue(async (req, _res, next) => {
    const validOptions = ['Pendente', 'Em preparo', 'Realizado'];
    const { status, id } = req.body;
    if (!status || !validOptions.includes(status) || !id)
      throw new Error('Opção de status inválida');
    const update = await requests.updateStatus(status, id);
    console.log(update);
    if (update.sqlMessage || update[0] === 0) {
      throw new Error('deu ruim na hora de atualizar o status');
    }
    req.data = { message: 'Status atualizado com sucesso!' };
    next();
  });

  const getAllSales = rescue(async (req, _res, next) => {
    const allSales = await requests.allSales();
    console.log(allSales, 'all Sales');
    if (!allSales || allSales.length === 0)
      throw new Error('Não foram cadastradas vendas');
    if (allSales.sqlMessage) {
      throw new Error('deu ruim na hora de atualizar o status');
    }
    req.data = allSales;
    next();
  });

  const detailByOrderId = rescue(async (req, _res, next) => {
    const { id } = req.params;
    const detail = await requests.detailOrder(id);
    if (!detail)
      throw new Error('Deu ruim na hora de achar o detalhe da venda');
    req.data = detail;
    next();
  });

  return {
    addSale,
    getAllSales,
    updateStatus,
    getSaleByUserId,
    detailByOrderId,
  };
};
