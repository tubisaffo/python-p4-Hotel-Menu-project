import React from 'react';
import { useHistory } from 'react-router-dom';

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
      <button onClick={handleStaffLogin}>Staff Login</button>
      <button onClick={handleAdminLogin}>Admin Login</button>
    </div>
  );
}

export default LoginPage;
