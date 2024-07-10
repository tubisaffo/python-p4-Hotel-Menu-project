import React from 'react';

const OrderList = () => {
  const orders = [
    { id: 1, description: "Order 1" },
    { id: 2, description: "Order 2" }
  ];

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order #{order.id}: {order.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
