import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Join from "./pages/Join";
import Lobby from "./pages/Lobby";
import Chat from "./components/Chat/Chat";
import Score from './components/Score/Score'
import Results from "./components/Results";

const App = () => (
  <Router>
      <Route path="/" exact component={Join} />
      <Route path="/lobby" exact component={Lobby} />
      <Route path="/chat" exact component={Chat} />
      <Route path="/scoreBoard" exact component={Score} />
      <Route path="/result" exact component={Results} />
  </Router>
);

export default App;
