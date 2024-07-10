import { useLocation, useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';

const OrdersPage = () => {
  const location = useLocation();
  const history = useHistory();
  const cartItems = location.state ? location.state.cartItems : [];

  return (
    <div>
      <Navbar />
      <h1>Orders </h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders placed</p>
      )}
    </div>
  );
};

export default OrdersPage;
