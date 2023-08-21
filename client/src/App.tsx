import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
