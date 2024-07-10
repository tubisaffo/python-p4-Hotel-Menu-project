import React, { useState, useEffect } from 'react';

const MainPage = () => {
  const [menuItems, setMenuItems] = useState([]);

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
  return (
    <div>
      <h1>Main Page - Menu</h1>
      <div className="menu-list">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            {/* Add 'Add to Cart' button or functionality here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
