import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrdersAdmin } from '../services/api';
import './cssComponents/ordersAdmin.css';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const { token, role } = localStorage;
  useEffect(() => {
    getOrdersAdmin(role, token).then((ordersData) => setOrders(ordersData));
  }, []); // eslint-disable-line

  return (
    <div className="orders-wrapper">
      {orders.map((order, index) => (
        <div
          className="adm-container"
          data-testid={`${index}-order-card-container`}
        >
          <div className="order-status">
            <span 
              style={{fontWeight:'bold'}}
              data-testid={`${index}-order-number`}
            >{`Pedido ${order.id}`}</span>
            <span data-testid={`${index}-order-status`} className={order.status === "Pendente" ? "order-pending" : "order-delivered"}>{order.status}</span>
          </div>
          <br />
          <span
            data-testid={`${index}-order-address`}
            style={{marginBottom: '7px', display:'block'}}
          >{`Endereço: ${order.delivery_address}, ${order.delivery_number}`}</span>
          <span data-testid={`${index}-order-total-value`}>
            {`Total: R$${order.total_price.replace('.', ',')}`}
          </span>
          <br />
          <br />
          <Link to={`/admin/orders/${order.id}`} key={order.id}>
            <button className="see-details-button">Ver detalhes</button>
            <br/>
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
};

export default OrdersAdmin;
