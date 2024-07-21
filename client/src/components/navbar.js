import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style.css'; // Ensure this path matches the location of your CSS file

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage or any authentication state
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/"); // Redirect to the home page or login page
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  const totalItemsInCart = 0; // Replace with actual cart item count logic

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/main-page" className="navbar-link">Home</Link></li>
        <li className="navbar-item">
          <button onClick={navigateToCart} className="navbar-button">Cart ({totalItemsInCart})</button>
        </li>
        <li className="navbar-item"><Link to="/orders" className="navbar-link">OrdersPage</Link></li>
        <button onClick={handleLogout} className="navbar-button">Logout</button> {/* Logout button */}
      </ul>
    </nav>
  );
};

export default NavBar;
