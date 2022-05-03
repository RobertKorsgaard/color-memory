import { randomizeCards } from "helpers/card.helper";
import { selectNumberOfOpenCardsEqualsTwo } from "selectors/card.selector";
import { IAction } from "types/IAction";
import { IGameState } from "types/IGameState";

export enum GameActionTypes {
  OPEN_CARD = "OPEN_CARD",
  RESET_OPENED = "RESET_OPENED",
  DECREASE_SCORE = "DECREASE_SCORE",
  INCREASE_SCORE = "INCREASE_SCORE",
  HIDE_SOLVED = "HIDE_SOLVED",
  RESTART_GAME = "RESTART_GAME",
  TOGGLE_HARDMODE = "TOGGLE_HARDMODE",
}

export const initialState: IGameState = {
  score: 0,
  hardMode: false,
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

export type IGameAction = IAction<GameActionTypes>;

export function reducer(state: IGameState, action: IGameAction): IGameState {
  switch (action.type) {
    case GameActionTypes.OPEN_CARD: {
      if (selectNumberOfOpenCardsEqualsTwo(state.cards)) {
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
    case GameActionTypes.RESET_OPENED: {
      return {
        ...state,
        cards: state.cards.map((card) => ({ ...card, open: false })),
      };
    }
    case GameActionTypes.HIDE_SOLVED: {
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.open ? { ...card, open: false, solved: true } : card
        ),
      };
    }
    case GameActionTypes.INCREASE_SCORE: {
      return {
        ...state,
        score: state.score++,
      };
    }
    case GameActionTypes.DECREASE_SCORE: {
      return {
        ...state,
        score: state.score--,
      };
    }
    case GameActionTypes.RESTART_GAME: {
      return {
        ...initialState,
        cards: randomizeCards(initialState.cards),
      };
    }
    case GameActionTypes.TOGGLE_HARDMODE: {
      return {
        ...state,
        hardMode: !state.hardMode,
      };
    }
    default:
      throw new Error(`Action type ${action.type} not recognized`);
  }
}
