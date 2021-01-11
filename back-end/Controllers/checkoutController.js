const { Router } = require('express');

const service = require('../Service/checkoutService');

const checkout = Router();

checkout.post('/', async (req, res) => {
  try {
    const { endereco, numero } = req.body;
    // const checkoutProducts = await service.getCheckout(email, password);
    const checkoutProducts = await service.getCheckout();
    /* if (checkoutProducts.error) {
      return res.status(checkoutProducts.statusCode).json({ message: checkoutProducts.message });
    } */
    console.log(checkoutProducts);
    res.status(200).json(checkoutProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

module.exports = checkout;
