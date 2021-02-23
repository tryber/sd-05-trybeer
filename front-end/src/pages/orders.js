import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

import Sales from '../components/Sales';
import OrdersAdmin from '../components/OrdersAdmin';

export default function Orders() {
  const lsToken = localStorage.getItem('token');
  if (!lsToken) return <Redirect to="/login" />;

  const role = localStorage.getItem('role');
  return role === 'client' ? (
    <div>
      <Header />
      <Sales />
    </div>
  ) : (
    <div>
      <Header />
      <OrdersAdmin />
    </div>
  );
}
