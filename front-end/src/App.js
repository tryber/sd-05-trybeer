import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegisterPage from './pages/general/RegisterPage';
import LoginPage from './pages/general/LoginPage';
import ClientProfilePage from './pages/client/ClientProfilePage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/profile" component={ ClientProfilePage } />
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
