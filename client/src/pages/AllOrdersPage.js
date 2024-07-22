import React, { useEffect, useState } from "react";
import "../style.css"; // Ensure this path is correct for your project
import HomeNav from "../components/Navbar/HomeNav"; // Adjust the path if necessary

const AllOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://menu-qdlu.onrender.com/api/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="all-orders-page">
      <HomeNav cartItemCount={0} /> {/* Include HomeNav with appropriate props */}
      <h3>All Orders</h3>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.order_date).toLocaleString()}</td>
              <td>{order.status}</td>
              <td>
                <a href={`/orders/${order.id}`} className="view-details-link">
                  View Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrdersPage;



