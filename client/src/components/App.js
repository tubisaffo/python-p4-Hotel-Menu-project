import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MenuTable from "../pages/MenuTable";
import MainPage from "../pages/MainPage";
import Cart from "../pages/Cart";
import OrdersPage from "../pages/OrdersPage";
import Adminlogin from "../pages/Adminlogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu-table" element={<MenuTable />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders/:orderId" element={<OrdersPage />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
      </Routes>
    </Router>
  );
}

export default App;
