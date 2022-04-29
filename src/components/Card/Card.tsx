import clsx from "clsx";
import React from "react";
import { ICard } from "types/ICard";
import styles from "./Card.module.css";

interface ICardProps {
  card: ICard;
  onClick: () => void;
}

export const Card: React.FC<ICardProps> = ({ card, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(styles.card, { [styles.solved]: card.solved })}
      style={{
        backgroundColor: card.open ? card.color : "",
      }}
    >
      <div className={styles.corner} style={{ backgroundColor: card.color }} />
    </div>
  );
};
