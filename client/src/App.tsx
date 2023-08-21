import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" Component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
