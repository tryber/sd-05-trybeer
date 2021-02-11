import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Restrict from '../Components/Restrict';
import Header from '../Components/Header';
import Helper from '../Helper';
import { salesById } from '../Helper/fetch';

const NOONE = 0;
const INITIAL = 0;

function OrderDetails({
  history,
  match: {
    params: { id },
  },
}) {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    salesById(id).then((data) => setOrder(data));
  }, [id]);

  const total = Helper.transformPrice(Helper.totalPriceOfProducts(order));
  const date =
    order.length !== NOONE
      ? Helper.transformDate(order[INITIAL].sale_date)
      : null;

  return (
    <Restrict>
      <Header pathname={history.location.pathname} />
      <div className="container-main">
        <div className="blue-mid-bg white-text card">
          <div className="space-between">
            <h6 data-testid="order-number">Pedido {id}</h6>
            <h6 data-testid="order-date">{date}</h6>
          </div>
          <div className="horizontal-center">
            <ul className="lista-dos-produtos">
              {order.map((product, index) => (
                <li key={product.name}>
                  <span data-testid={`${index}-product-qtd`}>
                    {product.quantity} -{' '}
                  </span>
                  <span data-testid={`${index}-product-name`}>
                    {product.name}{' '}
                  </span>
                  <span data-testid={`${index}-product-total-value`}>
                    R$ {Helper.transformPrice(product.price * product.quantity)}
                  </span>
                  <span>(R$ {Helper.transformPrice(product.price)} un)</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-between">
            <div></div>
            <h6 data-testid="order-total-value">Total: R$ {total}</h6>
          </div>
        </div>
      </div>
    </Restrict>
  );
}

OrderDetails.propTypes = {
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

export default OrderDetails;
