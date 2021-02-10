import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../Components/Header';
import ProductCard from '../Components/ProductCard';
import Helpers from '../Helper';
import Restrict from '../Components/Restrict';

import { getProducts } from '../Helper/fetch';

const INITIAL_VALUE = 0;

function Products({ history, isLoading }) {
  const [redirect, setRedirect] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(
    Helpers.getCartInfo()?.total || INITIAL_VALUE,
  );

  useEffect(() => {
    getProducts().then((productsArray) => {
      setProducts(productsArray);
    });
  }, []);

  const onRefresh = () => {
    const t = Helpers.getCartInfo()?.total || INITIAL_VALUE;
    setTotal(t);
  };

  if (isLoading) return <p>Loading...</p>;
  if (redirect) return <Redirect to={redirect} />;

  return (
    <Restrict>
      <div className="container-main">
          <Header pathname={history.location.pathname} />
        <div className="container-pages">
          {/* <h1>Produtos</h1> */}
          <div className="row">
            <div className="col s12 m7">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRefresh={onRefresh}
                />
              ))}
            </div>
          </div>
            <h4 className='white-mid-cl' on data-testid="checkout-bottom-btn-value">
              {`R$ ${Helpers.transformPrice(total)}`}
            </h4>

          <button
            type="button"
            disabled={total === 0}
            data-testid="checkout-bottom-btn"
            onClick={() => setRedirect('/checkout')}
            to="/checkout"
            className="btn orange-bg blue-mid-cl width-80"
          >
            Ver Carrinho
          </button>
        </div>
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
