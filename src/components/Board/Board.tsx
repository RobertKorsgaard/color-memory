import { Card } from "components/Card/Card";
import * as React from "react";
import { ICard } from "types/ICard";
import styles from "./Board.module.css";

interface IBoardProps {
  cards: ICard[];
  onCardClick: (cardIndex: number) => void;
  children?: React.ReactNode;
}

export const Board: React.FC<IBoardProps> = ({ cards, onCardClick, children }) => {
  return (
    <div className={styles.root}>
      <>
        {cards.map((card, index) => (
          <Card key={index} card={card} onClick={() => onCardClick(index)} />
        ))}
        {children}
      </>
    </div>
  );
};
