import React from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();

  return (
    <nav>
      <button onClick={() => history.push('/main')} style={{ color: '#fff' }}>Home</button>
      <button onClick={() => history.push('/orders')} style={{ color: '#fff' }}>Orders</button>
    </nav>
  );
};

export default Navbar;
