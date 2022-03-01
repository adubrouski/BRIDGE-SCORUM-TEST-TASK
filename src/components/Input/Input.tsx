import React, { ChangeEvent, CSSProperties } from "react";
import classes from "./Input.module.scss";

interface InputProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
}

function Input({ name, onChange, value, className, style }: InputProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <input
      className={`${classes.input} ${className ?? ""}`}
      style={style}
      value={value}
      name={name}
      type="text"
      onChange={handleInputChange}
    />
  );
}

export default Input;
