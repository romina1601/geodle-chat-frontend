import React from "react";
import "../../styles/TypingIndicator.css";

/**
 * Show "typing" animation while waiting for response from server
 */
const TypingIndicator: React.FC = () => {
  return (
    <div className="typing-indicator">
      <div className="dot dot1"></div>
      <div className="dot dot2"></div>
      <div className="dot dot3"></div>
    </div>
  );
};

export default TypingIndicator;
