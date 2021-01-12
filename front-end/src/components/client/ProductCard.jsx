import React from 'react';
import PropTypes from 'prop-types';
// import ClientContext from '../../context/client/ClientContext';
import QuantityButton from './QuantityButton';

const ProdCard = (props) => {
  
  const { product, index } = props;

  return (
    <div key={ product.id } className="card-body">
      <div className="divImage">
        <img
          height='70px' 
          src={ product.url_image }
          data-testid={ `${index}-product-img` }
          className="card-image"
          alt={product.name}
        />
      </div>
      <div data-testid={ `${index}-product-name` } className="cart-name">
        { product.name }
      </div>
      <div data-testid={ `${index}-product-price` } className="cart-price">
        <div>
          { `R$ ${product.price.toString().replace('.', ',')}` }
        </div>
      </div>
      <QuantityButton price={product.price} />
    </div>
  );
}

ProdCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProdCard;
