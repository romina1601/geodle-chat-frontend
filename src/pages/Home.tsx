import React, { useEffect, useState } from "react";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import TypingIndicator from "../components/chat/TypingIndicator";
import "../styles/Home.css";
import { askQuestion, validateAnswer } from "../api/geodleApi";
import { useDispatch } from "react-redux";
import { addMessage, setGameOver, updateLastMessage } from "../store/gameSlice";
import { useNavigate } from "react-router-dom";
import { useGameSlice } from "../hooks/useGameSlice";
import ResultsModal from "../components/score/ResultsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";


const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sessionStarted, gameOver, messages } = useGameSlice();
  const [isTyping, setIsTyping] = useState(false);

  // To show results
  const [showResultModal, setShowResultModal] = useState(false);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [readyToShowStats, setReadyToShowStats] = useState(false);


  // If the session hasn't started, redirect back to instructions page
  useEffect(() => {
    if (!sessionStarted) {
      navigate("/");
    }
  }, [sessionStarted, navigate]);

  // When the game is over, open the Result Modal
  useEffect(() => {
    if (gameOver) {
      const userQuestions = messages.filter(msg => msg.startsWith("You:")).length;
      setQuestionsCount(userQuestions);
      setShowResultModal(true);
    }
  }, [gameOver, messages]);

  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => {
        setReadyToShowStats(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setReadyToShowStats(false);
    }
  }, [gameOver]);


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

      try {
        const isGameOver = await validateAnswer(fullAnswer);
        if (isGameOver) {
          dispatch(setGameOver(true));
        }
      } catch (error) {
        console.error("Validation failed:", error);
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
      <div className="home-content-wrapper">
        <div className="chat-section">
            <ChatWindow messages={messages} />
            {isTyping && <TypingIndicator />}
            {!gameOver && <ChatInput onSendMessage={handleSendMessage} />}
        </div>

        {readyToShowStats && (
          <div className="show-stats-container">
            <button onClick={() => setShowResultModal(true)} className="show-stats-button">
              Show Stats
              <FontAwesomeIcon icon={faChartSimple} style={{ marginRight: '8px' }} />
            </button>
          </div>
        )}
      </div>


      {readyToShowStats && showResultModal && (
        <ResultsModal
          questionsCount={questionsCount}
          onClose={() => setShowResultModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
