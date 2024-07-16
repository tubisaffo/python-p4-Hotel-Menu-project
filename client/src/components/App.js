// src/components/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "../pages/MainPage";
import OrdersPage from "../pages/OrdersPage";
import MenuTable from "../pages/MenuTable";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/main" component={MainPage} />
        <Route path="/MenuTable" component={MenuTable} />
        <Route path="/orders" component={OrdersPage} />
      </Switch>
    </Router>
  );
}

export default App;
