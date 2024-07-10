import React, { useState, useEffect } from 'react';

const MenuTable = () => {
  // Example: State to store menu items
  const [menuItems, setMenuItems] = useState([]);

  // Example: Fetch menu items from API or database
  useEffect(() => {
    // Example fetch request
    fetch('/api/menu')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  return (
    <div>
      <h1>Menu Table</h1>
      {/* Display menu items */}
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuTable;
