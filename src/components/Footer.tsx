import React from "react";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">© 2025 GeodleChat</div>
        <div className="footer-center">
          <a
            href="https://github.com/romina1601/geodle-chat-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FontAwesomeIcon icon={faGithub} style={{color: "#000000",}} />
          </a>
        </div>
        <div className="footer-right">
        <a href="mailto:contact@geodle.chat" className="footer-link">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
