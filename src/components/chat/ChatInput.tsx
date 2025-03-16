import React, { useState, FormEvent } from "react";
import "../../styles/ChatInput.css";

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default behavior aka reloading the page when submitting form
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");  // reset input box so user can ask another question
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form">
      <input
        type="text"
        placeholder="Ask a question..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="chat-input"
      />
      <button type="submit" className="chat-button">
        Ask
      </button>
    </form>
  );
};

export default ChatInput;
