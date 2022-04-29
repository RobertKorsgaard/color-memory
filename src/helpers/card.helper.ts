import { ICard } from "types/ICard";

export const randomizeCards = (cards: ICard[]): ICard[] => cards.sort(() => 0.5 - Math.random());
