<<<<<<< HEAD
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
=======
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../index.css';
>>>>>>> Davey

const OrdersPage = () => {
  const location = useLocation();
  const cartItems = location.state ? location.state.cartItems : [];
<<<<<<< HEAD
  const customerNumber = Math.floor(1000 + Math.random() * 9000); 
  const timeOfOrder = new Date().toLocaleString(); 
=======
  const customerNumber = Math.floor(1000 + Math.random() * 9000);
  const timeOfOrder = new Date().toLocaleString();
>>>>>>> Davey

  return (
    <div>
      <Navbar />
      <h1>Orders</h1>
      {cartItems.length > 0 ? (
<<<<<<< HEAD
        <div>
          <p>Customer Number: {customerNumber}</p>
          <p>Time of Order: {timeOfOrder}</p>
          <table>
=======
        <div className="orders-content">
          <div className="orders-info">
            <p>Customer Number: {customerNumber}</p>
            <p>Time of Order: {timeOfOrder}</p>
          </div>
          <table className="orders-table">
>>>>>>> Davey
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
<<<<<<< HEAD
        <p>No orders placed</p>
=======
        <p className="orders-empty">No orders placed</p>
>>>>>>> Davey
      )}
    </div>
  );
};

export default OrdersPage;
