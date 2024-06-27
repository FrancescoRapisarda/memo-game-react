import React from "react";
import { useNavigate } from "react-router-dom";
import "./home-page.css";

function HomePage() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game");
  };

  return (
    <div className="container">
      <div className="home-page">
        <img
          className="memo-game"
          src={require("../img/memogame.png")}
          alt="chi è?"
        />
        <button onClick={handleStartGame} className="start-button">
          Inizia il Gioco
        </button>
      </div>
    </div>
  );
}

export default HomePage;
