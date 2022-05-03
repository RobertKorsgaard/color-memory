import { ICard } from "types/ICard";

export interface IGameState {
  cards: ICard[];
  score: number;
  hardMode: boolean;
}
