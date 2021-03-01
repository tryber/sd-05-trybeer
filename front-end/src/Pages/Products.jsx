import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../Components/Header';
import ProductCard from '../Components/ProductCard';
import helper from '../Helper';
import Restrict from '../Components/Restrict';

const fontStyle = { fontSize: '24px', fontWeight: '300' };

const checkoutBtnStyle = { display: 'flex', justifyContent: 'space-around' };

const INITIAL_VALUE = 0;

function Products({ history, isLoading }) {
  const [redirect, setRedirect] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(
    helper.getCartInfo()?.total || INITIAL_VALUE,
  );

  useEffect(() => {
    helper.fetch.getProducts().then((productsArray) => {
      setProducts(productsArray);
    });
  }, []);

  const onRefresh = () => {
    const t = helper.getCartInfo()?.total || INITIAL_VALUE;
    setTotal(t);
  };

  if (isLoading) return <p>Loading...</p>;
  if (redirect) return <Redirect to={redirect} />;

  return (
    <Restrict>
      <Header pathname={history.location.pathname} />
      <div className="container-pages">
        <div className="responsive-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRefresh={onRefresh}
            />
          ))}
        </div>
        <button
          style={checkoutBtnStyle}
          type="button"
          disabled={total === 0}
          data-testid="checkout-bottom-btn"
          onClick={() => setRedirect('/checkout')}
          to="/checkout"
          className="btn btn-large orange-bg blue-mid-cl width-380px"
        >
          <span
            data-testid="checkout-bottom-btn-value"
            style={fontStyle}
          >{`R$ ${helper.transformPrice(total)}`}</span>
          <span>{'   '}</span>
          <span>Ver Carrinho</span>
        </button>
      </div>
    </Restrict>
  );
}

Products.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  cart: PropTypes.shape(Object).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  products: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default Products;
