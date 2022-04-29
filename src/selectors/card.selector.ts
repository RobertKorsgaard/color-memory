import { ICard } from "types/ICard";
import { IGame } from "types/IGame";

export const selectAllOpenCardsEqual = (state: IGame): boolean => {
  return state.cards
    .filter((card) => card.open)
    .every((card, i, arr) => card.color === arr[0].color);
};

export const selectAllCardsSolved = (cards: ICard[]): boolean => {
  return cards.every((card) => card.solved);
};
