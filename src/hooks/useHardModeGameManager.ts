import { IGameManagerProps } from "hooks/useGameManager";
import { useEffect, useRef, useState } from "react";
import { GameActionTypes } from "reducer/game.reducer";

type IHardModeGameManagerReturnType = {
  toggleHardMode: () => void;
  timeleft: number;
};

const TIMEOUT = 5;
const SECOND_IN_MS = 1000;

export const useHardModeGameManager = (
  { state, dispatch }: IGameManagerProps,
  isGameOver: boolean
): IHardModeGameManagerReturnType => {
  const [timeleft, setTimeleft] = useState<number>(TIMEOUT);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const toggleHardMode = (): void => {
    dispatch({ type: GameActionTypes.TOGGLE_HARDMODE });
  };

  const timerCheck = (): void => {
    setTimeleft((timeleft) => {
      if (timeleft <= 0) {
        dispatch({ type: GameActionTypes.DECREASE_SCORE });
        setTimeleft(TIMEOUT);
        clearInterval(intervalRef.current as NodeJS.Timer);
        intervalRef.current = setInterval(timerCheck, SECOND_IN_MS);
      }
      return timeleft - 1;
    });
  };

  useEffect(() => {
    if (!state.hardMode) {
      return;
    }

    intervalRef.current = setInterval(timerCheck, SECOND_IN_MS);
  }, [state.hardMode]);

  useEffect(() => {
    if (!state.hardMode) {
      return;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeleft(TIMEOUT);
    intervalRef.current = setInterval(timerCheck, SECOND_IN_MS);
  }, [state.cards]);

  useEffect(() => {
    clearInterval(intervalRef?.current as NodeJS.Timer);
  }, [isGameOver]);

  return { toggleHardMode, timeleft };
};
