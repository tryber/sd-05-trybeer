import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Restrict from '../Components/Restrict';
import AdminSideBar from '../Components/AdminSideBar';
import helper from '../Helper';

import M from 'materialize-css';

const AdminOrders = ({ history }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    helper.fetch.getSalesOrder().then((result) => {
      console.log(typeof result);
      if (!result.message) setOrders(result);
      if(result.message) M.toast(
        { html: `<p>${result.message}</p>`, classes: 'dandrea' },
      );
    });
    console.log(orders)
  }, []);

  return (
    <Restrict>
      {' '}
      <div>
        <AdminSideBar />
        <div className="responsive-list">
          {orders &&
            orders.map(
              (
                {
                  id: orderNumber,
                  total_price: orderPrice,
                  delivery_address: address,
                  delivery_number: addressNumber,
                  status,
                },
                index,
              ) => (
                <div className="blue-mid-bg card margin-small">
                  <Link
                    className="white-text"
                    to={`/admin/orders/${orderNumber}`}
                    key={orderNumber}
                  >
                    <div className="space-between">
                      <span
                        className="elements"
                        data-testid={`${index}-order-number`}
                      >
                        {`Pedido ${orderNumber}`}
                      </span>
                      <span
                        data-testid={`${index}-order-status`}
                        className="elements"
                      >
                        {status}
                      </span>
                    </div>
                    <div className="horizontal-center">
                      <h6
                        className="elements"
                        data-testid={`${index}-order-total-value`}
                      >
                        {`R$ ${helper.transformPrice(orderPrice)}`}
                      </h6>
                    </div>
                    <hr style={{ border: '1px dashed' }} />
                    <div className="horizontal-center">
                      <span
                        className="elements"
                        data-testid={`${index}-order-address`}
                      >
                        {`${address}, ${addressNumber}`}
                      </span>
                    </div>
                  </Link>
                </div>
              ),
            )}
        </div>
      </div>
    </Restrict>
  );
};

export default AdminOrders;
