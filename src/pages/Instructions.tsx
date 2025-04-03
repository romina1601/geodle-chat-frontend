import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startGame } from "../api/geodleApi";
import { setSessionStarted, setGameOver, addMessage, resetMessages } from "../store/gameSlice";
import "../styles/Instructions.css";

const Instructions: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStartGame = async () => {
    try {
      const data = await startGame();
      console.log("Started session with id: ", data.session_id);

      // Clear previous messages and update state via Redux
      dispatch(resetMessages());
      dispatch(setSessionStarted(true));
      dispatch(setGameOver(false));
      dispatch(addMessage(`Geodle: ${data.message}`));

      navigate("/home"); // Redirect to Home page
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="instructions-section">
      <h1>Welcome to Geodle! 🌍</h1>
        <p>
          You're about to chat with <strong>Geodle</strong> — an all-knowing geography expert that has picked a mystery country.
        </p>
        <p>
          Your goal is to <strong>guess the secret country</strong> by asking smart questions. You can ask anything: open-ended or yes/no questions — whatever helps you narrow it down.
        </p>
        <p>
          Try to guess the country in as few questions as possible. But be careful: even wrong guesses count as a question!
        </p>
        <p>
          Ready to put your geography skills to the test? Good luck! 🧭
        </p>

        <button className="start-game-button" onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Instructions;
