import React, { ChangeEvent, CSSProperties } from "react";
import classes from "components/Input/Input.module.scss";

interface InputPasswordProps {
  name?: string;
  style?: CSSProperties;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
}

function InputPassword({
  name,
  style,
  className,
  value,
  onChange,
}: InputPasswordProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <input
      className={`${classes.input} ${className ?? ""}`}
      value={value}
      name={name}
      style={style}
      type="password"
      onChange={handleInputChange}
    />
  );
}

export default InputPassword;
