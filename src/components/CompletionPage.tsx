import React from "react";
import "./completion-page.css";
import { useNavigate } from "react-router-dom";

function CompletionPage() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game");
  };

  return (
    <>
      <div className="box-title">
        <div>
          <img
            className="img-rickemorty"
            src={require("../img/rick-e-morty-end-game.png")}
            alt=""
          />
        </div>
        <div>
          <h1 className="title-text">Complimenti hai completato il gioco!</h1>
          <button onClick={handleStartGame} className="start-button">
            Gioca di nuovo
          </button>
        </div>
      </div>
    </>
  );
}

export default CompletionPage;
