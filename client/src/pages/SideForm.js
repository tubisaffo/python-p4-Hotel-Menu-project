import React from 'react';

const SideForm = ({ chosenItems, placeOrder }) => {
  return (
    <div className="side-form">
      <h3 className="chosen-items-title">Chosen Items</h3>
      <ul className="chosen-items-list">
        {chosenItems.map(item => (
          <li key={item.id} className="chosen-item">
            <img src={item.image} alt={item.name} className="food-image" />
            <p>{item.name} - Quantity: {item.quantity} - Price: ${item.price}</p>
          </li>
        ))}
      </ul>
      <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default SideForm;
