import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming Navbar.js is in the same directory
import MenuTable from '../pages/MenuTable'; // Assuming MenuTable.js is in src/pages
import OrderList from '../pages/OrderList'; // Assuming OrderList.js is in src/pages

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />

        {/* Define your routes */}
        <Switch>
          <Route path="/" exact component={MenuTable} />
          <Route path="/orders" component={OrderList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;




