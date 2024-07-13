<<<<<<< HEAD
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const [menuitems, setMenuItems] = useState([]);
=======
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SideForm from './SideForm';

const MainPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
>>>>>>> Davey

  useEffect(() => {
    fetch("/menu")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
<<<<<<< HEAD
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
=======
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const placeOrder = () => {
    history.push('/orders', { cartItems });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
>>>>>>> Davey

  return (
    <div>
      <Navbar />
      <h1>Hotel Menu</h1>
<<<<<<< HEAD
      {/* <input
=======
      <input
>>>>>>> Davey
        type="text"
        placeholder="Search for food..."
        value={searchQuery}
        onChange={handleSearchChange}
<<<<<<< HEAD
      /> */}
      <div className="menu-list">
        {menuitems.map((item) => (
=======
      />
      <div className="menu-list">
        {filteredMenuItems.map(item => (
>>>>>>> Davey
          <div key={item.id} className="menu-item card">
            <img src={item.image} alt={item.name} className="food-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
<<<<<<< HEAD
            <button onClick={() => handleOrder(item)}>Order</button>
          </div>
        ))}
      </div>
      {/* <SideForm chosenItems={cartItems} placeOrder={placeOrder} /> */}
    </div>
  );
}
=======
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <SideForm chosenItems={cartItems} placeOrder={placeOrder} />
    </div>
  );
};

export default MainPage;
>>>>>>> Davey
