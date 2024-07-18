import React, { useEffect, useState } from "react";
import "../style.css"; // Make sure this path is correct

const Cart = () => {
  const [chosenItems, setChosenItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setChosenItems(JSON.parse(storedItems));
    }
  }, []);

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h3 className="cart-title">Cart Items</h3>
      <table className="cart-table">
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
          {chosenItems.length > 0 ? (
            chosenItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-food-image"
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
              <td colSpan="5" className="empty-cart-message">
                Your cart is empty.
              </td>
            </tr>
          )}
        </tbody>
        {chosenItems.length > 0 && (
          <tfoot>
            <tr>
              <td colSpan="4" className="total-label">
                Total Price:
              </td>
              <td className="total-price">
                ${calculateTotalPrice(chosenItems).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      <button className="place-order-btn">Place Order</button>
    </div>
  );
};

export default Cart;
