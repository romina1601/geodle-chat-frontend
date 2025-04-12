import React from "react";
import "../styles/Header.css"

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="geodle_logo.svg" alt="GeodleChat" className="logo" />
      </div>
    </header>
  );
};

export default Header;
