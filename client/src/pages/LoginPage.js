<<<<<<< HEAD
// src/pages/LoginPage.js
import React from "react";
import { useHistory } from "react-router-dom";
=======
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../index.css';
>>>>>>> Davey

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
<<<<<<< HEAD
      <button onClick={() => handleLogin("staff")}>Staff Login</button>
      <button onClick={() => handleLogin("admin")}>Admin Login</button>
=======
      <div className="login-buttons">
        <button onClick={handleStaffLogin}>Staff Login</button>
        <button onClick={handleAdminLogin}>Admin Login</button>
      </div>
>>>>>>> Davey
    </div>
  );
};

export default LoginPage;
