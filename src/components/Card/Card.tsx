import clsx from "clsx";
import React from "react";
import { ICard } from "types/ICard";
import styles from "./Card.module.css";

export const CardTestIds = {
  root: "CardTestIds_root",
};

interface ICardProps {
  card: ICard;
  onClick: () => void;
}

export const Card: React.FC<ICardProps> = React.memo(
  ({ card, onClick }) => {
    return (
      <div
        data-testid={CardTestIds.root}
        onClick={onClick}
        className={clsx(styles.card, { [styles.solved]: card.solved })}
        style={{
          backgroundColor: card.open ? card.color : "",
        }}
      >
        <div className={styles.corner} style={{ backgroundColor: card.color }} />
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.card.open === nextProps.card.open && prevProps.card.solved === nextProps.card.solved
);
