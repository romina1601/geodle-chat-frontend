import React from "react";
import Home from "./pages/Home";
import "./styles/App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Instructions from "./pages/Instructions";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Faq from "./pages/Faq";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Instructions />} />
            <Route path="/home" element={<Home />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
          </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
