import React from "react";
import { Link } from "react-router-dom";
import "../../style.css"; // Adjust the path as needed

const HomeNav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Online Food Menu</div>
      <ul className="navbar-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/main-page">Menu</Link>
        </li>
        <li>
          <Link to="/order">Order</Link>
        </li>
        <li>
          <Link to="/Adminlogin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNav;
