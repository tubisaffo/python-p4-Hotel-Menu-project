import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../style.css";

const LandingPage = () => {
  const [username, setUsername] = useState(""); // State for username
  const [role, setRole] = useState(""); // State for selected role
  const navigate = useNavigate(); // Use useNavigate

  const handleRoleClick = (selectedRole) => {
    if (username.trim() === "") {
      alert("Please enter a username."); // Alert if username is empty
      return;
    }

    if (selectedRole === "admin") {
      navigate("/menu-table"); // Redirect to admin's menu table page
    } else if (selectedRole === "staff") {
      navigate("/main-page"); // Redirect to staff's main page
    }
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Online Food Menu</h1>
      <div className="login-container">
        <h2>Member Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="role-selection-container">
          <h2>Select Your Role</h2>
          <div className="role-buttons">
            <button
              type="button"
              className={`role-button ${role === "admin" ? "active" : ""}`}
              onClick={() => {
                setRole("admin");
                handleRoleClick("admin");
              }}
            >
              Admin
            </button>
            <button
              type="button"
              className={`role-button ${role === "staff" ? "active" : ""}`}
              onClick={() => {
                setRole("staff");
                handleRoleClick("staff");
              }}
            >
              Staff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
