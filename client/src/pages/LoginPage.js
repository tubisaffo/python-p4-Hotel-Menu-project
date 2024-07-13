import React from 'react';
import { useHistory } from 'react-router-dom';
import '../index.css';

const LoginPage = () => {
  const history = useHistory();

  const handleStaffLogin = () => {
    history.push('/main');
  };

  const handleAdminLogin = () => {
    history.push('/admin');
  };

  return (
    <div>
      <h1>Login Page</h1>
      <div className="login-buttons">
        <button onClick={handleStaffLogin}>Staff Login</button>
        <button onClick={handleAdminLogin}>Admin Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
