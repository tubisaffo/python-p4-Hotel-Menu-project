import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';   // Adjusted path to LoginPage
import MainPage from '../pages/MainPage';     // Adjusted path to MainPage
import OrdersPage from '../pages/OrdersPage'; // Adjusted path to OrdersPage

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/main" component={MainPage} />
        <Route path="/orders" component={OrdersPage} />
      </Switch>
    </Router>
  );
}

export default App;
