// src/components/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "../pages/MainPage";
import OrdersPage from "../pages/OrdersPage";
import Cart from "../pages/Cart";
import MenuList from "../pages/MenuList";
import HomePage from "../pages/HomePage";
import MenuTable from "../pages/MenuTable";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/menu-table" component={MenuTable} />
        <Route path="/main-page" component={MainPage} />
        <Route path="/cart" component={Cart} />
        <Route path="/menu-list" component={MenuList} />
        <Route path="/orders" component={OrdersPage} />
      </Switch>
    </Router>
  );
}

export default App;
