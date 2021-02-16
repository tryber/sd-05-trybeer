import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../Components/Header';
import ProductCard from '../Components/ProductCard';
import helper from '../Helper';
import Restrict from '../Components/Restrict';

import M from 'materialize-css';

const INITIAL_VALUE = 0;

function Products({ history, isLoading }) {
  const [redirect, setRedirect] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(helper.getCartInfo()?.total || INITIAL_VALUE);

  useEffect(() => {
    helper.fetch.getProducts()
      .then((productsArray) => {
        if (productsArray.message) {
          M.toast(
            { html: productsArray.message, classes: 'dandrea' },
          );
          return;
        }
        setProducts(productsArray || []);
      });
  }, []);

  const onRefresh = () => {
    const t = helper.getCartInfo()?.total || INITIAL_VALUE;
    setTotal(t);
  }

  if (isLoading) return <p>Loading...</p>;
  if (redirect) return <Redirect to={ redirect } />;

  return (
    <Restrict>
      <Header pathname={ history.location.pathname } />
      <h1>Produtos</h1>
      {products.map((product) => (
        <ProductCard key={ product.id } product={ product } onRefresh={ onRefresh } />
      ))}
      <button
        type="button"
        disabled={ total === 0 }
        data-testid="checkout-bottom-btn"
        onClick={ () => setRedirect('/checkout') }
        to="/checkout"
      >
        Ver Carrinho
        <p on data-testid="checkout-bottom-btn-value">
          {`R$ ${helper.transformPrice(total)}`}
        </p>
      </button>
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
