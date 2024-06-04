import React, { useState, useEffect } from "react";
import "./Result.css";

const Result = ({
  userChoice,
  computerChoice,
  result,
  onPlayAgain,
  updateScore,
}) => {
  const [choicesRevealed, setChoicesRevealed] = useState(false);
  const [outcomeRevealed, setOutcomeRevealed] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);

  useEffect(() => {
    const choicesTimer = setTimeout(() => {
      setChoicesRevealed(true);
    }, 1000);

    const outcomeTimer = setTimeout(() => {
      setOutcomeRevealed(true);
    }, 2000);

    const rippleTimer = setTimeout(() => {
      setRippleActive(true);
    }, 2500);

    return () => {
      clearTimeout(choicesTimer);
      clearTimeout(outcomeTimer);
      clearTimeout(rippleTimer);
    };
  }, [userChoice, computerChoice, result]);

  const { name: userName, icon: userIcon } = userChoice;
  const { name: computerName, icon: computerIcon } = computerChoice;

  const isWinner = result === "You win";
  const isLoser = result === "You lose";

  return (
    <section className="result">
      <div className="user-result">
        <div
          className={`result-container ${userName} ${
            isWinner && choicesRevealed ? "reveal-ripple" : ""
          } ${choicesRevealed ? "show" : ""}`}
        >
          <div className={`choice-result ${userName}`}>
            <img src={userIcon} alt={userName} />
          </div>
        </div>
        <h3>You Picked</h3>
      </div>
      <div
        className={`computer-result show-placeholder ${
          choicesRevealed ? "show" : ""
        }`}
      >
        <div
          className={`result-container ${computerName} ${
            isLoser && choicesRevealed ? "reveal-ripple" : ""
          }`}
        >
          <div className={`choice-result ${computerName}`}>
            <img src={computerIcon} alt={computerName} />
          </div>
        </div>
        <h3>The House Picked</h3>
      </div>

      {choicesRevealed && (
        <div className="outcome-container">
          {outcomeRevealed && (
            <div className="outcome-text">
              <h2>{result}</h2>
              <button className="play-again-btn" onClick={onPlayAgain}>
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Result;
