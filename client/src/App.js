import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import Score from './components/Score/Score'

const App = () => (
  <Router>
    <Route path="/" exact component={Join} />
    <Route path="/chat" exact component={Chat} />
    <Route path="/scoreBoard" exact component={Score} />
  </Router>
);

export default App;
