import React, { useState, FormEvent } from "react";
import "../../styles/ChatInput.css";

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const MAX_CHARS = 40;

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default behavior aka reloading the page when submitting form
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");  // reset input box so user can ask another question
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.slice(0, MAX_CHARS));
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form">
      <input
        type="text"
        placeholder="Ask a question..."
        value={inputValue}
        onChange={handleChange}
        maxLength={MAX_CHARS}
        className="chat-input"
      />
      <button type="submit" className="chat-button">
        Ask
      </button>
      <div className="char-counter">
        {MAX_CHARS - inputValue.length}/{MAX_CHARS}
      </div>
      
    </form>
  );
};

export default ChatInput;
