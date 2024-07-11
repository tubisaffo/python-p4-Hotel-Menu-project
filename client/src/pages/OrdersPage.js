<<<<<<< HEAD
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const OrdersPage = () => {
  const location = useLocation();
  const cartItems = location.state ? location.state.cartItems : [];
  const customerNumber = Math.floor(1000 + Math.random() * 9000); // Generate a random customer number
  const timeOfOrder = new Date().toLocaleString(); // Get current time

  return (
    <div>
      <Navbar />
      <h1>Orders</h1>
      {cartItems.length > 0 ? (
        <div>
          <p>Customer Number: {customerNumber}</p>
          <p>Time of Order: {timeOfOrder}</p>
          <table>
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
        <p>No orders placed</p>
      )}
    </div>
  );
};
=======
import React, { useState, useEffect } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(response => response.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div>
      <h1>Orders Page</h1>
      {orders.map(order => (
        <div key={order.id}>
          <p>Customer ID: {order.customerId}</p>
          <p>Order Placed at: {order.timestamp}</p>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
>>>>>>> main

export default OrdersPage;
