import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [chosenItems, setChosenItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

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
  }, []);

  const addToCart = (item) => {
    const existingItem = chosenItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      setChosenItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setChosenItems([...chosenItems, { ...item, quantity: 1 }]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const totalItemsInCart = chosenItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navigateToCart = () => {
    // Store the chosenItems in localStorage or another method before navigating
    localStorage.setItem("cartItems", JSON.stringify(chosenItems));
    navigate("/cart");
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <button onClick={navigateToCart}>Cart ({totalItemsInCart})</button>
          </li>
        </ul>
      </nav>
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
    </div>
  );
};

export default Main;
