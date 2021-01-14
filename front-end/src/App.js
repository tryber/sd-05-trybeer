import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import RegisterPage from './pages/general/RegisterPage';
import ClientProductPage from './pages/client/ClientProductPage';
import ClientProfilePage from './pages/client/ClientProfilePage';
import LoginPage from './pages/general/LoginPage';
import ClientMeusPedidos from './pages/client/ClientMeusPedidos';
import AdminPedidosPendentes from './pages/admin/AdminPedidosPendentes';
import './css/client/app.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/admin/orders" component={ AdminPedidosPendentes } />
        {/*         trocar rota admin/orders  */}
        <Route path="/login" component={ LoginPage } />
        <Route path="/register" component={ RegisterPage } />
        <Route path="/products" component={ ClientProductPage } />
        <Route path="/profile" component={ ClientProfilePage } />
        <Route path="/orders" component={ ClientMeusPedidos } />
        <Route path="/checkout" component={ ClientMeusPedidos } />
        {/*         trocar rota checkout  */}
        <Route path="/" component={ () => <Redirect to="/login" /> } />
      </Switch>
    </div>
  );
}

export default App;
