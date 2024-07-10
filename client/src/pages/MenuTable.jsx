import React, { useState, useEffect } from 'react';

const MenuTable = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Example fetch request to fetch menu items from API
    fetch('/api/menu')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  return (
    <div className="menu-table">
      <h1 className="menu-header">Menu Table</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.description}</td>
              <td>
                {/* Action buttons (e.g., edit and delete) */}
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuTable;
