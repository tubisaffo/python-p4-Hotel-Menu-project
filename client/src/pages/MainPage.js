import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HomePage from "./HomePage";
import SideForm from "./SideForm";

const Main = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const history = useHistory();

  // Fetch menu items and update state
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/menu");
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const placeOrder = () => {
    history.push("/orders", { cartItems });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Update menuItems state when a new item is added

  return (
    <div>
      <HomePage />
      <h1>Hotel Menu</h1>
      <input
        type="text"
        placeholder="Search for food..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="menu-list">
        {menuItems
          .filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item) => (
            <div key={item.id} className="menu-item card">
              <img src={item.image} alt={item.name} className="food-image" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))}
      </div>
      <SideForm chosenItems={cartItems} placeOrder={placeOrder} />
    </div>
  );
};

export default Main;
