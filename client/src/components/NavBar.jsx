// src/components/NavBar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to get current path

const Navbar = () => {
  const location = useLocation(); // Get current location

  return (
    <nav>
      <ul>
        <li>
          <Link to="/menu" className={location.pathname === '/menu' ? 'active' : ''}>
            Menu
          </Link>
        </li>
        <li>
          <Link to="/order-list" className={location.pathname === '/order-list' ? 'active' : ''}>
            Order List
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;




