import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './NavBar'; // Ensure the correct import path

import MenuTable from '../pages/MenuTable';
import OrderList from '../pages/OrderList';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import OrdersPage from '../pages/OrdersPage';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Ensure Navbar component is correctly imported and used */}
        
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/main" component={MainPage} />
          <Route path="/orders" component={OrdersPage} />
          <Route path="/menu" component={MenuTable} />
          <Route path="/order-list" component={OrderList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;




