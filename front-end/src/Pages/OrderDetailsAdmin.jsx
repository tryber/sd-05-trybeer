import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Restrict from '../Components/Restrict';
import { salesById } from '../Redux/Services';
import Helper from '../Helper/index';

const DECIMALS = 2;

const OrderDetailsAdmin = ({
  match: {
    params: { id },
  },
}) => {
  const [isPendente, setIsPendente] = useState(true);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    salesById(id).then((data) => setOrder(data));
  }, [id]);

  const total = Helper.totalPriceOfProducts(order);
  const setAsPendente = () => {
    // marcar como pendente na store e no banco

    // ---
    setIsPendente(false);
  };

  return (
    <Restrict>
      {/* <Header pathname={ history.location.pathname } /> */}
      <h2 data-testid="order-number">
        Pedido
        {id}
      </h2>
      <h2 data-testid="order-status" style={ { color: isPendente ? 'yellow' : 'green' } }>
        {isPendente ? <p>Pendente</p> : <p>Entregue</p>}
      </h2>
      <div className="lista-dos-produtos">
        {order.map((product, index) => (
          // Usar component de card usado em outro requisito

          <div key={ product.name }>
            <span data-testid={ `${index}-product-qtd` }>
              {product.quantity}
              {' '}
              -
              {' '}
            </span>
            <span data-testid={ `${index}-product-name` }>
              {product.name}
              {' '}
            </span>
            <span data-testid={ `${index}-product-total-value` }>
              R$
              {parseFloat(product.price * product.quantity, DECIMALS)}
            </span>
            <span data-testid="0-order-unit-price">
              (R$
              {product.price}
              {' '}
              un)
            </span>
          </div>
        ))}
        <div data-testid="order-total-value">
          Total: R$
          {total}
        </div>
      </div>
      {isPendente && (
        <button type="button" onClick={ () => setAsPendente() }>
          Marcar como entregue
        </button>
      )}
    </Restrict>
  );
};

OrderDetailsAdmin.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default OrderDetailsAdmin;
