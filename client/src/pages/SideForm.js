import React from 'react';

const SideForm = ({ chosenItems, placeOrder }) => {
  return (
    <div>
      <h3>Chosen Items</h3>
      <ul>
        {chosenItems.map(item => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} className="cart-image" />
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price * item.quantity}</p>
          </li>
        ))}
      </ul>
      {chosenItems.length > 0 && (
        <button onClick={placeOrder}>Place Order</button>
      )}
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default SideForm;
