import React from "react";
import Home from "./pages/Home";
import "./styles/App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Instructions from "./pages/Instructions";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Instructions />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
