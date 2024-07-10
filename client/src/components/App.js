import React from 'react';
import NavBar from './NavBar'; // Corrected path to import NavBar correctly
import OrderList from '../pages/OrderList'; // Corrected path to import OrderList correctly

const App = () => {
  return (
    <div>
      <NavBar />
      <h1>My Restaurant Orders</h1>
      <OrderList />
    </div>
  );
};

export default App;



