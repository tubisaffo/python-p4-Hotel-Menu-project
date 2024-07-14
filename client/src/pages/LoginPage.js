import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../index.css";

const LoginPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff"); // Default role is staff

  const handleLogin = () => {
    // Here you can perform validation if needed

    // Assuming validation passes, you can redirect based on the role selected
    if (role === "staff") {
      history.push("/main");
    } else if (role === "admin") {
      history.push("/menutable");
    }
    // Clear username and password fields after login attempt
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <div className="login-form">
        <label>Select Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
