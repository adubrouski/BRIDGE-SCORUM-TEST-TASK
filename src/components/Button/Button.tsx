import React, { MouseEventHandler } from "react";
import Preloader from "components/Preloader/Preloader";
import classes from "components/Button/Button.module.scss";

interface ButtonProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  disabled?: boolean;
}

function Button({
  children,
  className,
  isLoading,
  disabled,
  onClick,
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      className={`${classes.button} ${className ?? ""}`}
      type="submit"
      disabled={disabled || isLoading}
    >
      {isLoading && <Preloader />}
      {children}
    </button>
  );
}

export default Button;
