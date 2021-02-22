import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Restrict from '../Components/Restrict';
import helper from '../Helper';
import AdminSideBar from '../Components/AdminSideBar';
// import Header from '../Components/Header';

const OrderDetailsAdmin = ({
  match: {
    params: { id },
  },
}) => {
  const [isPendente, setIsPendente] = useState(true);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    helper.fetch.salesById(id).then((data) => setOrder(data));
  }, [id]);

  const total = helper.transformPrice(helper.totalPriceOfProducts(order));

  const setAsPendente = () => {
    // marcar como pendente na store e no banco
    helper.fetch.updateDeliveryStatus(id, 'Entregue');
    // ---
    setIsPendente(false);
  };

  return (
    <Restrict>
      asdkosakdaosd
      <div>
        <AdminSideBar />
        <div className="responsive-list">
          <div
            className="blue-mid-bg white-text card"
            style={{ margin: ' 16px 16px' }}
          >
            <div className="space-between">
              <h6 data-testid="order-number">Pedido {id}</h6>
              <div
                data-testid="order-status"
                style={{ color: isPendente ? '#FFB703' : ' #023047' }}
              >
                {isPendente ? <h6>Pendente</h6> : <h6>Entregue</h6>}
              </div>
            </div>
            <div className="horizontal-center">
              <h6 data-testid="order-total-value">Total: R$ {total}</h6>
            </div>
            <hr style={{ border: '1px dashed' }} />

            <div className="horizontal-center">
              <ul>
                {order.map((product, index) => {
                  const totalValueByProduct = helper.transformPrice(
                    product.price * product.quantity,
                  );

                  return (
                    <li key={product.name}>
                      <span data-testid={`${index}-product-qtd`}>
                        {product.quantity} -{' '}
                      </span>
                      <span data-testid={`${index}-product-name`}>
                        {product.name}{' '}
                      </span>
                      <span data-testid="0-order-unit-price">
                        (R$ {helper.transformPrice(product.price)})
                      </span>
                      <span>{'   '}</span>
                      <span>{'-'}</span>
                      <span>{'   '}</span>
                      <span data-testid={`${index}-product-total-value`}>
                        R$ {totalValueByProduct}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="horizontal-center">
              {isPendente && (
                <button
                  // style={{ textOverflow: 'ellipsis'}}
                  className="btn orange-bg blue-mid-cl"
                  data-testid="mark-as-delivered-btn"
                  type="button"
                  onClick={() => setAsPendente()}
                >
                  Marcar como entregue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
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
