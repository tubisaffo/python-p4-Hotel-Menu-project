import React from "react";
import { useHistory } from "react-router-dom";
import "../index.css";

const LoginPage = () => {
  const history = useHistory();

  const handleStaffLogin = () => {
    history.push("/main");
  };

  const handleAdminLogin = () => {
    history.push("/admin");
  };
  //   const handleLogin = (role) => {
  //     if (role === "staff") {
  //       history.push("/main");
  //     } else if (role === "admin") {
  //       history.push("/MenuTable");
  //     }
  // >>>>>>> b29fef8 (added images)
  // };

  return (
    <div>
      <h1>Login Page</h1>
      <div className="login-buttons">
        <button onClick={handleStaffLogin}>Staff Login</button>
        <button onClick={handleAdminLogin}>Admin Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
