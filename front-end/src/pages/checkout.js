import React, { useState, useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import Context from '../context/Context';
import Cart from '../components/Cart';
import SelectAddress from '../components/SelectAdress';
import Header from '../components/Header';
import { orderPlaced, getProducts } from '../services/api';

import './css/checkout.css';

const Checkout = () => {
  const [nameAdress, setNameAdress] = useState('');
  const [numberAdress, setNumberAdress] = useState('');
  const [purchase, setPurchase] = useState(false);
  const { setCart, setTotal, setBeers } = useContext(Context);
  const history = useHistory();
  const timeInterval = 3000;
  if (purchase) {
    setTimeout(() => history.push('/products'), timeInterval);
  }
  const successfulPurchase = (e) => {
    e.preventDefault();
    const { email, token, total } = localStorage;
    const cart = JSON.parse(localStorage.getItem('cart'));
    const addr = document.getElementById('select-add');
    const order = {
      totalPrice: total,
      deliveryAddress: `${addr.value} ${nameAdress}`,
      deliveryNumber: numberAdress,
      cart,
    };
    setPurchase(!purchase);
    orderPlaced(order, email, token);
    setCart([]);
    getProducts(email, token).then((data) => {
      setBeers(data)
      return localStorage.setItem('beer', JSON.stringify(data));
    });
    setTotal(0);
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('total', 0)
  };
  const lsToken = localStorage.getItem('token');
  if (!lsToken) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="back">
      <div className="testeHeader">
      <Header></Header>
      </div>
      <form id="form-checkout" className="form">
        <div className ="cart">
          <Cart />
          <br />
        </div>
        <div className="entrega">
          <h2>Endereço de Entrega</h2><br />
          <label htmlFor="address">
            <SelectAddress />
            <input
              type="text"
              name="address"
              data-testid="checkout-street-input"
              id="address"
              value={nameAdress}
              onChange={(e) => setNameAdress(`${e.target.value}`)}
              required
            />
          </label>
          <br />
          <label htmlFor="houseNumber">
            Nº:&nbsp;
            <input
              size="2"
              type="text"
              name="houseNumber"
              id="houseNumber"
              data-testid="checkout-house-number-input"
              value={numberAdress}
              onChange={(e) => setNumberAdress(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="button">
          <button
            type="submit"
            data-testid="checkout-finish-btn"
            disabled={!nameAdress || !numberAdress}
            onClick={(e) => successfulPurchase(e)}
            className="end-order"
          >
            Finalizar Pedido
          </button>
        </div>
      </form>
      {purchase && <h3 style={{color:'white' ,textAlign:'center'}}>Compra realizada com sucesso!</h3>}
    </div>
  );
};

export default Checkout;
