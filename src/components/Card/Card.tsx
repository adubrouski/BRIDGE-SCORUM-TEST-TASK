import React from "react";
import classes from "components/Card/Card.module.scss";
import classNames from "classnames";

interface CardProps {
  image: string | null;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

function Card({ image, active, onClick, disabled }: CardProps) {
  const composedClassName = classNames(classes.card, {
    [classes.card__active]: active,
  });

  return (
    <button
      type="button"
      className={composedClassName}
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
