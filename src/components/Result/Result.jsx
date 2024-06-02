import React, { useState, useEffect } from "react";
import "./Result.css";

const Result = ({ userChoice, computerChoice, result, score, onPlayAgain }) => {
  const [choicesRevealed, setChoicesRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChoicesRevealed(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userChoice, computerChoice]);

  const { name: userName, icon: userIcon } = userChoice;
  const { name: computerName, icon: computerIcon } = computerChoice;

  const isWinner = result === "You win!" || result === "Computer wins!";

  return (
    <section className="result">
      <div className="user-result">
        <div
          className={`result-container ${userName} ${
            isWinner ? "ripple" : ""
          } ${choicesRevealed ? "show" : ""}`}
        >
          <div className={`choice ${userName}`}>
            <img src={userIcon} alt={userName} />
          </div>
        </div>
        <h3>You Picked</h3>
      </div>
      <div className="computer-result">
        <div
          className={`result-container ${computerName} ${
            isWinner ? "ripple" : ""
          } ${choicesRevealed ? "show" : ""}`}
        >
          <div className={`choice ${computerName}`}>
            <img src={computerIcon} alt={computerName} />
          </div>
        </div>
        <h3>The House Picked</h3>
      </div>
      {choicesRevealed && (
        <div className="outcome-text">
          <h2>{result}</h2>
          <button className="play-again-btn" onClick={onPlayAgain}>
            Play Again
          </button>
        </div>
      )}
    </section>
  );
};

export default Result;
