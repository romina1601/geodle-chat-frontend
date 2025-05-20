import React from "react";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">© 2025 GeodleChat</div>
        <div className="footer-icons">
          <a
            href="/faq"
            className="footer-icon"
            aria-label="FAQ"
            title="FAQ"
          >
            <FontAwesomeIcon icon={faQuestionCircle} />
          </a>
          <a
            href="https://github.com/romina1601/geodle-chat-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="mailto:contact@geodle.chat?subject=Geodle%20Chat%20Support"
            className="footer-icon"
            aria-label="Contact"
          >
            <FontAwesomeIcon icon={faEnvelope}  />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
