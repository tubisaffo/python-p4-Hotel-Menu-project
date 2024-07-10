import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar'; 

const MainPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const placeOrder = () => {
    history.push('/orders', { cartItems });
  };

  return (
    <div>
      <Navbar /> 
      <h1>Hotel Menu</h1>
      <div className="menu-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in cart</p>
        )}
        {cartItems.length > 0 && (
          <button onClick={placeOrder}>
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default MainPage;
