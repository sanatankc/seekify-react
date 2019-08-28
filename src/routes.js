import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";

const Routes = () => (
  <Router>
    <Route exact path="/" component={Home} />
    <Route exact path="/game" component={Game} />
  </Router>
);

export default Routes;
