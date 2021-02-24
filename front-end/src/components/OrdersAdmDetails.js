import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { updateStatus, getAdmOrderById } from '../services/api';
import Header from './Header';
import './cssComponents/ordersAdminDetails.css';

const OrdersAdminDetails = (props) => {
  const zero = 0;
  const two = 2;
  const { match: { params: { id } } } = props;
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState('Pendente');
  const { role, token } = localStorage;

  useEffect(() => {
    getAdmOrderById(role, id, token).then((sale) => setOrder(sale));
  }, []);// eslint-disable-line

  const handleClick = () => {
    updateStatus(role, id, token).then(() => setStatus('Entregue'));
  };

  return (
    <div className='main'>
      <Header></Header>
      <table className='adm-details-table'>
        <caption style={{color:'white',fontSize:'1.5em', fontWeight:'700'}}data-testid="order-number">
          {`Pedido ${id}`}
        </caption>
        <span data-testid="order-status">{`${status}`}</span>
        <tr>
          <th style={{textAlign:'left'}}>Produto</th>
          <th>Preço Un</th>
          <th style={{paddingLeft:'10px'}}>Qtde</th>
          <th>Total</th>
        </tr>
        {order.map((product, index) => (
          <tr key={ product.name }>
            <td data-testid={ `${index}-product-name` }>{product.name}</td>
            <td style={{paddingLeft:'10px'}} data-testid={ `${index}-order-unit-price` }>{ `R$${product.price.replace('.', ',')}` }</td>
            <td style={{textAlign:'center'}}data-testid={ `${index}-product-qtd` }>{product.quantity}</td>
            <td data-testid={ `${index}-product-total-value` }>{`R$ ${(product.price * product.quantity).toFixed(two).replace('.', ',')}`}</td>
          </tr>
        ))}
      </table>
      <p style={{color:'white',fontSize:'1.2em',textAlign:'center', marginTop:'10px'}}data-testid="order-total-value">{order[0] ? `Total do Pedido R$ ${String(order[0].total_price).replace('.', ',')}` : zero}</p>
      {status === 'Pendente' ? <button type="button" className='order-adm-btn' data-testid="mark-as-delivered-btn" onClick={ handleClick }>Marcar como entregue</button> : <p style={{textAlign:'center'}}>Status alterado</p> }
    </div>
  );
};

OrdersAdminDetails.propTypes = {
  match: PropTypes.number.isRequired,
  params: PropTypes.number.isRequired,
};
export default OrdersAdminDetails;
