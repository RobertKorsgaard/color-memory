import React, { useEffect } from "react";
import { ActionTypes } from "reducer/game.reducer";
import { selectAllCardsSolved, selectAllOpenCardsEqual } from "selectors/card.selector";
import { IAction } from "types/IAction";
import { IGame } from "types/IGame";

interface IGameManagerProps {
  state: IGame;
  dispatch: React.Dispatch<IAction>;
}

interface IGameManagerReturnType {
  isGameOver: boolean;
  canClick: boolean;
}

export const useGameManager = ({ state, dispatch }: IGameManagerProps): IGameManagerReturnType => {
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [canClick, setCanClick] = React.useState(true);

  useEffect(() => {
    if (state.cards.filter((card) => card.open).length < 2) {
      return;
    }
    setCanClick(false);
    // Let's not check immidiately if the cards are solved
    setTimeout(() => {
      if (selectAllOpenCardsEqual(state)) {
        dispatch({ type: ActionTypes.INCREASE_SCORE });
        dispatch({ type: ActionTypes.HIDE_SOVLED });
      } else {
        dispatch({ type: ActionTypes.DECREASE_SCORE });
      }
      dispatch({ type: ActionTypes.RESET_OPENED });
      setCanClick(true);
    }, 2000);
  }, [state, dispatch]);

  useEffect(() => {
    if (selectAllCardsSolved(state.cards)) {
      setIsGameOver(true);
    } else {
      setIsGameOver(false);
    }
  }, [state.cards]);

  return { isGameOver, canClick };
};
