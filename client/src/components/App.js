import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './NavBar'; 

import MenuTable from '../pages/MenuTable';
import OrderList from '../pages/OrderList';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> 
        
    
        <Switch>
          <Route path="/" exact component={MenuTable} />
          <Route path="/orders" component={OrderList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;



