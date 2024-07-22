import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar/HomeNav";
import "../style.css";

const OrdersPage = () => {
  const { orderId } = useParams(); // Get orderId from URL
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/orders/${orderId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const calculateTotalPrice = (items) => {
    if (!items || !Array.isArray(items)) {
      return 0;
    }
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <NavBar />
      <div className="order-container">
        <h3 className="order-title">Order Details</h3>
        <h4>Order Number: {orderDetails.orderId}</h4>
        <table className="order-table">
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
            {orderDetails.items.length > 0 ? (
              orderDetails.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-food-image"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-order-message">
                  No items found in this order.
                </td>
              </tr>
            )}
          </tbody>
          {orderDetails.items.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan="4" className="total-label">
                  Total Price:
                </td>
                <td className="total-price">
                  ${calculateTotalPrice(orderDetails.items).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
