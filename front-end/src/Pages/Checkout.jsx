import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Input from '../Components/Input';
import ProductCard from '../Components/ProductCard';

function Checkout({ history, userData, cart }) {
  const [buttonShoulBeDisabled, setbuttonShoulBeDisabled] = useState(false);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [isTotalZero, setisTotalZero] = useState(false);

  useEffect(() => {
    if (isTotalZero || street === '' || houseNumber === '') {
      setbuttonShoulBeDisabled(true);
    } else {
      setbuttonShoulBeDisabled(false);
    }
  }, [isTotalZero, setbuttonShoulBeDisabled, street, houseNumber]);

  if (!userData.user) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Header pathname={history.location.pathname} />
      <h3>Produtos</h3>
      {cart.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <h3>Endereço</h3>
      <label htmlFor="rua">Rua:</label>
      <br />
      <Input
        test={'checkout-street-input'}
        id={'rua'}
        onChange={(e) => setStreet(e.target.value)}
      />
      <br />
      <label htmlFor="numero-da-casa">Número da casa:</label>
      <br />
      <Input
        test={'checkout-house-number-input'}
        id={'numero-da-casa'}
        onChange={(e) => setHouseNumber(e.target.value)}
      />
      <button
        disabled={buttonShoulBeDisabled}
        data-testid="checkout-finish-btn"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

Checkout.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = ({ userRequestReducer, productsRequestReducer }) => ({
  userData: userRequestReducer.userData,
  cart: productsRequestReducer.cart,
});

export default connect(mapStateToProps)(Checkout);
