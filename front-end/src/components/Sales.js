import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { getOrders } from '../services/api';
import './cssComponents/sales.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('email') || '';
    const token = localStorage.getItem('token') || '';
    getOrders(email, token).then((sales) => setOrders(sales));
  }, []);

  const formatDate = (saleDate) =>
    new Date(saleDate).toLocaleDateString('pt-br', {
      day: '2-digit',
      month: '2-digit',
    });

  return (
    <div className='main-container'>
      <span className="page-title">Pedidos</span>
    <div className="table-wrapper">
      <table className="table-sales">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Nº do pedido</th>
            <th>Data</th>
            <th style={{ textAlign: 'center' }}>Preço total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order + index}
              data-testid={`${index}-order-card-container`}
            >
              <td
                style={{ textAlign: 'left' }}
                data-testid={`${index}-order-number`}
              >
                {`Pedido ${order.id}`}
              </td>
              <td
                style={{ textAlign: 'center' }}
                data-testid={`${index}-order-date`}
              >
                {formatDate(order.sale_date)}
              </td>
              <td
                style={{ textAlign: 'center' }}
                data-testid={`${index}-order-total-value`}
              >
                {`R$ ${order.total_price.replace('.', ',')}`}
              </td>
              <td>
                <Link
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    textDecoration: 'underline',
                  }}
                  to={`/orders/${order.id}`}
                  key={order.id}
                >
                  <span>ver pedido</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
