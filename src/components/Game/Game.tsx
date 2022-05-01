import { Board } from "components/Board/Board";
import { GameOver } from "components/GameOver/GameOver";
import { useGameManager } from "hooks/useGameManager";
import { useReducer } from "react";
import { GameActionTypes, initialState, reducer } from "reducer/game.reducer";
import styles from "./Game.module.css";

export const Game: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isGameOver, canClick } = useGameManager({ state, dispatch });

  const onCardClick = (cardIndex: number) => {
    if (!canClick) {
      return;
    }
    dispatch({
      type: GameActionTypes.OPEN_CARD,
      payload: cardIndex,
    });
  };

  return (
    <div className={styles.root}>
      <p className={styles.score}>{`score: ${state.score}`}</p>
      <Board cards={state.cards} onCardClick={onCardClick}>
        {isGameOver && (
          <GameOver
            score={state.score}
            onRestartClick={() => dispatch({ type: GameActionTypes.RESTART_GAME })}
          />
        )}
      </Board>
    </div>
  );
};
