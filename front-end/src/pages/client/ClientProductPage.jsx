import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ProdCard from '../../components/client/ProductCard';
import { ClientContext } from '../../context/client/ClientProvider';
import productsApi from '../../services/client/api';
import Menu from '../../components/client/Menu';
import '../../css/clientProductPage.css';
import GeneralContext from '../../context/general/GeneralContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const {cart, setCart, cartItens, setCartItens } = useContext(ClientContext);
  const { loggedIn } = useContext(GeneralContext);
  const token = localStorage.getItem('token') || null;

  const dois = 2;

  console.log(products);

  // const initialCart = localStorage.getItem('cart');

  // useEffect(() => {
  //   // const cartValue = (parseFloat(localStorage.getItem('cart')) || 0) + cart;
  //   // console.log(typeof cartValue);
  //   if (cart !== 0) {
  //     localStorage.setItem('cart', (cart).toString())
  //   }}, [cart]);

  useEffect(() => {
    // const cartValue = (parseFloat(localStorage.getItem('cart')) || 0) + cart;
    // console.log(typeof cartValue);
    if (cart >= 0) {
      localStorage.setItem('cart', (cart).toString());
    }
  }, [cart]);

  useEffect(() => {
    productsApi().then((response) => setProducts(response));
    const cartValue = (parseFloat(localStorage.getItem('cart')) || 0);
    setCart(cartValue);
    const cartIt = JSON.parse(localStorage.getItem('cart itens')) || [];
    localStorage.setItem('cart itens', JSON.stringify(cartIt));
    setCartItens(cartIt);
  }, []);

  // useEffect(() => {
  //   productsApi().then(response => setProducts(response));
  //   const cartValue = (parseFloat(localStorage.getItem('cart')) || 0);
  //   setCart(cartValue)
  // }, []);

  if (!token) return <Redirect to="/login" />;

  return (
    <div>
      <Menu title="TryBeer" />
      <div className="listProducts marginTop">
        {products.map((product, index) => (
          <ProdCard index={ index } product={ product } />
        ))}
      </div>
      <div className="ver-carrinho">
        <Link to="/checkout" className="linkCar">
          <button
            type="button"
            data-testid="checkout-bottom-btn"
            className="buttonCart"
            disabled={cartItens.length === 0}
          >
            Ver Carrinho
            <span data-testid="checkout-bottom-btn-value" className="somaCart">
              {` R$ ${Number(cart).toFixed(dois).replace('.', ',')}`}
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Products;
