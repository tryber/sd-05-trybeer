import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import TrybeerContext from '../../context/TrybeerContext';
import ClientMenu from '../../components/client/ClientMenu';
import { CheckoutCard } from '../../components/checkoutCard';
import '../../css/client/checkout.css';

function Checkout() {
  const [isLogged, setIsLogged] = useState(true);
  const [street, setStreet] = useState('');
  const [houseNum, setHouseNum] = useState(0);
  const [statusSale, setStatusSale] = useState(false);
  const { totalPrice } = useContext(TrybeerContext);
  const products = JSON.parse(localStorage.getItem('cart'));

  useEffect(() => {
    if (localStorage.getItem('user') === null) setIsLogged(false);
  }, []);

  const handleStreetInput = (input) => {
    setStreet(input);
    // tb mandar para bd?
  };
  const handleHouseNumInput = (input) => {
    setHouseNum(input);
    // tb mandar para bd?
  };

  const done = () => {
    document.getElementById('sucess').innerHTML = 'Compra realizada com sucesso!';
    setTimeout(() => {setStatusSale(true)}, 1000);
  }

  return (
    <div>
      <ClientMenu data-testid="top-title" title="Finalizar pedido" />
      <h3>Produtos</h3>
      {totalPrice === 0 && <h2>Não há produtos no carrinho</h2>}
      {totalPrice !== 0 && (
        <div className="orders-list">
          {products.map((item, index) => <CheckoutCard item={item} index={index} />)}
        </div>
      )}
      <p data-testid="order-total-value">
        Total:{' '}
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(totalPrice)}
      </p>
      <div className="address">
        <h3>Endereço</h3>
        <label htmlFor="street">
          Rua:
          <input
            data-testid="checkout-street-input"
            type="input"
            id="street"
            onChange={(e) => handleStreetInput(e.target.value)}
          />
        </label>
        <label htmlFor="house">
          Número da casa:
          <input
            data-testid="checkout-house-number-input"
            type="input"
            id="house"
            onChange={(e) => handleHouseNumInput(e.target.value)}
          />
        </label>
      </div>
      <button
        data-testid="checkout-finish-btn"
        disabled={totalPrice === 0 || houseNum === 0 || street === ''}
        onClick={() => done()}
        // onClick={function para disparar o closeSale do fetch.js, com id}
      >
        Finalizar pedido
      </button>
      <div id='sucess'></div>
      {statusSale && <Redirect to='/products' />}
      {!isLogged && <Redirect to="/login" />}
    </div>
  );
}

export default Checkout;
