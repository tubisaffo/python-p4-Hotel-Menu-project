import React, { useState, useEffect } from 'react';

const MenuTable = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemImage, setNewItemImage] = useState(''); // New state for item image URL

  useEffect(() => {
    // Example fetch request to fetch menu items from API
    fetch('/api/menu')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  const handleAddItem = () => {
    // Example: Assuming menu items are added via a form or another interaction
    const newItem = {
      id: menuItems.length + 1, // Example: Assign a new ID
      name: newItemName,
      price: parseFloat(newItemPrice),
      description: newItemDescription,
      image: newItemImage, // Include image URL in new item
    };

    setMenuItems([...menuItems, newItem]);
    // Normally, you would send a POST request to your API to add the new item

    // Clear form fields after adding item
    setNewItemName('');
    setNewItemPrice('');
    setNewItemDescription('');
    setNewItemImage('');
  };

  const handleDeleteItem = (itemId) => {
    // Filter out the menu item with the specified ID
    const updatedItems = menuItems.filter(item => item.id !== itemId);
    setMenuItems(updatedItems);
    // Normally, you would send a DELETE request to your API to delete the item
  };

  return (
    <div className="menu-table">
      <h1 className="menu-header">Menu Table</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleAddItem(); }}>
        <label>
          Name:
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
            step="0.01"
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={newItemImage}
            onChange={(e) => setNewItemImage(e.target.value)}
          />
        </label>
        <button type="submit" className="add-button">Add Item</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th> 
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
                {item.image && (
                  <img src={item.image} alt={item.name} style={{ maxWidth: '100px' }} />
                )}
              </td>
              <td>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuTable;



