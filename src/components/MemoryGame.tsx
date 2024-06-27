import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./memory-game.css";
import { Character } from "../model/Character";

function MemoryGame() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [flippedCards, setFlippedCards] = useState<Character[]>([]);
  const [matchedCards, setMatchedCards] = useState<Character[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCharacters(setCharacters);
  }, []);

  useEffect(() => {
    if (matchedCards.length === characters.length && characters.length > 0) {
      navigateToCompletion(navigate);
    }
  }, [matchedCards, characters, navigate]);

  const handleCardClick = (character: Character) => {
    if (flippedCards.length === 2 || flippedCards.includes(character)) return;
    setFlippedCards([...flippedCards, character]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkForMatch(
        flippedCards,
        matchedCards,
        setMatchedCards,
        setFlippedCards
      );
    }
  }, [flippedCards]);

  return (
    <div className="memory-game">
      <img className="img-title" src={require("../img/title.png")} alt="" />
      <img
        className="img-bottom"
        src={require("../img/img-bottom.png")}
        alt=""
      />

      <div className="card-container">
        <div className="cards-grid">
          {characters.map((character) => (
            <div
              key={character.id}
              className={`card ${
                flippedCards.includes(character) ||
                matchedCards.includes(character)
                  ? "flipped"
                  : ""
              }`}
              onClick={() => handleCardClick(character)}
            >
              <div className="card-inner">
                <div className="card-front">
                  <img
                    className="punto-interrogativo"
                    src={require("../img/question.png")}
                    alt=""
                  />
                </div>
                <div className="card-back">
                  <img src={character.image} alt={character.name} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const navigateToCompletion = (navigate: ReturnType<typeof useNavigate>) => {
  navigate("/completion");
};

const fetchCharacters = async (
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character/");
    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }
    const data = await response.json();
    const charactersData: Character[] = data.results
      .slice(0, 4)
      .flatMap((character: any) => [
        { id: character.id, name: character.name, image: character.image },
        { id: character.id, name: character.name, image: character.image },
      ]);
    setCharacters(shuffleArray(charactersData));
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const checkForMatch = (
  flippedCards: Character[],
  matchedCards: Character[],
  setMatchedCards: React.Dispatch<React.SetStateAction<Character[]>>,
  setFlippedCards: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  if (flippedCards[0].name === flippedCards[1].name) {
    setMatchedCards([...matchedCards, ...flippedCards]);
    setFlippedCards([]);
  } else {
    setTimeout(() => {
      setFlippedCards([]);
    }, 1000);
  }
};

export default MemoryGame;
