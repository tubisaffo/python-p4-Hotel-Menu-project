import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import "../style.css";

const OrdersPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [order, setOrder] = useState({ order_items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Orders Page</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Items</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.items.map((item) => (
                    <p key={item.id}>
                      {item.name} (x{item.quantity})
                    </p>
                  ))}
                </td>
                <td>${order.totalPrice.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
