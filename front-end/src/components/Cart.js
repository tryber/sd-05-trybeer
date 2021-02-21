import React, { useEffect, useState } from 'react';
import './cssComponents/cart.css';
const Cart = () => {
  const zero = 0;
  const two = 2;
  const [storage, setStorage] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );
  const [refresh, setRefresh] = useState(false);
  const [total, setTotal] = useState(zero);

  // first load
  useEffect(() => {
    setTotal(() =>
      Array.from(storage).reduce(
        (acc, product) => acc + product.qty * product.price,
        zero
      )
    );
  }, []); // eslint-disable-line
  // load on remove product
  useEffect(() => {
    setStorage(() => JSON.parse(localStorage.getItem('cart')) || []);
    setTotal(() =>
      Array.from(storage).reduce(
        (acc, product) => acc + product.qty * product.price,
        zero
      )
    );
  }, [refresh]); // eslint-disable-line

  // track total
  useEffect(() => {
    localStorage.setItem('total', total);
  }, [total]);

  const removeFromCart = (index) => {
    storage.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(storage));
    // localStorage.setItem('beer', JSON.stringify(storage));
    setRefresh(!refresh);
  };
  return storage.length ? (
    <div>
      <table className= 'order-table'>
        <thead className='head-table'>
          <tr>
            <th style= {{textAlign:'left'}}>Produto</th>
            <th>Qtde</th>
            <th>Preço unitário </th>
            <th>Preço total</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {storage.map((product, index) => (
            <tr key={product.name}>
              <td data-testid={`${index}-product-name`}>{product.name}</td>
              <td data-testid={`${index}-product-qtd-input`} style={{textAlign: "center"}}>{product.qty}</td>
              <td data-testid={`${index}-product-unit-price`} style={{textAlign: "center"}} >
                {`R$ ${product.price.replace('.', ',')}`}
              </td>
              <td data-testid={`${index}-product-total-value`} style={{textAlign: "center"}}>
                {`R$ ${(product.price * product.qty)
                  .toFixed(two)
                  .replace('.', ',')}`}
              </td>
              <td style={{textAlign: "right"}}>
                <button
                  type="button"
                  data-testid={`${index}-removal-button`}
                  onClick={() => removeFromCart(index)}
                  className="close rounded heavy"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='totalP'data-testid="order-total-value">
        <span>Total do pedido:</span>
        <span> {`R$ ${total.toFixed(two).replace('.', ',')}`}</span>
      </div>
    </div>
  ) : (
    <div>
      <h1>Não há produtos no carrinho</h1>
      <div data-testid="order-total-value">
        {`R$ ${total.toFixed(two).replace('.', ',')}`}
      </div>
    </div>
  );
};

export default Cart;
