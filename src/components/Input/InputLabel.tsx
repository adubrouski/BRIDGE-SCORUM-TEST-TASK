import React, { CSSProperties, PropsWithChildren, ReactNode } from "react";
import classes from "./Input.module.scss";

interface InputLabelProps {
  labelContent: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function InputLabel({
  labelContent,
  children,
  className,
  style,
}: PropsWithChildren<InputLabelProps>) {
  return (
    <label className={className} style={style}>
      <span className={classes.label}>{labelContent}</span>
      {children}
    </label>
  );
}

export default InputLabel;
