import React from "react";
// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import "../index.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Orders Page</h1>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Customer ID: {order.customerId}</p>
          <p>Order Placed at: {order.timestamp}</p>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
