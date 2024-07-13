import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../index.css';

const OrdersPage = () => {
  const location = useLocation();
  const cartItems = location.state ? location.state.cartItems : [];
  const customerNumber = Math.floor(1000 + Math.random() * 9000);
  const timeOfOrder = new Date().toLocaleString();

  return (
    <div>
      <Navbar />
      <h1>Orders</h1>
      {cartItems.length > 0 ? (
        <div className="orders-content">
          <div className="orders-info">
            <p>Customer Number: {customerNumber}</p>
            <p>Time of Order: {timeOfOrder}</p>
          </div>
          <table className="orders-table">
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
        <p className="orders-empty">No orders placed</p>
      )}
    </div>
  );
};

export default OrdersPage;
