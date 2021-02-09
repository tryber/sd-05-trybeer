import PropTypes from 'prop-types';
import React from 'react';
import CheckoutProductCard from './CheckoutProductCard';
import helper from '../Helper/index';

const CheckoutProductsList = ({ cart, onUpdate }) => {
  return (
    <div>
      {(cart.itemArray || []).map((item, index) => (
        <CheckoutProductCard
          key={ item.id }
          item={ item }
          index={ index }
          callbackDelete={ (id) => { 
            helper.removeProductFromCartById(id);
            onUpdate(helper.getCartInfo());
          }}
        />
      ))}
      <div data-testid="order-total-value">
        { cart.total || <p>Não há produtos no carrinho</p> }
        { `Total: R$ ${helper.transformPrice(cart.total)}` }
      </div>
    </div>
  );
};

CheckoutProductsList.propTypes = {
  cart: PropTypes.shape({
    map: PropTypes.func,
    reduce: PropTypes.func,
  }).isRequired,
  repopulatingStore: PropTypes.func.isRequired,
  setisTotalZero: PropTypes.func.isRequired,
};

export default CheckoutProductsList;
