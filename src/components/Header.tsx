import React from "react";
import "../styles/Header.css"
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src="geodle_logo.svg" alt="GeodleChat" className="logo" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
