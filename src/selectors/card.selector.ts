import { ICard } from "types/ICard";

export const selectAllOpenCardsIsSameColor = (cards: ICard[]): boolean => {
  return cards.filter((card) => card.open).every((card, i, arr) => card.color === arr[0].color);
};

export const selectAllCardsSolved = (cards: ICard[]): boolean => {
  return cards.every((card) => card.solved);
};

export const selectNumberOfOpenCardsEqualsTwo = (cards: ICard[]): boolean => {
  return cards.filter((card) => card.open).length === 2;
};
