import React from 'react';

const SideForm = ({ chosenItems, placeOrder }) => {
  return (
    <div>
      <h3>Chosen Items</h3>
      <ul>
        {chosenItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default SideForm;
