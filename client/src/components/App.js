import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Cart from "../pages/Cart";
import MenuList from "../pages/MenuList";
import OrdersPage from "../pages/OrdersPage";
import HomePage from "../pages/HomePage";
import MenuTable from "../pages/MenuTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu-table" element={<MenuTable />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/orders/:orderId" element={<OrdersPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu-list" element={<MenuList />} />
      </Routes>
    </Router>
  );
}

export default App;
