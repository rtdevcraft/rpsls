import React from "react";
import "./Rules.css";
import rulesImage from "../../assets/images/image-rules-bonus.svg";

const RulesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Rules</h2>
        <img
          src={rulesImage}
          alt="Rules of Rock Paper Scissors. Rock beats scissors, scissors beats paper, paper beats rock."
        />
        <div className="close" onClick={onClose}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
