import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar/HomeNav";
import "../style.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5555/orders"); // Make sure the URL is correct
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);

        const storedOrderId = localStorage.getItem("orderId");
        if (storedOrderId) {
          const currentOrder = data.find(
            (order) => order.id === parseInt(storedOrderId)
          );
          setCurrentOrder(currentOrder);
          localStorage.removeItem("orderId"); // Clear the stored order ID
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="orders-container">
        <h3 className="orders-title">Orders</h3>
        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="order-card">
                <h4>Order ID: {order.id}</h4>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.order_date).toLocaleString()}</p>{" "}
                {/* Display order date */}
                <table className="order-items-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={item.menu_item_image}
                            alt={item.menuitem_name}
                            className="order-food-image"
                          />
                        </td>
                        <td>{item.menuitem_name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.menuitem_price.toFixed(2)}</td>
                        <td>
                          ${(item.menuitem_price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="4">Total Price:</td>
                      <td>
                        $
                        {order.items
                          .reduce(
                            (total, item) =>
                              total + item.menuitem_price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ))
          ) : (
            <p>No orders available.</p>
          )}
        </div>
        {currentOrder && (
          <div className="order-card">
            <h4>Current Order ID: {currentOrder.id}</h4>
            <p>
              Date: {new Date(currentOrder.order_date).toLocaleString()}
            </p>{" "}
            {/* Display order date */}
            <table className="order-items-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {currentOrder.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.menu_item_image}
                        alt={item.menuitem_name}
                        className="order-food-image"
                      />
                    </td>
                    <td>{item.menuitem_name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.menuitem_price.toFixed(2)}</td>
                    <td>${(item.menuitem_price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4">Total Price:</td>
                  <td>
                    $
                    {currentOrder.items
                      .reduce(
                        (total, item) =>
                          total + item.menuitem_price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
