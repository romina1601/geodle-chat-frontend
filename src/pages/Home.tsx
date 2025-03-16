import React, { useState } from "react";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import TypingIndicator from "../components/chat/TypingIndicator";
import "../styles/Home.css";
import { askQuestion, startGame } from "../api/geodleApi";


const Home: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleStartGame = async () => {
    try {
      const data = await startGame();
      setSessionStarted(true);
      setGameOver(false); 
      console.log('Started session with id: ', data.session_id);

      // Add game started message
      setMessages((prev) => [...prev, `Geodle: ${data.message}`]);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (gameOver) return;

    // Apend user's message
    setMessages((prev) => [...prev, `You: ${message}`]);

    // Immediately create a new message for the Geodle response
    setMessages((prev) => [...prev, `Geodle:`]);

    setIsTyping(true);

    try {
      const fullAnswer = await askQuestion(message, (chunk) => {
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] += chunk;
          return updatedMessages;
        });
      });

      // TODO: find better way to do this; ex: "Incorrect! Here’s another hint: The country is landlocked..." sets gameOver on true
      // if user answered correctly, stop the game
      if (fullAnswer.toLowerCase().includes("the country is") && fullAnswer.toLowerCase().includes("correct") ) {
        setGameOver(true);
      }
    } catch (error) {
      console.log("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        "Geodle: Sorry, something went wrong.",
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="home-container">
      {!sessionStarted && (
        <button className="start-game-button" onClick={handleStartGame}>
          Start Game
        </button>
      )}
      <ChatWindow messages={messages} />
      {isTyping && <TypingIndicator />}
      {!gameOver && <ChatInput onSendMessage={handleSendMessage} />}
    </div>
  );
};

export default Home;
