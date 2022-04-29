import { randomizeCards } from "helpers/card.helper";
import { IAction } from "types/IAction";
import { IGame } from "types/IGame";

export enum ActionTypes {
  OPEN_CARD = "OPEN_CARD",
  RESET_OPENED = "RESET_OPENED",
  DECREASE_SCORE = "DECREASE_SCORE",
  INCREASE_SCORE = "INCREASE_SCORE",
  HIDE_SOVLED = "HIDE_SOVLED",
  RESTART_GAME = "RESTART_GAME",
}

export const initialState: IGame = {
  score: 0,
  cards: randomizeCards([
    { color: "red", open: false, solved: false },
    { color: "red", open: false, solved: false },
    { color: "blue", open: false, solved: false },
    { color: "blue", open: false, solved: false },
    { color: "green", open: false, solved: false },
    { color: "green", open: false, solved: false },
    { color: "yellow", open: false, solved: false },
    { color: "yellow", open: false, solved: false },
    { color: "hotpink", open: false, solved: false },
    { color: "hotpink", open: false, solved: false },
    { color: "orange", open: false, solved: false },
    { color: "orange", open: false, solved: false },
    { color: "purple", open: false, solved: false },
    { color: "purple", open: false, solved: false },
    { color: "brown", open: false, solved: false },
    { color: "brown", open: false, solved: false },
  ]),
};

export function reducer(state: IGame, action: IAction): IGame {
  switch (action.type) {
    case ActionTypes.OPEN_CARD: {
      const numberOfOpenCards = state.cards.filter((card) => card.open).length;
      if (numberOfOpenCards === 2) {
        return { ...state };
      }
      const payload: number = action.payload as number;
      return {
        ...state,
        cards: state.cards.map((card, index) =>
          index === payload ? { ...card, open: true } : card
        ),
      };
    }
    case ActionTypes.RESET_OPENED: {
      return {
        ...state,
        cards: state.cards.map((card) => ({ ...card, open: false })),
      };
    }
    case ActionTypes.HIDE_SOVLED: {
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.open ? { ...card, open: false, solved: true } : card
        ),
      };
    }
    case ActionTypes.INCREASE_SCORE: {
      return {
        ...state,
        score: state.score++,
      };
    }
    case ActionTypes.DECREASE_SCORE: {
      return {
        ...state,
        score: state.score--,
      };
    }
    case ActionTypes.RESTART_GAME: {
      return {
        ...initialState,
        cards: randomizeCards(initialState.cards),
      };
    }
    default:
      throw new Error();
  }
}
