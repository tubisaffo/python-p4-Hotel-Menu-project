import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ order_items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        console.log(`Fetching order with ID: ${orderId}`); // Debug line
        const response = await fetch(`https://menu-qdlu.onrender.com/api/orders/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched order data:", data); // Debug line
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err); // Debug line
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleCheckout = () => {
    navigate("/"); // Redirect to home page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="order-container">
      <h3 className="order-title">Order Details</h3>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Menu Items</th>
            <th>Order Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {order.id ? (
            <tr>
              <td>{order.id}</td>
              <td>
                <ul>
                  {order.order_items.length > 0 ? (
                    order.order_items.map((item, index) => (
                      <li key={item.id || index}>
                        {item.menuitem_name} (x{item.quantity})
                      </li>
                    ))
                  ) : (
                    <li>No items in this order.</li>
                  )}
                </ul>
              </td>
              <td>{new Date(order.order_date).toLocaleString()}</td>
              <td>{order.status}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="4" className="empty-order-message">
                No order details available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="order-actions">
        <button className="pay-button" onClick={handleCheckout}>
          Pay & Checkout
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;

