import React, { useState } from "react";
import "./Game.css";
import Choices from "../Choices/Choices";
import Result from "../Result/Result";
import RulesModal from "../Rules/Rules";
import rockIcon from "../../assets/images/icon-rock.svg";
import paperIcon from "../../assets/images/icon-paper.svg";
import scissorsIcon from "../../assets/images/icon-scissors.svg";
import logo from "../../assets/images/logo.svg";

const choices = [
  { id: 1, name: "paper", icon: paperIcon },
  { id: 2, name: "scissors", icon: scissorsIcon },
  { id: 3, name: "rock", icon: rockIcon },
];

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ user: 0, computer: 0 });
  const [showChoices, setShowChoices] = useState(true);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

  const handleUserChoice = (choice) => {
    const computerChoice = getComputerChoice();
    const gameResult = determineResult(choice.name, computerChoice.name);

    setUserChoice(choice);
    setComputerChoice(computerChoice);
    setResult(gameResult);
    updateScore(gameResult);
    setShowChoices(false);
  };

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
      return "It's a tie!";
    }

    if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "scissors" && computerChoice === "paper") ||
      (userChoice === "paper" && computerChoice === "rock")
    ) {
      return "You win!";
    } else {
      return "Computer wins!";
    }
  };

  const updateScore = (result) => {
    if (result === "You win!") {
      setScore((prevScore) => ({
        ...prevScore,
        user: prevScore.user + 1,
      }));
    } else if (result === "Computer wins!") {
      setScore((prevScore) => ({
        ...prevScore,
        computer: prevScore.computer + 1,
      }));
    }
  };

  const toggleRulesModal = () => {
    setIsRulesModalOpen(!isRulesModalOpen);
  };

  const handlePlayAgain = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    setShowChoices(true);
  };

  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="Rock Paper Scissors" className="logo" />
        <div className="score-board">
          <p className="score-title">Score</p>
          <p className="score">{score.user}</p>
        </div>
      </header>
      <main className="main-content">
        <section className="game-section">
          {showChoices && (
            <Choices choices={choices} onChoose={handleUserChoice} />
          )}

          {userChoice && computerChoice && (
            <Result
              userChoice={userChoice}
              computerChoice={computerChoice}
              result={result}
              score={score}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </section>
        <section className="rules-btn">
          <button onClick={toggleRulesModal}>Rules</button>
          <RulesModal isOpen={isRulesModalOpen} onClose={toggleRulesModal} />
        </section>
      </main>
    </div>
  );
};

export default Game;
