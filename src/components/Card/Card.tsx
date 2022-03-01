import React from "react";
import classes from "components/Card/Card.module.scss";

interface CardProps {
  image: string | null;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

function Card({ image, active, onClick, disabled }: CardProps) {
  return (
    <button
      type="button"
      className={
        active ? `${classes.card} ${classes.card__active}` : classes.card
      }
      onClick={onClick}
      disabled={disabled}
    >
      <div className={classes.cardFront} />
      <div
        className={classes.cardBack}
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      />
    </button>
  );
}

export default Card;
