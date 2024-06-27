import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import CompletionPage from "./components/CompletionPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/completion" element={<CompletionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
