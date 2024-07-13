import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const [menuitems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/menu")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        return response.json();
      })
      .then(setMenuItems)
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  function handleOrder(id) {
    fetch(`/orders/${id}`, {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to place order");
        }
        return response.json();
      })
      .then(() => {
        setMenuItems((menuitems) =>
          menuitems.filter((menuitem) => menuitem.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  }

  return (
    <div>
      <Navbar />
      <h1>Hotel Menu</h1>
      {/* <input
        type="text"
        placeholder="Search for food..."
        value={searchQuery}
        onChange={handleSearchChange}
      /> */}
      <div className="menu-list">
        {menuitems.map((item) => (
          <div key={item.id} className="menu-item card">
            <img src={item.image} alt={item.name} className="food-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => handleOrder(item)}>Order</button>
          </div>
        ))}
      </div>
      {/* <SideForm chosenItems={cartItems} placeOrder={placeOrder} /> */}
    </div>
  );
}
