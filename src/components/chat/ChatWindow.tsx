import React, { useEffect, useRef } from "react";
import "../../styles/ChatWindow.css";

export interface ChatWindowProps {
  messages: string[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Effect that scrolls to the bottom automatically when messages change
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
      <div className="chat-window" ref={chatWindowRef}>
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
