module.exports = ({ mysqlConnection }) => {
  const { sale, sales_product, product } = mysqlConnection;

  const getProducts = () => product.findAll();

  const productById = (id) => product.findOne({ where: { id } });

  const createProduct = (name, price, urlImage) =>
    product.create({ name, price, urlImage });

  const deleteProduct = (id) => product.destroy({ where: { id } });

  return { getProducts, productById, createProduct, deleteProduct };
};
