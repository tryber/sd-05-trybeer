import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import helper from '../Helper/index';

// const cssProvisorio = {
//   display: 'flex',
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   width: '35%',
// };

// Me falem se tinha melhor opção que usar várias divs, por favor, Paulo
function CheckoutProductCard({ item, index, callbackDelete }) {
  const { quantity, name, price, id } = item;
  return (
    <div className="card blue-mid-bg margin-small">
      <div  class="card-content padding-8px white-text">
        <div>
          <h6 data-testid={`${index}-product-name`}>{name}</h6>
          <h6 className='margin-bot' data-testid={`${index}-product-unit-price`}>
            {`(R$ ${helper.transformPrice(price)} un)`}
          </h6>
        </div>
        <div className="price-quantity-total">
          <div className="checkout-quantity">
            <h6 data-testid={`${index}-product-qtd-input`}>{quantity} </h6>
          </div>
          <h6 data-testid={`${index}-product-total-value`}>
            {`R$ ${helper.transformPrice(Number(quantity) * Number(price))}`}
          </h6>
          <button
            className="waves-effect waves-light btn-flat  yellow-main-bg white-mid-cl"
            onClick={() => callbackDelete(id)}
            type="button"
            data-testid={`${index}-removal-button`}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}

CheckoutProductCard.propTypes = {
  i: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  triggerDelete: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.productsRequestReducer.cart,
});

export default connect(mapStateToProps)(CheckoutProductCard);
