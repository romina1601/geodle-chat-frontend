import React from "react";
import "../../styles/ChatWindow.css";

export interface ChatWindowProps {
  messages: string[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
    return (
        <div className="chat-window">
          {messages.map((msg, index) => {
            const isUser = msg.startsWith("You:");
            const label = isUser ? "You:" : "Geodle:";
            const content = msg.replace(/^(You:|Geodle:)/, "").trim();
    
            return (
              <div key={index} className={`message ${isUser ? "user" : "ai"}`}>
                <span className="message-label">{label}</span>
                <span className="message-content">{content}</span>
              </div>
            );
          })}
        </div>
    );
};

export default ChatWindow;
