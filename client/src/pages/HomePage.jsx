import React from "react";
import { useHistory } from "react-router-dom";
import "../style.css"; // Assuming this file contains your global styles

const LandingPage = () => {
  const history = useHistory();

  const handleAdminLogin = () => {
    history.push("/MenuTable");
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="navbar-brand">Online Food Menu</div>
        <ul className="navbar-menu">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#menu">Food Menu</a>
          </li>
          <li>
            <button onClick={handleAdminLogin}>Admin Login</button>
          </li>
        </ul>
      </nav>
      <section className="landing-section">
        <div className="landing-content">
          <h1>Welcome to Online Food Menu</h1>
          <p>
            Explore a world of culinary delights with our Food Menu app. Whether
            you're a food enthusiast or a restaurant owner, our platform is
            designed to enhance your dining experience. Discover a diverse range
            of dishes, from savory classics to innovative creations, curated to
            satisfy every palate. Join us on a gastronomic journey where flavor
            meets convenience, and let Food Menu redefine the way you experience
            food.
          </p>
          <button className="view-menu-button">
            <a href="#menu">View Menu</a>
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
