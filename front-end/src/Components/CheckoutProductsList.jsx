import PropTypes from 'prop-types';
import React from 'react';
import CheckoutProductCard from './CheckoutProductCard';
import helper from '../Helper/index';

const flexItems = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const CheckoutProductsList = ({ cart, onUpdate }) => {
  return (
    <div style={flexItems}>
    <div className="responsive-list">
      {(cart.itemArray || []).map((item, index) => (
        <CheckoutProductCard
         
          key={item.id}
          item={item}
          index={index}
          callbackDelete={(id) => {
            helper.removeProductFromCartById(id);
            onUpdate(helper.getCartInfo());
          }}
        />
      ))}
    </div>
      <h4 className="white-mid-cl" data-testid="order-total-value">
        {cart.total ? (
          `Total: R$ ${helper.transformPrice(cart.total)}`
        ) : (
          <p>Não há produtos no carrinho</p>
        )}
      </h4>
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
