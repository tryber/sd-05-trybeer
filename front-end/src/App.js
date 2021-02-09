import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsAct } from './Redux/Actions/index';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Products from './Pages/Products';
import Checkout from './Pages/Checkout';
import ClientOrders from './Pages/ClientOrders';
import Register from './Pages/Register';
import OrderDetailsClient from './Pages/OrderDetailsClient';
import AdminProfile from './Pages/AdminProfile';
import AdminOrders from './Pages/AdminOrders';
import OrderDetailsAdmin from './Pages/OrderDetailsAdmin';

import './App.css';

// prettier-ignore
function App({ ProductsAPI }) {
  useEffect(() => {
    ProductsAPI();
  }, [ProductsAPI]);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/products" component={ Products } />
        <Route exact path="/checkout" component={ Checkout } />
        <Route exact path="/orders" component={ ClientOrders } />
        <Route path="/orders/:id" component={ OrderDetailsClient } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/admin/orders" component={ AdminOrders } />
        <Route exact path="/admin/orders/:id" component={ OrderDetailsAdmin } />
        <Route exact path="/admin/profile" component={ AdminProfile } />
      </Switch>
    </div>
  );
}

App.propTypes = {
  ProductsAPI: PropTypes.func.isRequired,
};

// Se 'products' for usado aqui, pode descomentar.

// const mapStateToProps = (state) => ({
//   products: state.productsRequestReducer.products,
// });

const mapDispatchToProps = (dispatch) => ({
  ProductsAPI: () => dispatch(getProductsAct()),
});

export default connect(null, mapDispatchToProps)(App);
