import React, { useEffect, useState } from "react";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import TypingIndicator from "../components/chat/TypingIndicator";
import "../styles/Home.css";
import { askQuestion } from "../api/geodleApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addMessage, setGameOver, updateLastMessage } from "../store/gameSlice";
import { useNavigate } from "react-router-dom";


const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionStarted = useSelector((state: RootState) => state.sessionStarted);
  const messages = useSelector((state: RootState) => state.messages);
  const gameOver = useSelector((state: RootState) => state.gameOver);
  const [isTyping, setIsTyping] = useState(false);

    // If the session hasn't started, redirect back to instructions page
    useEffect(() => {
      if (!sessionStarted) {
        navigate("/");
      }
    }, [sessionStarted, navigate]);

  const handleSendMessage = async (message: string) => {
    if (gameOver) return;

    // Dispatch user message
    dispatch(addMessage(`You: ${message}`));
    // Add placeholder for Geodle's answer
    dispatch(addMessage(`Geodle:`));
    setIsTyping(true);

    try {
      const fullAnswer = await askQuestion(message, (chunk) => {
        // Dispatch action to update the last message with the new chunk
        dispatch(updateLastMessage(chunk));
      });

      // TODO: find better way to do this; ex: "Incorrect! Here’s another hint: The country is landlocked..." sets gameOver on true
      // if user answered correctly, stop the game
      if (fullAnswer.toLowerCase().includes("the country is") && fullAnswer.toLowerCase().includes("correct") ) {
        dispatch(setGameOver(true));
      }
    } catch (error) {
      console.log("Error sending message:", error);
      dispatch(addMessage("Geodle: Sorry, something went wrong."));
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="home-container">
      <div className="chat-section">
          <ChatWindow messages={messages} />
          {isTyping && <TypingIndicator />}
          {!gameOver && <ChatInput onSendMessage={handleSendMessage} />}
      </div>
    </div>
  );
};

export default Home;
