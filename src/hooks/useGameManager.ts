import React, { useEffect, useState } from "react";
import { GameActionTypes, IGameAction } from "reducer/game.reducer";
import {
  selectAllCardsSolved,
  selectAllOpenCardsIsSameColor,
  selectNumberOfOpenCardsEqualsTwo,
} from "selectors/card.selector";
import { IGameState } from "types/IGameState";

interface IGameManagerProps {
  state: IGameState;
  dispatch: React.Dispatch<IGameAction>;
}

interface IGameManagerReturnType {
  isGameOver: boolean;
  clickCard: (index: number) => void;
  restartGame: () => void;
}

export const useGameManager = ({ state, dispatch }: IGameManagerProps): IGameManagerReturnType => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [canClick, setCanClick] = useState<boolean>(true);

  const clickCard = (index: number): void => {
    if (canClick) {
      dispatch({ type: GameActionTypes.OPEN_CARD, payload: index });
    }
  };

  const restartGame = (): void => {
    dispatch({ type: GameActionTypes.RESTART_GAME });
  };

  useEffect(() => {
    if (!selectNumberOfOpenCardsEqualsTwo(state.cards) || !canClick) {
      return;
    }
    setCanClick(false);
    // Let's not check immidiately if the cards are solved
    setTimeout(() => {
      if (selectAllOpenCardsIsSameColor(state.cards)) {
        dispatch({ type: GameActionTypes.INCREASE_SCORE });
        dispatch({ type: GameActionTypes.HIDE_SOLVED });
      } else {
        dispatch({ type: GameActionTypes.DECREASE_SCORE });
      }
      dispatch({ type: GameActionTypes.RESET_OPENED });
      setCanClick(true);
    }, 2000);
  }, [state.cards]);

  useEffect(() => {
    if (selectAllCardsSolved(state.cards)) {
      setIsGameOver(true);
    } else {
      setIsGameOver(false);
    }
  }, [state.cards]);

  return { isGameOver, clickCard, restartGame };
};
