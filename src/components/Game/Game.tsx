import { Board } from "components/Board/Board";
import { GameOver } from "components/GameOver/GameOver";
import { useGameManager } from "hooks/useGameManager";
import { useReducer } from "react";
import { initialState, reducer } from "reducer/game.reducer";
import styles from "./Game.module.css";

export const Game: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isGameOver, clickCard, restartGame } = useGameManager({ state, dispatch });

  return (
    <div className={styles.root}>
      <p className={styles.score}>{`score: ${state.score}`}</p>
      <Board cards={state.cards} onCardClick={clickCard}>
        {isGameOver && <GameOver score={state.score} onRestartClick={restartGame} />}
      </Board>
    </div>
  );
};
