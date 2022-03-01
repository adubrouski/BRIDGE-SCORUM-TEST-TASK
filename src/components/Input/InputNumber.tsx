import React, { CSSProperties } from "react";
import InputNumber from "rc-input-number";
import classes from "./Input.module.scss";

interface InputNumberProps {
  name: string;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  value?: number;
  className?: string;
  style?: CSSProperties;
}

function InputTypeNumber({
  name,
  min,
  max,
  onChange,
  value,
  className,
  style,
}: InputNumberProps) {
  return (
    <InputNumber
      name={name}
      className={`${classes.inputNumber} ${className ?? ""}`}
      style={style}
      onChange={onChange}
      min={min}
      max={max}
      value={value}
    />
  );
}

export default InputTypeNumber;
