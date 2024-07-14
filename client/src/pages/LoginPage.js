import React from "react";
import { useHistory } from "react-router-dom";
import "../index.css";

const LoginPage = () => {
  const history = useHistory();

  const handleLogin = (role) => {
    if (role === "staff") {
      history.push("/main");
    } else if (role === "admin") {
      history.push("/menu");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <div className="login-buttons">
        <button onClick={handleLogin}>Staff Login</button>
        <button onClick={handleLogin}>Admin Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
