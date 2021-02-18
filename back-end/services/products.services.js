const rescue = require('express-rescue');

module.exports = (requests) => {
  const getAllProducts = rescue(async (req, res, next) => {
    const allProducts = await requests.getProducts();
    if (!allProducts || allProducts.sqlMessage)
      throw new Error('Não existem produtos');
    const dataValues = allProducts.map((item) => item.dataValues);
    // console.log(allProducts);
    req.data = dataValues;
    next();
  });

  const getProductById = rescue(async (req, res, next) => {
    const { id } = req.params;
    const product = await requests.productById(id);
    if (!product) throw new Error('Não tem este produto');
    req.data = product;
    next();
  });

  const addProduct = rescue(async (req, res, next) => {
    await requests.createProduct(req.body);
    req.data = { message: 'inseriu um novo produto' };
    next();
  });
  return {
    getAllProducts,
    getProductById,
    addProduct,
  };
};

