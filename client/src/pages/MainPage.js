import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";

const Main = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [chosenItems, setChosenItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const history = useHistory();

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
      setChosenItems(
        chosenItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setChosenItems([...chosenItems, { ...item, quantity: 1 }]);
    }

    // Optionally send a POST request to the backend to persist the order item
    fetch("/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...item, quantity: 1 }),
    }).catch((error) => console.error("Error adding item to cart:", error));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const totalItemsInCart = chosenItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart ({totalItemsInCart})</Link>
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
      <Cart chosenItems={chosenItems} />
    </div>
  );
};

export default Main;
