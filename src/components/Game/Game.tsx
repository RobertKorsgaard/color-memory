import { Board } from "components/Board/Board";
import { GameOver } from "components/GameOver/GameOver";
import { HardMode } from "components/HardMode/HardMode";
import { useGameManager } from "hooks/useGameManager";
import { useHardModeGameManager } from "hooks/useHardModeGameManager";
import { useReducer } from "react";
import { initialState, reducer } from "reducer/game.reducer";
import styles from "./Game.module.css";

export const Game: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isGameOver, clickCard, restartGame } = useGameManager({ state, dispatch });
  const { toggleHardMode, timeleft } = useHardModeGameManager({ state, dispatch }, isGameOver);

  return (
    <div className={styles.root}>
      <span className={styles.header}>
        <p className={styles.score}>{`score: ${state.score}`}</p>
        <HardMode isHardMode={state.hardMode} toggleHardMode={toggleHardMode} timeleft={timeleft} />
      </span>
      <Board cards={state.cards} onCardClick={clickCard}>
        {isGameOver && <GameOver score={state.score} onRestartClick={restartGame} />}
      </Board>
    </div>
  );
};
