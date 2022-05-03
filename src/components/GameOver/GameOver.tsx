import React from "react";
import styles from "./GameOver.module.css";

interface IGameOverProps {
  score: number;
  onRestartClick: () => void;
}

export const GameOver: React.FC<IGameOverProps> = ({ score, onRestartClick }) => {
  return (
    <div className={styles.overlay}>
      <p>GAME OVER</p>
      <p>{`Your final score: ${score}`}</p>
      <button aria-label="restart" className={styles.button} onClick={onRestartClick}>
        Restart game
      </button>
    </div>
  );
};
