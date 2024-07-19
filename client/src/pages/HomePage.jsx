import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "../style.css";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff"); // Default to 'staff'
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Use useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login success; replace with actual authentication logic
    const isAdmin = role === "admin"; // Check if the selected role is admin
    const isStaff = role === "staff"; // Check if the selected role is staff

    if (isAdmin) {
      navigate("/menu-table"); // Redirect to admin's menu table page
    } else if (isStaff) {
      navigate("/main-page"); // Redirect to staff's main page
    } else {
      // Handle incorrect credentials or other cases
      console.log("Invalid role");
    }
  };

  return (
    <div className="landing-page">
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
          <div className="login-container">
            <h2>Member Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  id="Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
                <a href="# ">Forgot password?</a>
              </div>
              <button type="submit">LOGIN</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
