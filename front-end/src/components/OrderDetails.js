import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getOrderById } from '../services/api';
import Header from './Header';
import './cssComponents/orderDetails.css';
const OrderDetails = (props) => {
  const zero = 0;
  const two = 2;
  const [products, setProducts] = useState([]);
  const [totalP, setTotalP] = useState(zero);
  const [dataSale, setDataSale] = useState('');
  const { match: { params: { id } } } = props;
  const formatDate = (saleDate) => (
    new Date(saleDate).toLocaleDateString('pt-br', {
      day: '2-digit',
      month: '2-digit',
    })
  );
  useEffect(() => {
    const token = (localStorage.getItem('token') || '');
    getOrderById(token, id).then((orders) => {
      setTotalP(orders[0].total_price);
      setDataSale(orders[0].sale_date);
      return setProducts(orders);
    });
  }, []);// eslint-disable-line

  const lsToken = localStorage.getItem('token');
  if (!lsToken) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Header />
      <table className='order-details-table'>
        <caption style={{color:'white', fontSize:'1.5em'}} data-testid="order-number">
          {`Pedido ${id}`}
        </caption>
        <tr>
          <th style={{textAlign: "left"}}>Produto</th>
          <th>Preço</th>
          <th>Qtde</th>
          <th>Preço total</th>
        </tr>
        {products.map((product, index) => (
          <tr key={ product.name }>
            <td data-testid={ `${index}-product-name` }>{product.name}</td>
            <td style={{textAlign: "center"}}>{ `R$ ${product.price}` }</td>
            <td style={{textAlign: "center"}} data-testid={ `${index}-product-qtd` }>{product.quantity}</td>
            <td style={{textAlign: "center"}} data-testid={ `${index}-product-total-value` }>{`R$ ${(product.price * product.quantity).toFixed(two).replace('.', ',')}`}</td>
          </tr>
        ))}
      </table><br/>
      <p style={{color:'white', textAlign:'center'}} data-testid="order-total-value">{`Total do pedido: R$${String(totalP).replace('.', ',')}`}</p>
      <p style={{color:'white', textAlign:'center'}} data-testid="order-date">Data do pedido:{formatDate(dataSale)}</p>
    </div>
  );
};
OrderDetails.propTypes = {
  match: PropTypes.number.isRequired,
  params: PropTypes.number.isRequired,
};
export default OrderDetails;
